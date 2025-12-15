import { check, sleep } from "k6";
import http from "k6/http";

export const options = {
  stages: [
    { duration: "1m", target: 15 },          
    { duration: "1m", target: 15 },
    { duration: "1m", target: 0 }      
  ],
  
 	thresholds: {
    "http_req_duration": ["p(95) < 200"]
  },
  // default is false
  discardResponseBodies: false,
  
  cloud: {
    distribution: {
      distributionLabel1: { loadZone: 'amazon:us:ashburn', percent: 40 },
      distributionLabel2: { loadZone: 'amazon:ie:dublin', percent: 60 },
    },
  },
 
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function() {
  let res = http.get("https://bp-calc-personal-acc-staging.azurewebsites.net/", {"responseType": "text"});
  
  check(res, {
    "is status 200": (r) => r.status === 200
  });
  res = res.submitForm({
    fields: { BP_Systolic: getRandomInt(70, 190), BP_Diastolic: getRandomInt(40, 100)}
  });

  check(res, {
    "is status 200": (r) => r.status === 200
  });

  sleep(3);
}

