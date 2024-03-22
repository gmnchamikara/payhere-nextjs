import { NextRequest, NextResponse } from "next/server";

const md5 = require("crypto-js/md5");

interface IPrams {
  paymentIntent: string;
}

export async function GET(

) {
  const data = {
    merchantId: process.env.MERCHANT_ID,
    return_url: "http://localhost:3000/",
    cancel_url: "http://localhost:3000/",
    notify_url: "http://localhost:3000/api/payhere-webhook",
    merchantSecret: process.env.MERCHANT_SECRET,
    first_name: "Nuwan",
    last_name: "Chamikara",
    email: "Nuwan2gmail.com",
    phone: "0711234567",
    address: "Anuradhapura",
    city: "kekirawa",
    country: "Sri lanka",
    orderId: "aaaa",
    items: "Mug",
    currency: "LKR",
    amount: 1200,
    /*
     **
     * Addtional parameters
     **
     */
    // delivery_address - Delivery Address Line1 + Line2
    // delivery_city - Delivery City
    // delivery_country - Delivery Country
    // item_name_1 - Name of Item 1
    // item_number_1 - Model number of Item 1
    // amount_1 - Unit amount of Item 1
    // quantity_1 - Quantity of Item 1
    // item_name_2 - Name of Item 2
    // item_number_2 - Model number of Item 2
    // amount_2 - Unit amount of Item 2
    // quantity_2 - Quantity of Item 2
    // (You can list rest of the items also like this)
    // platform - Referring Platform
    // custom_1 - Custom param 1 set by merchant
    // custom_2 - Custom param 2 set by merchant
  };

  const hash = generateHash(data);

  const responseData = {
    ...data,
    hash: hash,
  };

  function generateHash(data: any) {
    const { merchantId, orderId, amount, currency, merchantSecret } = data;
    const hashedSecret = md5(merchantSecret).toString().toUpperCase();
    const amountFormated = parseFloat(amount)
      .toLocaleString("en-us", { minimumFractionDigits: 2 })
      .replaceAll(",", "");
    const hash = md5(
      merchantId + orderId + amountFormated + currency + hashedSecret
    )
      .toString()
      .toUpperCase();
    return hash;
  }
  return NextResponse.json(responseData);
}
