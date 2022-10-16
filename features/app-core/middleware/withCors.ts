import Cors from 'cors'

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
export const withCors = Cors({ methods: ['POST', 'GET', 'HEAD'] })
