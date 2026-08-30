import { NextRequest, NextResponse } from "next/server";
import { analyzeDamageWithGemini, getFallbackDamageAnalysis } from "@/lib/gemini";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { imageBase64, mimeType, notes, userId } = body;

    let result;
    if (imageBase64) {
      result = await analyzeDamageWithGemini(
        imageBase64,
        mimeType || "image/jpeg",
        notes
      );
    } else {
      result = getFallbackDamageAnalysis(notes);
    }

    // Attempt to persist scan record to database if available
    try {
      await db.aiDamageScan.create({
        data: {
          userId: userId || null,
          imageUrl: null,
          itemName: result.itemName,
          damageTitle: result.damageTitle,
          damageDescription: result.damageDescription,
          severity: result.severity,
          estimatedMinPrice: result.estimatedMinPrice,
          estimatedMaxPrice: result.estimatedMaxPrice,
          recommendedService: result.recommendedService,
          recommendedMaterials: result.recommendedMaterials.map(m => m.name),
          urgencyAdvice: result.urgencyAdvice,
          suggestedSteps: result.suggestedSteps,
        },
      });
    } catch (dbErr) {
      // Non-fatal if database is still syncing
      console.warn("Could not persist AI scan log to DB (table might be pushing):", dbErr);
    }

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error("AI Scan route error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to analyze damage",
        data: getFallbackDamageAnalysis(),
      },
      { status: 500 }
    );
  }
}
