import { config as dotenvConfig } from "dotenv";
import { resolve } from "path";
import { getGCalAccessToken } from "./src/lib/gcal-server";

async function testFreeBusy() {
  console.log("Testing GCal freeBusy integration...");
  const cwd = process.cwd();
  dotenvConfig({ path: resolve(cwd, ".env") });
  
  const calId = process.env["GCAL_CALENDAR_ID"];
  console.log("CalID:", calId);
  
  try {
    const token = await getGCalAccessToken();
    if (!token) {
      console.error("No access token!");
      return;
    }
    
    // Test for today
    const now = new Date();
    const timeMin = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0).toISOString();
    const timeMax = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59).toISOString();
    
    console.log("timeMin:", timeMin);
    console.log("timeMax:", timeMax);
    
    const res = await fetch("https://www.googleapis.com/calendar/v3/freeBusy", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        timeMin: timeMin,
        timeMax: timeMax,
        items: [{ id: calId }],
      }),
    });
    
    if (!res.ok) {
      console.error("FreeBusy API Error:", res.status, await res.text());
      return;
    }
    
    const json = await res.json();
    console.log("Response:", JSON.stringify(json, null, 2));
  } catch (error) {
    console.error("Error:", error);
  }
}

testFreeBusy();
