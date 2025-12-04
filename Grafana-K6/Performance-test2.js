import { check, sleep } from "k6";
import http from "k6/http";

export let options = {
  stages: [
    { duration: "1m", target: 30 },
    { duration: "1m", target: 30 },
    { duration: "1m", target: 0 },
  ],
  thresholds: {
    http_req_duration: ["p(95)<500"],
  },
  discardResponseBodies: false,
  cloud: {
    distribution: {
      distributionLabel1: { loadZone: "amazon:us:ashburn", percent: 50 },
      distributionLabel2: { loadZone: "amazon:ie:dublin", percent: 50 },
    },
  },
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function () {
  let res = http.get("https://bp-calc.azurewebsites.net/", { responseType: "text" });

  check(res, {
    "is status 200": (r) => r.status === 200,
  });

  // Submit form with POST, not res.submitForm()
  res = http.post("https://bp-calc.azurewebsites.net/", {
    BP_Systolic: getRandomInt(70, 190).toString(),
    BP_Diastolic: getRandomInt(40, 100).toString(),
  });

  check(res, {
    "is status 200": (r) => r.status === 200,
  });

  sleep(3);
}
