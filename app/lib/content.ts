import defaultContent from "../admin/content.json";

export type ContentData = typeof defaultContent;

const KV_API_BASE_URL = process.env.KV_API_BASE_URL || "http://localhost:3000";
const KV_API_KEY = process.env.KV_API_KEY || "";
const CONTENT_KEY = "page-content";

/**
 * Fetches content directly from key-value store API
 * Falls back to JSON file if API fails or is not configured
 * Server component only - API key is never exposed to client
 */
export async function fetchContent(): Promise<ContentData> {
  // If no API key or URL configured, use fallback immediately
  if (!KV_API_KEY || !KV_API_BASE_URL) {
    console.warn("Key-value store not configured, using JSON fallback");
    return defaultContent;
  }

  try {
    // Fetch directly from key-value store API
    const response = await fetch(`${KV_API_BASE_URL}/${CONTENT_KEY}`, {
      headers: {
        "X-API-Key": KV_API_KEY,
      },
      // Use force-cache for SSG, will be revalidated based on page revalidate setting
      cache: "force-cache",
      next: { revalidate: 3600 }, // 1 hour revalidation
    });

    // If API returns 401 or other error, fall back to JSON
    if (!response.ok) {
      console.warn(`Key-value store API returned ${response.status}, using JSON fallback`);
      return defaultContent;
    }

    const data = await response.json();
    // The API returns { key: string, value: ContentData }
    if (data.value) {
      return data.value as ContentData;
    }

    // If response doesn't have expected structure, fall back
    console.warn("Key-value store response missing value field, using JSON fallback");
    return defaultContent;
  } catch (error) {
    // Any error (network, timeout, etc.) falls back to JSON
    console.warn("Failed to fetch from key-value store, using fallback:", error);
    return defaultContent;
  }
}

/**
 * Saves content to key-value store via internal API route
 * Server component only - API key is never exposed to client
 */
export async function saveContent(content: ContentData): Promise<{ success: boolean; error?: string }> {
  try {
    // Determine base URL for internal API call
    let baseUrl = "";
    if (typeof window !== "undefined") {
      // Client-side: use current origin
      baseUrl = window.location.origin;
    } else {
      // Server-side: use environment variable or construct from request
      baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 
                "http://localhost:3000";
    }

    const response = await fetch(`${baseUrl}/api/content`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `API responded with status ${response.status}`);
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to save to key-value store:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error" 
    };
  }
}