import fs from 'fs'

/* --- documentation-reset ------------------------------------------------------------------------------ */

const documentationReset = () => {
  try {
    fs.mkdirSync('../../packages/@registries/docs', { recursive: true }) // create empty folder if it doesn't exist
    fs.rmSync('../../packages/@registries/docs', { recursive: true })
    console.log('-----------------------------------------------------------------')
    console.log(`-i- Successfully Cleared documentation folder`)
  } catch (err) {
    console.log(err)
    console.error(err)
    process.exit(1)
  }
}

/* --- init ------------------------------------------------------------------------------------ */

documentationReset()
