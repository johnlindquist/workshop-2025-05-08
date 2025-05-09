#!/usr/bin/env bun
import path from "node:path";
import fs from "fs-extra";

const webAppDir = path.resolve(__dirname, "../apps/web");
const testFilePath = path.join(webAppDir, "app/test-page.tsx");

async function simpleTest() {
  console.log("Attempting to run simple test script...");
  try {
    await fs.ensureDir(path.join(webAppDir, "app"));
    console.log("Ensured apps/web/app directory exists.");
    await fs.writeFile(testFilePath, "// Test content");
    console.log(`Successfully wrote to ${testFilePath}`);
  } catch (error) {
    console.error("Simple test script failed:", error);
    process.exit(1);
  }
}

simpleTest();
