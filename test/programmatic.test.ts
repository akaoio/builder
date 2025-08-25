/**
 * Test programmatic usage of the Builder
 */
import { Builder } from "../dist/index.js"
import { existsSync } from "node:fs"
import { rm } from "node:fs/promises"

async function testProgrammaticAPI() {
  console.log("🧪 Testing Programmatic Builder API\n")
  
  const testDir = "tmp/programmatic-test"
  
  // Clean up before test
  if (existsSync(testDir)) {
    await rm(testDir, { recursive: true, force: true })
  }

  try {
    // Test 1: Create builder instance
    console.log("Test 1: Creating Builder instance...")
    const builder = await Builder.create({
      entry: "test/fixtures/simple.ts",
      outDir: testDir,
      formats: ["cjs", "esm"],
      dts: false,
      clean: true,
      silent: true
    })
    console.log("  ✅ Builder created successfully")

    // Test 2: Build the project
    console.log("\nTest 2: Building project...")
    const result = await builder.build()
    
    if (result.success) {
      console.log("  ✅ Build succeeded")
      console.log(`  Duration: ${result.duration}ms`)
      console.log(`  Output files: ${result.outputFiles.length}`)
      
      for (const file of result.outputFiles) {
        console.log(`    - ${file.path} (${file.format}) - ${file.size} bytes`)
      }
    } else {
      console.log("  ❌ Build failed")
      if (result.errors) {
        for (const error of result.errors) {
          console.error(`    ${error.message}`)
        }
      }
      process.exit(1)
    }

    // Test 3: Verify output files exist
    console.log("\nTest 3: Verifying output files...")
    const expectedFiles = [
      `${testDir}/simple.js`,
      `${testDir}/simple.cjs`
    ]
    
    let allFilesExist = true
    for (const file of expectedFiles) {
      if (existsSync(file)) {
        console.log(`  ✅ ${file} exists`)
      } else {
        console.log(`  ❌ ${file} missing`)
        allFilesExist = false
      }
    }

    // Test 4: Get configuration
    console.log("\nTest 4: Getting configuration...")
    const config = builder.getConfig()
    console.log(`  Entry: ${config.entry}`)
    console.log(`  Output: ${config.outDir}`)
    console.log(`  Formats: ${config.formats?.join(", ")}`)
    console.log("  ✅ Configuration retrieved")

    // Summary
    console.log("\n" + "=".repeat(40))
    if (allFilesExist) {
      console.log("✅ All programmatic API tests passed!")
      process.exit(0)
    } else {
      console.log("❌ Some tests failed")
      process.exit(1)
    }

  } catch (error) {
    console.error("\n❌ Test failed with error:")
    console.error(error)
    process.exit(1)
  }
}

// Run the tests
testProgrammaticAPI().catch(error => {
  console.error("Fatal error:", error)
  process.exit(1)
})