import { NextRequest, NextResponse } from "next/server";
import { analyzeDamageWithGemini } from "@/lib/gemini";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { imageBase64, mimeType, notes, userId } = body;

    // Call Gemini AI directly
    const result = await analyzeDamageWithGemini(
      imageBase64 || null,
      mimeType || "image/jpeg",
      notes
    );

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
      console.warn("Could not persist AI scan log to DB:", dbErr);
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
        error: error.message || "Gagal melakukan diagnosa kerusakan dengan Gemini AI.",
      },
      { status: 500 }
    );
  }
}
