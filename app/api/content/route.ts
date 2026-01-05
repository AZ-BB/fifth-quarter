import { NextResponse } from "next/server";
import defaultContent from "../../admin/content.json";

const KV_API_BASE_URL = process.env.KV_API_BASE_URL || "http://localhost:3000";
const KV_API_KEY = process.env.KV_API_KEY || "";
const CONTENT_KEY = "page-content";

/**
 * GET /api/content
 * Fetches content from key-value store with fallback to JSON file
 * Supports SSG with 1 hour revalidation
 */
export async function GET() {
  try {
    // Try to fetch from key-value store
    if (KV_API_KEY && KV_API_BASE_URL) {
      const response = await fetch(`${KV_API_BASE_URL}/${CONTENT_KEY}`, {
        headers: {
          "X-API-Key": KV_API_KEY,
        },
        // Cache for SSG - will be revalidated based on page revalidate setting
        cache: "force-cache",
        next: { revalidate: 3600 }, // 1 hour
      });

      if (response.ok) {
        const data = await response.json();
        // The API returns { key: string, value: ContentData }
        if (data.value) {
          return NextResponse.json(data.value, {
            headers: {
              "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
            },
          });
        }
      }
    }

    // Fallback to JSON file
    return NextResponse.json(defaultContent, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.warn("Failed to fetch from key-value store, using fallback:", error);
    // Fallback to JSON file
    return NextResponse.json(defaultContent, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  }
}

/**
 * PUT /api/content
 * Saves content to key-value store
 */
export async function PUT(request: Request) {
  try {
    const body = await request.json();

    if (!KV_API_KEY || !KV_API_BASE_URL) {
      return NextResponse.json(
        { error: "Key-value store not configured" },
        { status: 500 }
      );
    }

    // Save to key-value store
    const response = await fetch(`${KV_API_BASE_URL}/${CONTENT_KEY}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": KV_API_KEY,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Key-value store responded with status ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Failed to save to key-value store:", error);
    return NextResponse.json(
      { error: "Failed to save content", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
