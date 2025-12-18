#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { glob } from "glob";

// ES6 module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const LOCALES_DIR = path.join(__dirname, "../src/locales");
const SRC_DIR = path.join(__dirname, "../src");
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
    .filter((file) => file.endsWith(".json"))
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
      keys.push(...getTranslationKeys(obj[key], fullKey));
    } else {
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
 * Get all translation keys from all locale files
 */
function getAllTranslationKeys(language) {
  const languageDir = path.join(LOCALES_DIR, language);
  const jsonFiles = getJsonFiles(languageDir);
  const allKeys = new Set();

  jsonFiles.forEach((filename) => {
    const filePath = path.join(languageDir, filename);
    const data = loadTranslationFile(filePath);

    if (data) {
      const namespace = filename.replace(".json", "");
      const keys = getTranslationKeys(data);

      keys.forEach((key) => {
        // Store keys with their namespace for accurate matching
        allKeys.add(`${namespace}.${key}`);
        // Also store without namespace for backward compatibility
        allKeys.add(key);
      });
    }
  });

  return allKeys;
}

/**
 * Find all translation keys used in source code
 */
async function findUsedTranslationKeys() {
  console.log("🔍 Scanning source code for translation usage...\n");

  const usedKeys = new Set();
  const keyUsageMap = new Map(); // Track where keys are used

  // Find all TSX, TS, JSX, and JS files
  const files = await glob("**/*.{tsx,ts,jsx,js}", {
    cwd: SRC_DIR,
    ignore: ["**/node_modules/**", "**/dist/**", "**/build/**", "**/*.test.*"],
    absolute: true,
  });

  console.log(`📁 Found ${files.length} source files to scan\n`);

  // Regex patterns to find translation keys
  const patterns = [
    // t('key') or t("key")
    /\bt\s*\(\s*['"]([^'"]+)['"]/g,
    // t(`key`)
    /\bt\s*\(\s*`([^`]+)`/g,
    // i18n.t('key')
    /i18n\.t\s*\(\s*['"]([^'"]+)['"]/g,
    // useTranslation or other hooks returning t
    // This catches destructured t: const { t } = useTranslation()
  ];

  files.forEach((filePath) => {
    const content = fs.readFileSync(filePath, "utf8");
    const relativePath = path.relative(SRC_DIR, filePath);

    patterns.forEach((pattern) => {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        const key = match[1];
        // Skip if it looks like a variable (e.g., starts with ${ or contains variables)
        if (key && !key.includes("${") && !key.startsWith("$")) {
          usedKeys.add(key);

          // Track usage location
          if (!keyUsageMap.has(key)) {
            keyUsageMap.set(key, []);
          }
          keyUsageMap.get(key).push(relativePath);
        }
      }
    });
  });

  return { usedKeys, keyUsageMap };
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

  const enDir = path.join(LOCALES_DIR, "en");
  const ptDir = path.join(LOCALES_DIR, "pt");

  const enFiles = getJsonFiles(enDir);
  const ptFiles = getJsonFiles(ptDir);

  const allFiles = new Set([...enFiles, ...ptFiles]);

  console.log(
    `📊 Found ${enFiles.length} EN files and ${ptFiles.length} PT files\n`,
  );

  // Check for missing files
  const missingInEn = ptFiles.filter((file) => !enFiles.includes(file));
  const missingInPt = enFiles.filter((file) => !ptFiles.includes(file));

  if (missingInEn.length > 0) {
    console.log("🚨 Files missing in EN:");
    missingInEn.forEach((file) => {
      console.log(`   - ${file}`);
      results.missingFiles.en.push(file);
    });
    console.log();
  }

  if (missingInPt.length > 0) {
    console.log("🚨 Files missing in PT:");
    missingInPt.forEach((file) => {
      console.log(`   - ${file}`);
      results.missingFiles.pt.push(file);
    });
    console.log();
  }

  // Compare common files
  const commonFiles = [...allFiles].filter(
    (file) => enFiles.includes(file) && ptFiles.includes(file),
  );

  console.log(`🔄 Comparing ${commonFiles.length} common files...\n`);

  commonFiles.forEach((filename) => {
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

    const missingInPt = enKeys.filter((key) => !ptKeySet.has(key));
    const missingInEn = ptKeys.filter((key) => !enKeySet.has(key));

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
        missingInPt.forEach((key) => {
          console.log(`      - ${key}`);
          results.missingKeys.pt.push(`${filename}: ${key}`);
        });
      }

      if (missingInEn.length > 0) {
        console.log(`   🇬🇧 Missing in English (${missingInEn.length}):`);
        missingInEn.forEach((key) => {
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
 * Check for unused and missing translation keys
 */
async function checkTranslationUsage() {
  console.log("\n" + "=".repeat(60));
  console.log("🔎 CHECKING TRANSLATION USAGE IN CODE");
  console.log("=".repeat(60) + "\n");

  const { usedKeys, keyUsageMap } = await findUsedTranslationKeys();
  const enKeys = getAllTranslationKeys("en");
  const ptKeys = getAllTranslationKeys("pt");

  console.log(
    `📊 Found ${usedKeys.size} unique translation keys in source code`,
  );
  console.log(`📊 Found ${enKeys.size} keys in EN locale files`);
  console.log(`📊 Found ${ptKeys.size} keys in PT locale files\n`);

  // Find keys used in code but missing from locales
  const missingFromEn = [];
  const missingFromPt = [];

  usedKeys.forEach((key) => {
    if (!enKeys.has(key)) {
      missingFromEn.push(key);
    }
    if (!ptKeys.has(key)) {
      missingFromPt.push(key);
    }
  });

  // Find keys in locales but never used in code
  const unusedInEn = [];
  const unusedInPt = [];

  enKeys.forEach((key) => {
    if (!usedKeys.has(key)) {
      unusedInEn.push(key);
    }
  });

  ptKeys.forEach((key) => {
    if (!usedKeys.has(key)) {
      unusedInPt.push(key);
    }
  });

  return {
    usedKeys,
    keyUsageMap,
    missingFromEn,
    missingFromPt,
    unusedInEn,
    unusedInPt,
  };
}

/**
 * Generate comprehensive audit report
 */
function generateAuditReport(comparisonResults, usageResults) {
  const reportPath = path.join(LOCALES_DIR, "TRANSLATION_AUDIT_REPORT.md");

  let report = `# Translation Audit Report

Generated on: ${new Date().toISOString()}

## Executive Summary

### Language Parity
- Missing EN files: ${comparisonResults.missingFiles.en.length}
- Missing PT files: ${comparisonResults.missingFiles.pt.length}
- Missing EN translations: ${comparisonResults.missingKeys.en.length}
- Missing PT translations: ${comparisonResults.missingKeys.pt.length}

### Code Usage
- Translation keys used in code: ${usageResults.usedKeys.size}
- Keys missing from EN locales: ${usageResults.missingFromEn.length}
- Keys missing from PT locales: ${usageResults.missingFromPt.length}
- Unused keys in EN locales: ${usageResults.unusedInEn.length}
- Unused keys in PT locales: ${usageResults.unusedInPt.length}

---

`;

  // Section 1: Missing files
  if (
    comparisonResults.missingFiles.en.length > 0 ||
    comparisonResults.missingFiles.pt.length > 0
  ) {
    report += `## 🚨 Missing Translation Files\n\n`;

    if (comparisonResults.missingFiles.en.length > 0) {
      report += `### Missing in English\n\n`;
      comparisonResults.missingFiles.en.forEach((file) => {
        report += `- \`${file}\`\n`;
      });
      report += "\n";
    }

    if (comparisonResults.missingFiles.pt.length > 0) {
      report += `### Missing in Portuguese\n\n`;
      comparisonResults.missingFiles.pt.forEach((file) => {
        report += `- \`${file}\`\n`;
      });
      report += "\n";
    }
  }

  // Section 2: Keys used in code but missing from locales
  if (
    usageResults.missingFromEn.length > 0 ||
    usageResults.missingFromPt.length > 0
  ) {
    report += `## ⚠️ Translation Keys Used in Code But Missing from Locales\n\n`;
    report += `These keys are referenced in your source code but don't exist in the locale files. This will cause runtime errors.\n\n`;

    if (usageResults.missingFromEn.length > 0) {
      report += `### Missing from English Locales (${usageResults.missingFromEn.length} keys)\n\n`;
      usageResults.missingFromEn.slice(0, 50).forEach((key) => {
        const usageLocations = usageResults.keyUsageMap.get(key) || [];
        report += `- \`${key}\`\n`;
        if (usageLocations.length > 0) {
          report += `  - Used in: ${usageLocations.slice(0, 3).join(", ")}${usageLocations.length > 3 ? ` (+${usageLocations.length - 3} more)` : ""}\n`;
        }
      });
      if (usageResults.missingFromEn.length > 50) {
        report += `\n... and ${usageResults.missingFromEn.length - 50} more\n`;
      }
      report += "\n";
    }

    if (usageResults.missingFromPt.length > 0) {
      report += `### Missing from Portuguese Locales (${usageResults.missingFromPt.length} keys)\n\n`;
      usageResults.missingFromPt.slice(0, 50).forEach((key) => {
        const usageLocations = usageResults.keyUsageMap.get(key) || [];
        report += `- \`${key}\`\n`;
        if (usageLocations.length > 0) {
          report += `  - Used in: ${usageLocations.slice(0, 3).join(", ")}${usageLocations.length > 3 ? ` (+${usageLocations.length - 3} more)` : ""}\n`;
        }
      });
      if (usageResults.missingFromPt.length > 50) {
        report += `\n... and ${usageResults.missingFromPt.length - 50} more\n`;
      }
      report += "\n";
    }
  }

  // Section 3: Language parity issues
  if (
    comparisonResults.missingKeys.en.length > 0 ||
    comparisonResults.missingKeys.pt.length > 0
  ) {
    report += `## 🌍 Language Parity Issues\n\n`;
    report += `These translations exist in one language but not the other.\n\n`;

    if (comparisonResults.missingKeys.pt.length > 0) {
      report += `### Missing Portuguese Translations (${comparisonResults.missingKeys.pt.length} keys)\n\n`;
      comparisonResults.missingKeys.pt.forEach((key) => {
        report += `- \`${key}\`\n`;
      });
      report += "\n";
    }

    if (comparisonResults.missingKeys.en.length > 0) {
      report += `### Missing English Translations (${comparisonResults.missingKeys.en.length} keys)\n\n`;
      comparisonResults.missingKeys.en.forEach((key) => {
        report += `- \`${key}\`\n`;
      });
      report += "\n";
    }
  }

  // Section 4: Unused translations (potential cleanup)
  report += `## 🧹 Unused Translations (Potential Cleanup Candidates)\n\n`;
  report += `These translations exist in locale files but aren't found in the source code. They might be safe to remove, but verify they're not used dynamically.\n\n`;

  if (usageResults.unusedInEn.length > 0) {
    report += `### Unused English Translations (${usageResults.unusedInEn.length} keys)\n\n`;
    report += `<details>\n<summary>Click to expand list</summary>\n\n`;
    usageResults.unusedInEn.slice(0, 100).forEach((key) => {
      report += `- \`${key}\`\n`;
    });
    if (usageResults.unusedInEn.length > 100) {
      report += `\n... and ${usageResults.unusedInEn.length - 100} more\n`;
    }
    report += `\n</details>\n\n`;
  }

  if (usageResults.unusedInPt.length > 0) {
    report += `### Unused Portuguese Translations (${usageResults.unusedInPt.length} keys)\n\n`;
    report += `<details>\n<summary>Click to expand list</summary>\n\n`;
    usageResults.unusedInPt.slice(0, 100).forEach((key) => {
      report += `- \`${key}\`\n`;
    });
    if (usageResults.unusedInPt.length > 100) {
      report += `\n... and ${usageResults.unusedInPt.length - 100} more\n`;
    }
    report += `\n</details>\n\n`;
  }

  // Section 5: File-by-file breakdown
  report += `## 📁 File-by-File Breakdown\n\n`;
  comparisonResults.fileComparisons.forEach((comp) => {
    const status =
      comp.missingInEn.length === 0 && comp.missingInPt.length === 0
        ? "✅"
        : "⚠️";
    report += `### ${status} ${comp.filename}\n\n`;
    report += `- EN: ${comp.enKeys} keys\n`;
    report += `- PT: ${comp.ptKeys} keys\n`;

    if (comp.missingInPt.length > 0) {
      report += `- Missing in PT: ${comp.missingInPt.length} keys\n`;
    }
    if (comp.missingInEn.length > 0) {
      report += `- Missing in EN: ${comp.missingInEn.length} keys\n`;
    }
    report += "\n";
  });

  // Recommendations
  report += `## 💡 Recommendations\n\n`;
  report += `1. **Priority High**: Fix missing translations that are used in code\n`;
  report += `2. **Priority Medium**: Add missing translations for language parity\n`;
  report += `3. **Priority Low**: Consider removing unused translations to reduce bundle size\n\n`;

  fs.writeFileSync(reportPath, report);
  return reportPath;
}

/**
 * Print summary to console
 */
function printSummary(comparisonResults, usageResults) {
  console.log("\n" + "=".repeat(60));
  console.log("📋 TRANSLATION AUDIT SUMMARY");
  console.log("=".repeat(60));

  console.log(`\n🌍 Language Parity:`);
  console.log(
    `   • Missing EN files: ${comparisonResults.missingFiles.en.length}`,
  );
  console.log(
    `   • Missing PT files: ${comparisonResults.missingFiles.pt.length}`,
  );
  console.log(
    `   • Missing EN translations: ${comparisonResults.missingKeys.en.length}`,
  );
  console.log(
    `   • Missing PT translations: ${comparisonResults.missingKeys.pt.length}`,
  );

  console.log(`\n🔍 Code Usage:`);
  console.log(`   • Translation keys in code: ${usageResults.usedKeys.size}`);
  console.log(
    `   • Missing from EN locales: ${usageResults.missingFromEn.length}`,
  );
  console.log(
    `   • Missing from PT locales: ${usageResults.missingFromPt.length}`,
  );
  console.log(`   • Unused in EN locales: ${usageResults.unusedInEn.length}`);
  console.log(`   • Unused in PT locales: ${usageResults.unusedInPt.length}`);

  const criticalIssues =
    usageResults.missingFromEn.length + usageResults.missingFromPt.length;

  if (criticalIssues > 0) {
    console.log(
      `\n⚠️  ${criticalIssues} CRITICAL ISSUES: Translations used in code but missing from locales!`,
    );
  }

  const parityIssues =
    comparisonResults.missingKeys.en.length +
    comparisonResults.missingKeys.pt.length;

  if (parityIssues > 0) {
    console.log(`\n⚠️  ${parityIssues} parity issues between EN and PT`);
  }

  if (criticalIssues === 0 && parityIssues === 0) {
    console.log(`\n🎉 No critical issues found!`);
  }
}

/**
 * Main execution
 */
async function main() {
  console.log("🚀 Starting comprehensive translation audit...\n");

  try {
    // Step 1: Compare translations between languages
    const comparisonResults = compareTranslationFiles();

    // Step 2: Check usage in code
    const usageResults = await checkTranslationUsage();

    // Step 3: Generate report
    console.log("\n📝 Generating audit report...\n");
    const reportPath = generateAuditReport(comparisonResults, usageResults);

    // Step 4: Print summary
    printSummary(comparisonResults, usageResults);

    console.log(`\n📄 Detailed report saved to: ${path.basename(reportPath)}`);
    console.log("\n✅ Audit complete!");

    // Exit with error code if there are critical issues
    if (
      usageResults.missingFromEn.length > 0 ||
      usageResults.missingFromPt.length > 0
    ) {
      process.exit(1);
    }
  } catch (error) {
    console.error("\n❌ Error during audit:", error);
    process.exit(1);
  }
}

// Run the script
main();
