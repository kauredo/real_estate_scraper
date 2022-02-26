const path = require("path");
const ImportGlobPlugin = require("esbuild-plugin-import-glob").default;
const rails = require("esbuild-rails");
const esbuild = require("esbuild");

esbuild
  .build({
    entryPoints: ["application.js"],
    bundle: true,
    outdir: path.join(process.cwd(), "app/assets/builds"),
    absWorkingDir: path.join(process.cwd(), "app/javascript"),
    watch: process.argv.includes("--watch"),
    minify: false,
    plugins: [rails(), ImportGlobPlugin()],
  })
  .catch(() => process.exit(1));
