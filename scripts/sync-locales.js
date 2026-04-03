/**
 * sync-locales.js
 * Ensures all locale JSON files have the same keys as en.json.
 * Missing keys are filled with the English value (as a fallback).
 * Existing translated values are preserved.
 */
const fs = require("fs");
const path = require("path");

const messagesDir = path.join(__dirname, "..", "messages");
const enPath = path.join(messagesDir, "en.json");
const en = JSON.parse(fs.readFileSync(enPath, "utf-8"));

function syncObject(source, target) {
  const result = {};
  for (const key of Object.keys(source)) {
    if (typeof source[key] === "object" && source[key] !== null && !Array.isArray(source[key])) {
      result[key] = syncObject(source[key], target && typeof target[key] === "object" ? target[key] : {});
    } else if (Array.isArray(source[key])) {
      result[key] = target && Array.isArray(target[key]) && target[key].length === source[key].length
        ? target[key]
        : source[key];
    } else {
      result[key] = target && target[key] !== undefined ? target[key] : source[key];
    }
  }
  return result;
}

const files = fs.readdirSync(messagesDir).filter(f => f.endsWith(".json") && f !== "en.json");
let synced = 0;

for (const file of files) {
  const filePath = path.join(messagesDir, file);
  const locale = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const merged = syncObject(en, locale);
  fs.writeFileSync(filePath, JSON.stringify(merged, null, 2) + "\n", "utf-8");
  synced++;
  console.log("Synced: " + file);
}

console.log("\nDone. Synced " + synced + " locale files with en.json.");
