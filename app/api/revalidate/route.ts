import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

/**
 * POST /api/revalidate
 * On-demand revalidation endpoint
 * Revalidates the landing page after content updates
 */
export async function POST(request: NextRequest) {
  try {
    // Optional: Add authentication/authorization here
    // For now, we'll allow revalidation from admin panel
    
    // Revalidate the home page
    revalidatePath("/");
    
    return NextResponse.json({ 
      revalidated: true, 
      message: "Landing page revalidated successfully",
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json(
      { 
        error: "Failed to revalidate", 
        details: error instanceof Error ? error.message : "Unknown error" 
      },
      { status: 500 }
    );
  }
}

