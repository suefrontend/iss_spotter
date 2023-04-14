// index.js
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require("./iss");

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Returned IP:", ip);
// });

// fetchCoordsByIP("8.8.4.4.test", (error, data) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Returned IP:", data);
// });

fetchISSFlyOverTimes(
  { latitude: "49.27670", longitude: "-123.13000" },
  (error, data) => {
    if (error) {
      console.log("It didn't work!", error);
      return;
    }

    console.log("It worked! Returned IP:", data);
  }
);
