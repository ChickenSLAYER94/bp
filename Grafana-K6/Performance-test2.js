import {check, sleep} from "k6";
import http from "k6/http";

export let options= {

    stages: [
        {duration: "1m", target: 30}, // Ramp-up to 30 users over 1 minute
        {duration: "1m", target: 30}, // Stay at 30 users for 1 minutes
        {duration: "1m", target: 0},   // Ramp-down to 0 users over 1 minute
    ],

     thresholds: {
        http_req_duration: ["p(95)<300"], // 95% of requests should be below 300ms
    },

     discardResponseBodies: false,

  cloud: {
    distribution: {
      distributionLabel1: { loadZone: 'amazon:us:ashburn', percent: 50 },
      distributionLabel2: { loadZone: 'amazon:ie:dublin', percent: 50 },
    },
  },


};

/**
 * 
 * @param {number} min - min number
 * @param {number} max - max number
 * @return {number} random int between min and max
 */

// function getRandomInt(min, max) {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// }

// export default function() {
 
//   let res = http.get("https://https://bp-calc.azurewebsites.net/", {"responseType": "text"});

//   check(res, {
//     "is status 200": (r) => r.status === 200
//   });

//   res = res.submitForm({
//     fields: { BP_Systolic: getRandomInt(190, 70).toString(), BP_Diastolic: getRandomInt(100, 40).toString()}
//   });

//   check(res, {
//     "is status 200": (r) => r.status === 200
//   });

// // sleep for 3 seconds between iterations
//   sleep(3);
// }

  // Generate random values
  const sys = getRandomInt(70, 190);
  const dia = getRandomInt(40, 100);

  console.log(`Submitting form with Systolic=${sys}, Diastolic=${dia}`);

  // POST form data
  res = http.post(url, {
    BP_Systolic: sys.toString(),
    BP_Diastolic: dia.toString(),
  });

  console.log(`POST ${url} -> status=${res.status}`);

  // Optional: log a small snippet of the response body
  if (res.body) {
    console.log(`Response snippet: ${res.body.substring(0, 200)}`);
  }

  check(res, {
    "POST status is 200": (r) => r.status === 200,
  });

  sleep(3);
}

