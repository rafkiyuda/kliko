import { NextRequest, NextResponse } from "next/server";
import { createSnapTransaction } from "@/lib/midtrans";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { 
      orderId, 
      grossAmount, 
      customerName, 
      customerEmail, 
      customerPhone, 
      items,
      orderType 
    } = body;

    const generatedOrderId = orderId || `KLK-${Date.now()}`;

    const snapResult = await createSnapTransaction({
      orderId: generatedOrderId,
      grossAmount: Number(grossAmount) || 50000,
      customerName: customerName || "Customer KLIKO",
      customerEmail: customerEmail || "customer@kliko.id",
      customerPhone: customerPhone || "081234567890",
      items: items || [],
    });

    // Attempt to log transaction to database if available
    try {
      await db.transaction.create({
        data: {
          orderId: generatedOrderId,
          amount: Number(grossAmount),
          serviceCommission: Number(grossAmount) * 0.1,
          tukangPayout: Number(grossAmount) * 0.9,
          paymentMethod: "MIDTRANS_SNAP",
          paymentStatus: "PENDING",
        },
      });
    } catch (dbErr) {
      // Non-fatal if database is still syncing
      console.warn("Could not log pending transaction to DB:", dbErr);
    }

    return NextResponse.json({
      success: true,
      orderId: generatedOrderId,
      token: snapResult.token,
      redirectUrl: snapResult.redirectUrl,
      isSimulated: snapResult.isSimulated || false,
    });
  } catch (error: any) {
    console.error("API Payment Token Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to create payment token",
      },
      { status: 500 }
    );
  }
}
