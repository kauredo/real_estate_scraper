#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ES6 module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const LOCALES_DIR = path.join(__dirname, "../src/locales");
const LANGUAGES = ["en", "pt"];

/**
 * Get all JSON files in a language directory
 */
function getJsonFiles(languageDir) {
  if (!fs.existsSync(languageDir)) {
    return [];
  }
  return fs
    .readdirSync(languageDir)
    .filter(file => file.endsWith(".json"))
    .sort();
}

/**
 * Recursively get all translation keys from an object
 */
function getTranslationKeys(obj, prefix = "") {
  const keys = [];

  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (
      typeof obj[key] === "object" &&
      obj[key] !== null &&
      !Array.isArray(obj[key])
    ) {
      // Recursively get keys from nested objects
      keys.push(...getTranslationKeys(obj[key], fullKey));
    } else {
      // This is a leaf node (actual translation)
      keys.push(fullKey);
    }
  }

  return keys;
}

/**
 * Load and parse a JSON translation file
 */
function loadTranslationFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    return JSON.parse(content);
  } catch (error) {
    console.error(`❌ Error loading ${filePath}:`, error.message);
    return null;
  }
}

/**
 * Compare translation files between languages
 */
function compareTranslationFiles() {
  console.log("🔍 Comparing translation files between languages...\n");

  const results = {
    missingFiles: { en: [], pt: [] },
    missingKeys: { en: [], pt: [] },
    fileComparisons: [],
  };

  // Get all files from both languages
  const enDir = path.join(LOCALES_DIR, "en");
  const ptDir = path.join(LOCALES_DIR, "pt");

  const enFiles = getJsonFiles(enDir);
  const ptFiles = getJsonFiles(ptDir);

  const allFiles = new Set([...enFiles, ...ptFiles]);

  console.log(
    `📊 Found ${enFiles.length} EN files and ${ptFiles.length} PT files\n`
  );

  // Check for missing files
  const missingInEn = ptFiles.filter(file => !enFiles.includes(file));
  const missingInPt = enFiles.filter(file => !ptFiles.includes(file));

  if (missingInEn.length > 0) {
    console.log("🚨 Files missing in EN:");
    missingInEn.forEach(file => {
      console.log(`   - ${file}`);
      results.missingFiles.en.push(file);
    });
    console.log();
  }

  if (missingInPt.length > 0) {
    console.log("🚨 Files missing in PT:");
    missingInPt.forEach(file => {
      console.log(`   - ${file}`);
      results.missingFiles.pt.push(file);
    });
    console.log();
  }

  // Compare common files
  const commonFiles = [...allFiles].filter(
    file => enFiles.includes(file) && ptFiles.includes(file)
  );

  console.log(`🔄 Comparing ${commonFiles.length} common files...\n`);

  commonFiles.forEach(filename => {
    const enPath = path.join(enDir, filename);
    const ptPath = path.join(ptDir, filename);

    const enData = loadTranslationFile(enPath);
    const ptData = loadTranslationFile(ptPath);

    if (!enData || !ptData) {
      console.log(`⚠️  Skipping ${filename} due to loading errors\n`);
      return;
    }

    const enKeys = getTranslationKeys(enData);
    const ptKeys = getTranslationKeys(ptData);

    const enKeySet = new Set(enKeys);
    const ptKeySet = new Set(ptKeys);

    const missingInPt = enKeys.filter(key => !ptKeySet.has(key));
    const missingInEn = ptKeys.filter(key => !enKeySet.has(key));

    const fileComparison = {
      filename,
      enKeys: enKeys.length,
      ptKeys: ptKeys.length,
      missingInEn,
      missingInPt,
    };

    results.fileComparisons.push(fileComparison);

    if (missingInEn.length > 0 || missingInPt.length > 0) {
      console.log(`📄 ${filename}:`);
      console.log(`   EN: ${enKeys.length} keys, PT: ${ptKeys.length} keys`);

      if (missingInPt.length > 0) {
        console.log(`   🇵🇹 Missing in Portuguese (${missingInPt.length}):`);
        missingInPt.forEach(key => {
          console.log(`      - ${key}`);
          results.missingKeys.pt.push(`${filename}: ${key}`);
        });
      }

      if (missingInEn.length > 0) {
        console.log(`   🇬🇧 Missing in English (${missingInEn.length}):`);
        missingInEn.forEach(key => {
          console.log(`      - ${key}`);
          results.missingKeys.en.push(`${filename}: ${key}`);
        });
      }
      console.log();
    } else {
      console.log(`✅ ${filename}: All keys match (${enKeys.length} keys)`);
    }
  });

  return results;
}

