import { check, sleep } from "k6";
import http from "k6/http";

export let options = {
    stages: [
        { duration: "2m", target: 30 }, // Ramp-up to 30 users over 2 minutes
        { duration: "5m", target: 30 }, // Stay at 30 users for 5 minutes
        { duration: "2m", target: 0 },   // Ramp-down to 0 users over 2 minutes
    ],
    thresholds: {
        http_req_duration: ["p(95)<500"], // 95% of requests should be below 500ms
    },

     discardResponseBodies: true,

  cloud: {
    distribution: {
      distributionLabel1: { loadZone: 'amazon:us:ashburn', percent: 50 },
      distributionLabel2: { loadZone: 'amazon:ie:dublin', percent: 50 },
    },
  },

};  
export default function() {
  let res = http.get("https://bp-calc.azurewebsites.net/");

  check(res, {
      "is status 200": (r) => r.status === 200
  });

// sleep for 3 seconds between iterations
  sleep(3);
}
