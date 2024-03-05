import axios from "axios";

function paymentGateWay() {
  axios
    .get("http://localhost:8000/")
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

        // Called when user completed the payment. It can be a successful payment or failure
        window.payhere.onCompleted = function onCompleted(OrderID) {
          console.log("Payment completed. OrderID:" + OrderID);
          //Note: validate the payment and show success or failure page to the customer
        };

        // Called when user closes the payment without completing
        window.payhere.onDismissed = function onDismissed() {
          //Note: Prompt user to pay again or show an error page
          console.log("Payment dismissed");
        };

        // Called when error happens when initializing payment such as invalid parameters
        window.payhere.onError = function onError(error) {
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
}

export default paymentGateWay;


// import axios from "axios";


// function paymentGateWay() {
//   axios
//     .get("http://localhost:8000/")
//     .then((response) => {
//       const responseData = response.data;

//  const hashValue = generateHash({
//    merchantId: "1226089",
//    orderId: "ItemNo12345",
//    amount: 5000,
//    currency: "LKR",
//    merchantSecret: "Mzg3OTY0OTEwMDQxOTg2ODQxODY0MTAyNjU3MjYxMjM1NzM2NzUwMg==",
//  });


//       if (response) {
//         // Put the payment variables here
//         var payment = {
//           sandbox: true,
//           merchant_id: "1226089", // Replace your Merchant ID
//           return_url: "http://localhost:3000/", // Important
//           cancel_url: "http://localhost:3000/", // Important
//           notify_url: "http://localhost:3000/",
//           first_name: "Saman",
//           last_name: "Perera",
//           email: "samanp@gmail.com",
//           phone: "0771234567",
//           address: "No.1, Galle Road",
//           city: "Colombo",
//           country: "Sri Lanka",
//           order_id: "ItemNo12345",
//           items: "Door bell wireles",
//           amount: "1000.00",
//           currency: "LKR",
//           hash: hashValue,
//         };

//         // Called when user completed the payment. It can be a successful payment or failure
//         window.payhere.onCompleted = function onCompleted(OrderID) {
//           console.log("Payment completed. OrderID:" + OrderID);
//           //Note: validate the payment and show success or failure page to the customer
//         };

//         // Called when user closes the payment without completing
//         window.payhere.onDismissed = function onDismissed() {
//           //Note: Prompt user to pay again or show an error page
//           console.log("Payment dismissed");
//         };

//         // Called when error happens when initializing payment such as invalid parameters
//         window.payhere.onError = function onError(error) {
//           // Note: show an error page
//           console.log("Error:" + error);
//         };

//         window.payhere.startPayment(payment);
//         //payhere startPayment(payment);
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }

// export default paymentGateWay;