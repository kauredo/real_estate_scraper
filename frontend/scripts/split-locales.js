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
 * Ensure directory exists, create if it doesn't
 */
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
}

/**
 * Split a locale file into separate files for each top-level key
 */
function splitLocaleFile(language) {
  const localeFilePath = path.join(LOCALES_DIR, `${language}.json`);

  if (!fs.existsSync(localeFilePath)) {
    console.log(`⚠️  Locale file not found: ${localeFilePath}`);
    return;
  }

  console.log(`\n📂 Processing ${language}.json...`);

  // Read the original locale file
  const localeContent = fs.readFileSync(localeFilePath, "utf8");
  let localeData;

  try {
    localeData = JSON.parse(localeContent);
  } catch (error) {
    console.error(`❌ Error parsing ${language}.json:`, error.message);
    return;
  }

  // Create language-specific directory
  const languageDir = path.join(LOCALES_DIR, language);
  ensureDirectoryExists(languageDir);

  // Track created files for index generation
  const createdFiles = [];

  // Split each top-level key into its own file
  Object.keys(localeData).forEach(key => {
    const keyData = localeData[key];
    const keyFilePath = path.join(languageDir, `${key}.json`);

    // Write the key's data to its own file
    fs.writeFileSync(keyFilePath, JSON.stringify(keyData, null, 2));
    console.log(`  ✅ Created: ${language}/${key}.json`);

    createdFiles.push(key);
  });

  // Create an index file that re-exports all the split files
  createIndexFile(language, createdFiles);

  // Create a backup of the original file
  const backupPath = path.join(LOCALES_DIR, `${language}.json.backup`);
  fs.copyFileSync(localeFilePath, backupPath);
  console.log(`  💾 Backup created: ${language}.json.backup`);

  console.log(
    `✨ Completed splitting ${language}.json into ${createdFiles.length} files`
  );
}

/**
 * Create an index file that imports and re-exports all split locale files
 */
function createIndexFile(language, keys) {
  const languageDir = path.join(LOCALES_DIR, language);
  const indexPath = path.join(languageDir, "index.js");

  let indexContent = "// Auto-generated index file for split locale files\n\n";

  // Import statements
  keys.forEach(key => {
    indexContent += `import ${key} from './${key}.json';\n`;
  });

  indexContent += "\n// Re-export all locale data\n";
  indexContent += "export default {\n";

  keys.forEach(key => {
    indexContent += `  ${key},\n`;
  });

  indexContent += "};\n";

  fs.writeFileSync(indexPath, indexContent);
  console.log(`  📋 Created index file: ${language}/index.js`);
}

/**
 * Create a migration guide
 */
function createMigrationGuide() {
  const guidePath = path.join(LOCALES_DIR, "MIGRATION_GUIDE.md");

  const guideContent = `# Locale Files Migration Guide

## What Changed

The large locale files (\`en.json\`, \`pt.json\`) have been split into smaller, more manageable files organized by feature/section.

## New Structure

\`\`\`
src/locales/
├── en/
│   ├── index.js          # Re-exports all English translations
│   ├── about.json        # About page translations
│   ├── blog_posts.json   # Blog-related translations
│   ├── club.json         # Club-related translations
│   ├── contacts.json     # Contact page translations
│   └── ...
├── pt/
│   ├── index.js          # Re-exports all Portuguese translations
│   ├── about.json        # About page translations
│   ├── blog_posts.json   # Blog-related translations
│   └── ...
├── en.json.backup        # Backup of original English file
└── pt.json.backup        # Backup of original Portuguese file
\`\`\`

## How to Use

### Option 1: Update your i18n configuration to use the new structure

\`\`\`javascript
// Instead of importing the large files:
// import en from './locales/en.json'
// import pt from './locales/pt.json'

// Import from the new index files:
import en from './locales/en/index.js'
import pt from './locales/pt/index.js'
\`\`\`

### Option 2: Import specific sections when needed

\`\`\`javascript
// Import only what you need for better tree shaking
import aboutEn from './locales/en/about.json'
import aboutPt from './locales/pt/about.json'
\`\`\`

## Benefits

1. **Better Organization**: Each feature/section has its own translation file
2. **Easier Maintenance**: Smaller files are easier to manage and review
3. **Better Collaboration**: Multiple developers can work on different sections without conflicts
4. **Lazy Loading**: Possibility to load translations on-demand
5. **Tree Shaking**: Better bundle optimization when importing specific sections

## Rollback

If you need to rollback, the original files are backed up as \`.backup\` files.
`;

  fs.writeFileSync(guidePath, guideContent);
  console.log(`📖 Created migration guide: MIGRATION_GUIDE.md`);
}

/**
 * Main execution
 */
function main() {
  console.log("🚀 Starting locale files splitting process...\n");

  // Split each language file
  LANGUAGES.forEach(splitLocaleFile);

  // Create migration guide
  createMigrationGuide();

  console.log("\n✅ All done! Check the MIGRATION_GUIDE.md for next steps.");
  console.log("\n💡 Tips:");
  console.log("   - Update your i18n configuration to use the new structure");
  console.log("   - Consider using lazy loading for better performance");
  console.log("   - The original files are backed up as .backup files");
}

// Run the script - execute main function
main();

export { splitLocaleFile, createIndexFile };
