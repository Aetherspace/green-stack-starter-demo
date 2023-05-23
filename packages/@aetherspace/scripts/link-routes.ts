import glob from 'glob'
import fs from 'fs'

/* --- link-routes ----------------------------------------------------------------------------- */

const linkRoutes = () => {
  try {
    // General filter helpers
    const excludeDirs = (pth) => pth.split('/').pop().includes('.')
    const excludeModules = (pth) => !pth.includes('node_modules')

    // Get all route paths in the features & package folders
    const packageRoutePaths = glob.sync('../../packages/**/routes/**/*.{ts,tsx}').filter(excludeDirs) // prettier-ignore
    const featureRoutePaths = glob.sync('../../features/**/routes/**/*.{ts,tsx}').filter(excludeDirs) // prettier-ignore
    const allRoutePaths = [...packageRoutePaths, ...featureRoutePaths]

    // Determine each route type
    const layoutRoutes = allRoutePaths.filter((pth) => pth.includes('layout.ts')) // e.g. "/**/layout.tsx"
    const templateRoutes = allRoutePaths.filter((pth) => pth.includes('template.ts')) // e.g. "/**/template.tsx"
    const errorRoutes = allRoutePaths.filter((pth) => pth.includes('error.ts')) // e.g. "/**/error.tsx"
    const loadingRoutes = allRoutePaths.filter((pth) => pth.includes('loading.ts')) // e.g. "/**/loading.tsx"
    const notFoundRoutes = allRoutePaths.filter((pth) => pth.includes('not-found.ts')) // e.g. "/**/not-found.tsx"
    const apiRoutes = allRoutePaths.filter((pth) => pth.includes('route.ts')) // e.g. "/**/route.tsx"
    const indexRoutes = allRoutePaths.filter((pth) => pth.includes('index.ts')) // e.g. "/**/index.tsx"
    const headRoutes = allRoutePaths.filter((pth) => pth.includes('head.ts')) // e.g. "/**/head.tsx"
    const paramRoutes = allRoutePaths.filter((pth) => pth.includes('].ts')) // e.g. "/**/[slug].tsx"

    // Figure out import paths from each workspace
    const packageConfigPaths = glob.sync('../../packages/**/package.json').filter(excludeModules)
    const featureConfigPaths = glob.sync('../../features/**/package.json').filter(excludeModules)
    const packageJSONPaths = [...packageConfigPaths, ...featureConfigPaths]
    const workspaceImports = packageJSONPaths.reduce((acc, pth) => {
      const packageJSON = JSON.parse(fs.readFileSync(pth, 'utf8'))
      const workspaceMatcher = pth.replace('../../', '').replace('/package.json', '')
      return { ...acc, [workspaceMatcher]: packageJSON.name }
    }, {}) as Record<string, string>

    // Parse & match each route path to a workspace import
    const parsePath = (pth, autoDefault = true) => {
      // Figure out the workspace import
      const [packageParts, routeParts] = pth.split('/routes') as [string, string]
      const workspaceMatcher = packageParts.replace('../../', '')
      const workspaceImport = workspaceImports[workspaceMatcher]
      // Figure out relevant routing exports
      const nextExports = autoDefault ? ['default'] : ([] as string[])
      const expoExports = autoDefault ? ['default'] : ([] as string[])
      if ([...indexRoutes, ...paramRoutes, ...apiRoutes].includes(pth)) {
        const routeFile = fs.readFileSync(pth, 'utf8')
        // Always check if there's a default export when autoDefault is false
        if (!autoDefault && routeFile.includes('default')) nextExports.push('next')
        // Next.js Route Segment Config Exports
        if (routeFile.includes('dynamic')) nextExports.push('dynamic')
        if (routeFile.includes('dynamicParams')) nextExports.push('dynamicParams')
        if (routeFile.includes('revalidate')) nextExports.push('revalidate')
        if (routeFile.includes('fetchCache')) nextExports.push('fetchCache')
        if (routeFile.includes('runtime')) nextExports.push('runtime')
        if (routeFile.includes('preferredRegion')) nextExports.push('preferredRegion')
        if (routeFile.includes('generateStaticParams')) nextExports.push('generateStaticParams')
        // Next.js API Route Method Exports
        if (routeFile.includes('GET')) nextExports.push('GET')
        if (routeFile.includes('POST')) nextExports.push('POST')
        if (routeFile.includes('PUT')) nextExports.push('PUT')
        if (routeFile.includes('PATCH')) nextExports.push('PATCH')
        if (routeFile.includes('DELETE')) nextExports.push('DELETE')
        if (routeFile.includes('HEAD')) nextExports.push('HEAD')
        if (routeFile.includes('OPTIONS')) nextExports.push('OPTIONS')
      }
      // Return everything
      return { workspaceImport, routeParts, nextExports, expoExports }
    }
    // Clear previous generated route files
    fs.mkdirSync('../../apps/expo/app/(generated)', { recursive: true }) // create empty folder if it doesn't exist
    fs.rmSync('../../apps/expo/app/(generated)', { recursive: true })
    fs.mkdirSync('../../apps/next/app/(generated)', { recursive: true }) // create empty folder if it doesn't exist
    fs.rmSync('../../apps/next/app/(generated)', { recursive: true })
    console.log('-----------------------------------------------------------------')
    console.log("-i- Auto linking routes with 'yarn link-routes' ...")
    console.log('-----------------------------------------------------------------')

    // Reexport fs based index routing in next & expo app dirs
    indexRoutes.forEach((pth) => {
      const { workspaceImport, routeParts, nextExports, expoExports } = parsePath(pth)
      const routeSegments = routeParts.split('index.ts')[0]
      const importPath = `${workspaceImport}/routes${routeSegments}index`
      const expoExportLine = `export { ${expoExports.join(', ')} } from '${importPath}'\n`
      const nextExportLine = `'use client'\nexport { ${nextExports.join(', ')} } from '${importPath}'\n` // prettier-ignore
      console.log(` ✅ ${routeSegments}   -- Generated from "${pth}"`)
      fs.mkdirSync(`../../apps/expo/app/(generated)${routeSegments}`, { recursive: true })
      fs.writeFileSync(`../../apps/expo/app/(generated)${routeSegments}index.tsx`, expoExportLine, {}) // prettier-ignore
      console.log(`      └── /apps/expo/app/(generated)${routeSegments}index.tsx`)
      fs.mkdirSync(`../../apps/next/app/(generated)${routeSegments}`, { recursive: true })
      fs.writeFileSync(`../../apps/next/app/(generated)${routeSegments}page.tsx`, nextExportLine)
      console.log(`      └── /apps/next/app/(generated)${routeSegments}page.tsx`)
    })
    // Reexport fs based slug routing in next & expo app dirs
    paramRoutes.forEach((pth) => {
      const { workspaceImport, routeParts, nextExports, expoExports } = parsePath(pth)
      const fileName = routeParts.split('/').pop() as string // e.g. "[slug].tsx"
      const routeParam = fileName.split('.ts')[0] // e.g. "[slug]"
      const routeSegments = routeParts.split(fileName)[0]
      const importPath = `${workspaceImport}/routes${routeSegments}${routeParam}`
      const expoExportLine = `export { ${expoExports.join(', ')} } from '${importPath}'\n`
      const nextExportLine = `'use client'\nexport { ${nextExports.join(', ')} } from '${importPath}'\n` // prettier-ignore
      console.log(` ✅ ${routeSegments}${routeParam}/   -- Generated from "${pth}"`)
      fs.mkdirSync(`../../apps/expo/app/(generated)${routeSegments}${routeParam}`, { recursive: true }) // prettier-ignore
      fs.writeFileSync(`../../apps/expo/app/(generated)${routeSegments}${routeParam}/index.tsx`, expoExportLine) // prettier-ignore
      console.log(`      └── /apps/expo/app/(generated)${routeSegments}${routeParam}/index.tsx`)
      fs.mkdirSync(`../../apps/next/app/(generated)${routeSegments}${routeParam}`, { recursive: true }) // prettier-ignore
      fs.writeFileSync(`../../apps/next/app/(generated)${routeSegments}${routeParam}/page.tsx`, nextExportLine) //  prettier-ignore
      console.log(`      └── /apps/next/app/(generated)${routeSegments}${routeParam}/page.tsx`)
    })

    if (layoutRoutes.length || templateRoutes.length || headRoutes.length) console.log('--- \n')

    // Reexport fs based layout routing in next & expo app dirs
    layoutRoutes.forEach((pth) => {
      const { workspaceImport, routeParts } = parsePath(pth)
      const routeSegments = routeParts.split('layout.ts')[0]
      const isRootLayout = routeSegments === '/'
      if (!isRootLayout) {
        const importPath = `${workspaceImport}/routes${routeSegments}layout`
        const exportLine = `'use client'\nexport { default } from '${importPath}'\n`
        console.log(` ✅ ${routeSegments}   -- Layout from "${pth}"`)
        fs.mkdirSync(`../../apps/expo/app/(generated)${routeSegments}`, { recursive: true })
        fs.writeFileSync(`../../apps/expo/app/(generated)${routeSegments}_layout.tsx`, exportLine)
        console.log(`      └── /apps/expo/app/(generated)${routeSegments}_layout.tsx`)
        fs.mkdirSync(`../../apps/next/app/(generated)${routeSegments}`, { recursive: true })
        fs.writeFileSync(`../../apps/next/app/(generated)${routeSegments}layout.tsx`, exportLine)
        console.log(`      └── /apps/next/app/(generated)${routeSegments}layout.tsx`)
      }
    })
    // Reexport fs based template routing in next & expo app dirs
    templateRoutes.forEach((pth) => {
      const { workspaceImport, routeParts } = parsePath(pth)
      const routeSegments = routeParts.split('template.ts')[0]
      const isRootLayout = routeSegments === '/'
      if (!isRootLayout) {
        const importPath = `${workspaceImport}/routes${routeSegments}template`
        const exportLine = `'use client'\nexport { default } from '${importPath}'\n`
        console.log(` ✅ ${routeSegments}   -- Template from "${pth}"`)
        fs.mkdirSync(`../../apps/expo/app/(generated)${routeSegments}`, { recursive: true })
        fs.writeFileSync(`../../apps/expo/app/(generated)${routeSegments}_layout.tsx`, exportLine)
        console.log(`      └── /apps/expo/app/(generated)${routeSegments}_layout.tsx`)
        fs.mkdirSync(`../../apps/next/app/(generated)${routeSegments}`, { recursive: true })
        fs.writeFileSync(`../../apps/next/app/(generated)${routeSegments}template.tsx`, exportLine)
        console.log(`      └── /apps/next/app/(generated)${routeSegments}template.tsx`)
      }
    })
    // Reexport fs based head config in next app dir
    headRoutes.forEach((pth) => {
      const { workspaceImport, routeParts } = parsePath(pth)
      const routeSegments = routeParts.split('head.ts')[0]
      const importPath = `${workspaceImport}/routes${routeSegments}head`
      const exportLine = `export { default } from '${importPath}'\n`
      console.log(` ✅ ${routeSegments}   -- Head from "${pth}"`)
      fs.mkdirSync(`../../apps/next/app/(generated)${routeSegments}`, { recursive: true })
      fs.writeFileSync(`../../apps/next/app/(generated)${routeSegments}head.tsx`, exportLine)
      console.log(`      └── /apps/next/app/(generated)${routeSegments}head.tsx`)
    })

    if (apiRoutes.length) console.log('--- \n')

    // Reexport fs based api handler routes in next app dir
    apiRoutes.forEach((pth) => {
      const { workspaceImport, routeParts, nextExports } = parsePath(pth, false)
      const routeSegments = routeParts.split('route.ts')[0]
      const importPath = `${workspaceImport}/routes${routeSegments}route`
      const nextExportLine = `export { ${nextExports.join(', ')} } from '${importPath}'\n` // prettier-ignore
      console.log(` ✅ ${routeSegments}   -- API Route from "${pth}"`)
      fs.mkdirSync(`../../apps/next/app/(generated)${routeSegments}`, { recursive: true })
      fs.writeFileSync(`../../apps/next/app/(generated)${routeSegments}route.ts`, nextExportLine)
      console.log(`      └── /apps/next/app/(generated)${routeSegments}route.ts`)
    })
  } catch (err) {
    console.log(err)
    console.error(err)
    process.exit(1)
  }
}

/* --- init ------------------------------------------------------------------------------------ */

linkRoutes()
