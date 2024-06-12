const { tsImport } = require('tsx/esm/api')
tsImport('./esbuild-setup.ts', __filename)

const scriptToRun = process.argv[2]

if (!scriptToRun) {
    console.error('No script provided')
    process.exit(1)
}

tsImport(scriptToRun, __filename)
