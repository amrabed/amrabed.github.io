const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const summaryPath = path.join(rootDir, "coverage", "coverage-summary.json");
const readmePath = path.join(rootDir, "README.md");

try {
  if (!fs.existsSync(summaryPath)) {
    console.error("Coverage summary file not found. Run tests with coverage first.");
    process.exit(1);
  }

  const summary = JSON.parse(fs.readFileSync(summaryPath, "utf8"));
  const pct = summary.total.statements.pct;

  if (typeof pct !== "number") {
    console.error("Could not find coverage percentage in summary.");
    process.exit(1);
  }

  let color = "red";
  if (pct >= 95) color = "brightgreen";
  else if (pct >= 80) color = "green";
  else if (pct >= 60) color = "yellow";

  const badgeUrl = `https://img.shields.io/badge/Coverage-${pct}%25-${color}`;
  const badgeMarkdown = `[![Coverage](${badgeUrl})](#)`;

  let readme = fs.readFileSync(readmePath, "utf8");

  // Regex to match existing coverage badge or place it after the website badge
  const coverageRegex = /\[\!\[Coverage\]\(https:\/\/img\.shields\.io\/badge\/Coverage-[0-9.]+%25-[a-z]+\)\]\(\#\)/;

  if (coverageRegex.test(readme)) {
    readme = readme.replace(coverageRegex, badgeMarkdown);
  } else {
    // Insert after the website badge
    const websiteRegex = /(\[\!\[Website\]\([^)]+\)\]\([^)]+\))/;
    if (websiteRegex.test(readme)) {
      readme = readme.replace(websiteRegex, `$1\n${badgeMarkdown}`);
    } else {
      // Just prepend to the beginning or add after first line
      const lines = readme.split("\n");
      lines.splice(2, 0, badgeMarkdown);
      readme = lines.join("\n");
    }
  }

  fs.writeFileSync(readmePath, readme, "utf8");
  console.log(`Successfully updated coverage badge to ${pct}% (${color}) in README.md`);
} catch (error) {
  console.error("Error updating coverage badge:", error);
  process.exit(1);
}
