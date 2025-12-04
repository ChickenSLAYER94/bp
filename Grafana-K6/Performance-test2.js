import {check, sleep} from "k6";
import http from "k6/http";

export let optionw= {

    stages: [
        {duration: "1m", target: 30}, // Ramp-up to 20 users over 1 minute
        {duration: "1m", target: 30}, // Stay at 20 users for 1 minutes
        {duration: "1m", target: 0},   // Ramp-down to 0 users over 1 minute
    ],

     thresholds: {
        http_req_duration: ["p(95)<500"], // 95% of requests should be below 500ms
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

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function() {
 
  let res = http.get("https://https://bp-calc.azurewebsites.net/", {"responseType": "text"});

  check(res, {
    "is status 200": (r) => r.status === 200
  });

  res = res.submitForm({
    fields: { BP_Systolic: getRandomInt(190, 70).toString(), BP_Diastolic: getRandomInt(100, 40).toString()}
  });

  check(res, {
    "is status 200": (r) => r.status === 200
  });

// sleep for 3 seconds between iterations
  sleep(3);
}

