import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 1,
  duration: "10s",
  thresholds: {
    http_req_duration: ["p(95)<500"],
  },
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function () {
  const url = "https://bp-calc.azurewebsites.net/";

  // GET
  let res = http.get(url, { responseType: "text" });
  check(res, { "GET / status is 200": (r) => r.status === 200 });

  const sys = getRandomInt(70, 190);
  const dia = getRandomInt(40, 100);

  // POST form
  res = http.post(url, {
    BP_Systolic: sys.toString(),
    BP_Diastolic: dia.toString(),
  }, {


headers: {
  "Content-Type": "application/x-www-form-urlencoded"
},
                 
                 
  });

  console.log(`POST status=${res.status}`);
  console.log(`POST body snippet: ${res.body && res.body.substring(0, 200)}`);

  check(res, { "POST / status is 200": (r) => r.status === 200 });

  sleep(1);
}
