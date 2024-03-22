import { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import prisma from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("...............URL TRUE..........");

  if (req.method === "POST") {
    console.log("...............URL TRUE2..........");
    try {
      const {
        merchant_id,
        order_id,
        payhere_amount,
        payhere_currency,
        status_code,
        md5sig,
      } = req.body;

      const merchant_secret = ""; // Replace with your Merchant Secret

      const local_md5sig = crypto
        .createHash("md5")
        .update(
          merchant_id +
            order_id +
            payhere_amount +
            payhere_currency +
            status_code +
            crypto.createHash("md5").update(merchant_secret).digest("hex")
        )
        .digest("hex")
        .toUpperCase();
      console.log("...............URL TRUE3..........");
      if (local_md5sig === md5sig && status_code === "2") {
        // TODO: Update your database as payment success
        console.log("...............URL TRUE4..........");
        prisma.order.update({
          where: { id: order_id },
          data: {
            status: "complete",
          },
        });
        console.log("...............URL TRUE5..........");
        res.status(200).json({ success: true });
      } else {
        res.status(400).json({
          success: false,
          error: "Invalid payment status or signature",
        });
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// import { NextApiRequest, NextApiResponse } from "next";
// import * as crypto from "crypto"; // For secure hashing

// // Replace with your actual values from PayHere
// const merchantId = process.env.PAYHERE_MERCHANT_ID;
// const merchantSecret = process.env.PAYHERE_MERCHANT_SECRET;

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method Not Allowed" });
//   }

//   const { orderId, payhereAmount, payhereCurrency, statusCode, md5sig } =
//     req.body;

//   // Validate input data (example using optional chaining)
//   if (
//     !orderId ||
//     !payhereAmount ||
//     !payhereCurrency ||
//     !statusCode ||
//     !md5sig
//   ) {
//     return res.status(400).json({ message: "Missing required data" });
//   }

//   const localMd5sig = generateLocalChecksum(
//     orderId,
//     payhereAmount,
//     payhereCurrency,
//     statusCode
//   );

//   if (localMd5sig !== md5sig) {
//     return res.status(400).json({ message: "Invalid payment notification" });
//   }

//   // Payment notification is valid, proceed with actions (e.g., update database)
//   // ...

//   res.status(200).json({ message: "Payment successful" });
// }

// function generateLocalChecksum(
//   orderId: string,
//   payhereAmount: string,
//   payhereCurrency: string,
//   statusCode: string
// ): string {
//   const hashedSecret = crypto
//     .createHash("sha256")
//     .update(merchantSecret)
//     .digest("hex")
//     .toUpperCase();
//   const dataToHash = `${merchantId}${orderId}${payhereAmount}${payhereCurrency}${statusCode}${hashedSecret}`;
//   return crypto
//     .createHash("sha256")
//     .update(dataToHash)
//     .digest("hex")
//     .toUpperCase();
// }
