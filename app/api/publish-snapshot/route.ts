import { getDownloadUrl } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const url = getDownloadUrl("dashboard_snapshot.json");

    const response = await fetch(url, {
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          error: `Failed to read dashboard snapshot: ${response.status}`,
        },
        { status: 500 }
      );
    }

    const snapshot = await response.json();

    return NextResponse.json(snapshot, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error?.message || String(error),
      },
      { status: 500 }
    );
  }
}