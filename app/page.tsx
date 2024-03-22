"use client";

import axios from "axios";

declare global {
  interface Window {
    payhere?: any;
  }
}

export default function Home() {
    const handleSubmit = async (e: React.FormEvent) => {
      axios
        .get("/api/payhere")
        .then((response) => {
          const responseData = response.data;
          if (response) {
            // Put the payment variables here
            var payment = {
              sandbox: true,
              merchant_id: responseData.merchantId,
              return_url: responseData.return_url,
              cancel_url: responseData.cancel_url,
              notify_url: responseData.notify_url,
              first_name: responseData.first_name,
              last_name: responseData.last_name,
              email: responseData.email,
              phone: responseData.phone,
              address: responseData.address,
              city: responseData.city,
              country: responseData.country,
              order_id: responseData.orderId,
              items: responseData.items,
              amount: responseData.amount,
              currency: responseData.currency,
              hash: responseData.hash,
            };
            console.log(">>>>>>>>> payment", payment);
            // Called when user completed the payment. It can be a successful payment or failure
            window.payhere.onCompleted = function onCompleted(OrderID: any) {
              console.log("Payment completed. OrderID:" + OrderID);
              //Note: validate the payment and show success or failure page to the customer
            };

            // Called when user closes the payment without completing
            window.payhere.onDismissed = function onDismissed() {
              //Note: Prompt user to pay again or show an error page
              console.log("Payment dismissed");
            };

            // Called when error happens when initializing payment such as invalid parameters
            window.payhere.onError = function onError(error: any) {
              // Note: show an error page
              console.log("Error:" + error);
            };

            window.payhere.startPayment(payment);
            //payhere startPayment(payment);
          }
        })
        .catch((error) => {
          console.log(error);
        });
      e.preventDefault();
      // handleClearCart();
      // handleSetPaymentIntent(null);
    };

  return (
    <div className="bg-white items-center">
      <div className=" text-black">Pay here</div>
      <button className="bg-red-400" onClick={handleSubmit}>
        Start Payment
      </button>
    </div>
  );
}
