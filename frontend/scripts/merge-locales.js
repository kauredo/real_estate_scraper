#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ES6 module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const LOCALES_DIR = path.join(__dirname, "../src/locales");
const LANGUAGES = ["en", "pt"]; // Add more languages as needed

/**
 * Merge split locale files back into a single file
 */
function mergeLocaleFiles(language) {
  const languageDir = path.join(LOCALES_DIR, language);

  if (!fs.existsSync(languageDir)) {
    console.log(`⚠️  Language directory not found: ${languageDir}`);
    return;
  }

  console.log(`\n📂 Processing ${language} directory...`);

  const mergedData = {};

  // Read all JSON files in the language directory (except index.js)
  const files = fs
    .readdirSync(languageDir)
    .filter((file) => file.endsWith(".json"))
    .sort(); // Sort for consistent ordering

  files.forEach((file) => {
    const filePath = path.join(languageDir, file);
    const key = path.basename(file, ".json");

    try {
      const fileContent = fs.readFileSync(filePath, "utf8");
      const data = JSON.parse(fileContent);
      mergedData[key] = data;
      console.log(`  ✅ Merged: ${file}`);
    } catch (error) {
      console.error(`  ❌ Error reading ${file}:`, error.message);
    }
  });

  // Write the merged file
  const outputPath = path.join(LOCALES_DIR, `${language}.merged.json`);
  fs.writeFileSync(outputPath, JSON.stringify(mergedData, null, 2));
  console.log(`📄 Created merged file: ${language}.merged.json`);
  console.log(`✨ Merged ${files.length} files for ${language}`);
}

/**
 * Compare original and merged files to verify integrity
 */
function compareFiles(language) {
  const originalPath = path.join(LOCALES_DIR, `${language}.json.backup`);
  const mergedPath = path.join(LOCALES_DIR, `${language}.merged.json`);

  if (!fs.existsSync(originalPath) || !fs.existsSync(mergedPath)) {
    console.log(`⚠️  Cannot compare: missing files for ${language}`);
    return;
  }

  const original = JSON.parse(fs.readFileSync(originalPath, "utf8"));
  const merged = JSON.parse(fs.readFileSync(mergedPath, "utf8"));

  const originalKeys = new Set(Object.keys(original));
  const mergedKeys = new Set(Object.keys(merged));

  const missingKeys = [...originalKeys].filter((key) => !mergedKeys.has(key));
  const extraKeys = [...mergedKeys].filter((key) => !originalKeys.has(key));

  if (missingKeys.length === 0 && extraKeys.length === 0) {
    console.log(
      `✅ ${language}: All keys match between original and merged files`,
    );
  } else {
    console.log(`⚠️  ${language}: Key differences found:`);
    if (missingKeys.length > 0) {
      console.log(`  Missing keys: ${missingKeys.join(", ")}`);
    }
    if (extraKeys.length > 0) {
      console.log(`  Extra keys: ${extraKeys.join(", ")}`);
    }
  }
}

/**
 * Main execution
 */
function main() {
  console.log("🔄 Starting locale files merging process...\n");

  // Merge each language
  LANGUAGES.forEach((language) => {
    mergeLocaleFiles(language);
    compareFiles(language);
  });

  console.log("\n✅ Merging complete! Check .merged.json files for results.");
  console.log(
    "\n💡 Tip: Use this to verify the split/merge process worked correctly.",
  );
}

// Run the script
main();

export { mergeLocaleFiles };
