import { execSync } from "child_process";
import { config } from "dotenv";
config();

// Use vercel token from vercel CLI global config
const os = require("os");
const path = require("path");
const fs = require("fs");

// Try to find the Vercel token in common locations
const possiblePaths = [
  path.join(os.homedir(), ".config", "vercel", "auth.json"),
  path.join(os.homedir(), ".vercel", "auth.json"),
  path.join(process.env.APPDATA || "", "Vercel", "auth.json"),
  path.join(process.env.LOCALAPPDATA || "", "Vercel", "auth.json"),
];

let token = "";
for (const p of possiblePaths) {
  try {
    if (fs.existsSync(p)) {
      const data = JSON.parse(fs.readFileSync(p, "utf-8"));
      token = data.token || "";
      console.log("✅ Token trouvé dans:", p);
      break;
    }
  } catch {}
}

if (!token) {
  console.log("❌ Token Vercel introuvable. Chemins cherchés:", possiblePaths);
  process.exit(1);
}

const PROJECT_ID = "prj_LvN9muw24xmiIc0V8ZXecHH8Ip8G";
const TEAM_ID = "team_q9plfYZqSvPJROj2kgX7Mu2H";

async function fixRootDirectory() {
  console.log("🔧 Fixing Root Directory on Vercel project...");
  
  const res = await fetch(`https://api.vercel.com/v9/projects/${PROJECT_ID}?teamId=${TEAM_ID}`, {
    method: "PATCH",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      rootDirectory: null, // Clear the rootDirectory
    }),
  });
  
  const data = await res.json();
  
  if (res.ok) {
    console.log("✅ Root Directory effacé avec succès!");
    console.log("rootDirectory actuel:", data.rootDirectory);
  } else {
    console.error("❌ Erreur:", data);
  }
}

fixRootDirectory();
