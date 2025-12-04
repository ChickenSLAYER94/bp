import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "1m", target: 10 }, // ramp up
    { duration: "2m", target: 10 }, // hold
    { duration: "1m", target: 0 },  // ramp down
  ],
  thresholds: {
    http_req_duration: ["p(95)<500"], // 95% of requests < 500 ms
  },
  discardResponseBodies: false,
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function () {
  const url = "https://bp-calc.azurewebsites.net/";

  // 1. GET the Razor Page (Index.cshtml mapped to /)
  let res = http.get(url, { responseType: "text" });

  check(res, {
    "GET / status is 200": (r) => r.status === 200,
  });

  // 2. Prepare random BP values
  const sys = getRandomInt(70, 190);
  const dia = getRandomInt(40, 100);

  // 3. POST form fields; k6 sends an object as x-www-form-urlencoded [web:42][web:50]
  res = http.post(url, {
    BP_Systolic: sys.toString(),
    BP_Diastolic: dia.toString(),
  });

  check(res, {
    "POST / status is 200": (r) => r.status === 200,
  });

  sleep(1);
}
