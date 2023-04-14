/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require("request");

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API

  request(
    "https://api.ipify.org?format=json",
    function(error, response, body) {
      if (error) {
        callback(error, null);
        return;
      }

      // if non-200 status, assume server error
      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
        callback(Error(msg), null);
        return;
      }

      const ip = JSON.parse(body).ip;
      callback(null, ip); // (error, desc)
    }
  );
};

const fetchCoordsByIP = function(ip, callback) {
  request(`http://ipwho.is/${ip}`, function(error, response, body) {
    if (error) {
      callback(error, null);
      return;
    }

    const parsedBody = JSON.parse(body);
    const lat = parsedBody.latitude;
    const long = parsedBody.longitude;

    // console.log("parsedBody", parsedBody);
    if (!parsedBody.success) {
      const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
      callback(message, null);
      return;
    }

    callback(null, { latitude: lat, longitude: long }); // (error, desc)
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(
    `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`,
    function(error, response, body) {
      if (error) {
        callback(error, null);
        return;
      }

      // if non-200 status, assume server error
      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
        callback(msg, null);
        return;
      }
      const parsedBody = JSON.parse(body);
      callback(null, parsedBody.response); // (error, desc)
    }
  );
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };
