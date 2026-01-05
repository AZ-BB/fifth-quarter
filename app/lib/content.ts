import defaultContent from "../admin/content.json";

export type ContentData = typeof defaultContent;

/**
 * Fetches content from key-value store via internal API route
 * Falls back to JSON file if API fails
 * Server component only - API key is never exposed to client
 */
export async function fetchContent(): Promise<ContentData> {
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
      // Use force-cache for SSG, will be revalidated based on page revalidate setting
      cache: "force-cache",
      next: { revalidate: 3600 }, // 1 hour revalidation
    });

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }

    const data = await response.json();
    return data as ContentData;
  } catch (error) {
    console.warn("Failed to fetch from key-value store, using fallback:", error);
    // Fallback to JSON file
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