import { check, sleep } from "k6";
import http from "k6/http";

export let options = {
    stages: [
        { duration: "1m", target: 35 }, // Ramp-up to 35 users over 1 minutes
        { duration: "1m", target: 35 }, // Stay at 35 users for 1 minutes
        { duration: "1m", target: 0 },   // Ramp-down to 0 users over 1 minutes
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
  let res = http.get("https://bp-calc-personal-acc-staging.azurewebsites.net/");

  check(res, {
      "is status 200": (r) => r.status === 200
  });

// sleep for 3 seconds between iterations
  sleep(3);
}
