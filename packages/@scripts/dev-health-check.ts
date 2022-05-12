import axios from 'axios'

const ENDPOINT = process.env.ENDPOINT || 'http://localhost:3000/api/health'
const TIME_INCREMENT = +(process.env.TIME_INCREMENT || 1000)
const MAX_TRIES = +(process.env.MAX_TRIES || 10)

let timesTried = 0

/* --- checkHealth ----------------------------------------------------------------------------- */

const checkHealth = async () => {
  // Increment times we tried to contact the api
  timesTried += 1
  // Exit with error when max amount of tries exceeded
  if (timesTried > MAX_TRIES) {
    console.error(`Exceeded ${MAX_TRIES} health checks, something may be wrong, aborting.`)
    process.exit(1)
  }
  // Attempt to reach the API
  try {
    const res = await axios.post(ENDPOINT, { test: 'Hello World' })
    if (res.data.alive && res.data.kicking) {
      console.log(`Health check #${timesTried} succeeded. Abort script with success message.`)
      process.exit(0)
    }
  } catch (err) {
    const retryMs = timesTried * TIME_INCREMENT
    console.log(`Failed health check #${timesTried}, retrying in ${retryMs} ms.`)
    setTimeout(checkHealth, retryMs)
  }
}

/* --- init ------------------------------------------------------------------------------------ */

setTimeout(checkHealth, TIME_INCREMENT)
