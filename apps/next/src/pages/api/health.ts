import { NextApiRequest, NextApiResponse } from 'next'

/* --- /api/health ----------------------------------------------------------------------------- */

const healthCheck = (req: NextApiRequest, res: NextApiResponse) => {
  return res.status(200).json({
    alive: true,
    kicking: true,
    args: { ...req.body, ...req.query },
  })
}

/* --- Exports --------------------------------------------------------------------------------- */

export default healthCheck