/**
 * Generate a summary report
 */
function generateSummaryReport(results) {
  console.log("\n" + "=".repeat(60));
  console.log("📋 TRANSLATION COMPARISON SUMMARY");
  console.log("=".repeat(60));

  console.log(`\n🗂️  File Status:`);
  console.log(`   • Missing EN files: ${results.missingFiles.en.length}`);
  console.log(`   • Missing PT files: ${results.missingFiles.pt.length}`);

  console.log(`\n🔑 Translation Keys:`);
  console.log(`   • Missing EN translations: ${results.missingKeys.en.length}`);
  console.log(`   • Missing PT translations: ${results.missingKeys.pt.length}`);

  const totalEnKeys = results.fileComparisons.reduce(
    (sum, comp) => sum + comp.enKeys,
    0
  );
  const totalPtKeys = results.fileComparisons.reduce(
    (sum, comp) => sum + comp.ptKeys,
    0
  );

  console.log(`\n📊 Statistics:`);
  console.log(`   • Total EN keys: ${totalEnKeys}`);
  console.log(`   • Total PT keys: ${totalPtKeys}`);
  console.log(`   • Difference: ${Math.abs(totalEnKeys - totalPtKeys)} keys`);

  const filesWithIssues = results.fileComparisons.filter(
    comp => comp.missingInEn.length > 0 || comp.missingInPt.length > 0
  );

  console.log(
    `   • Files with translation gaps: ${filesWithIssues.length}/${results.fileComparisons.length}`
  );

  if (
    results.missingKeys.en.length === 0 &&
    results.missingKeys.pt.length === 0 &&
    results.missingFiles.en.length === 0 &&
    results.missingFiles.pt.length === 0
  ) {
    console.log(`\n🎉 All translations are in sync! 🎉`);
  } else {
    console.log(`\n⚠️  Action required: Fix missing translations above`);
  }
}

/**
 * Generate a detailed report file
 */
function generateDetailedReport(results) {
  const reportPath = path.join(LOCALES_DIR, "TRANSLATION_COMPARISON_REPORT.md");

  let report = `# Translation Comparison Report
Generated on: ${new Date().toISOString()}

## Summary

- Missing EN files: ${results.missingFiles.en.length}
- Missing PT files: ${results.missingFiles.pt.length}  
- Missing EN translations: ${results.missingKeys.en.length}
- Missing PT translations: ${results.missingKeys.pt.length}

`;

  if (results.missingFiles.en.length > 0) {
    report += `## Missing Files in English\n\n`;
    results.missingFiles.en.forEach(file => {
      report += `- \`${file}\`\n`;
    });
    report += "\n";
  }

  if (results.missingFiles.pt.length > 0) {
    report += `## Missing Files in Portuguese\n\n`;
    results.missingFiles.pt.forEach(file => {
      report += `- \`${file}\`\n`;
    });
    report += "\n";
  }

  if (results.missingKeys.pt.length > 0) {
    report += `## Missing Portuguese Translations\n\n`;
    results.missingKeys.pt.forEach(key => {
      report += `- \`${key}\`\n`;
    });
    report += "\n";
  }

  if (results.missingKeys.en.length > 0) {
    report += `## Missing English Translations\n\n`;
    results.missingKeys.en.forEach(key => {
      report += `- \`${key}\`\n`;
    });
    report += "\n";
  }

  report += `## File-by-File Breakdown\n\n`;
  results.fileComparisons.forEach(comp => {
    const status =
      comp.missingInEn.length === 0 && comp.missingInPt.length === 0
        ? "✅"
        : "⚠️";
    report += `### ${status} ${comp.filename}\n`;
    report += `- EN: ${comp.enKeys} keys\n`;
    report += `- PT: ${comp.ptKeys} keys\n`;

    if (comp.missingInPt.length > 0) {
      report += `- Missing in PT: ${comp.missingInPt.length}\n`;
    }
    if (comp.missingInEn.length > 0) {
      report += `- Missing in EN: ${comp.missingInEn.length}\n`;
    }
    report += "\n";
  });

  fs.writeFileSync(reportPath, report);
  console.log(`📝 Detailed report saved to: TRANSLATION_COMPARISON_REPORT.md`);
}

/**
 * Main execution
 */
function main() {
  console.log("🚀 Starting translation comparison...\n");

  const results = compareTranslationFiles();
  generateSummaryReport(results);
  generateDetailedReport(results);

  console.log("\n✅ Comparison complete!");
}

// Run the script
main();

export { compareTranslationFiles };
