import { useContext } from 'react'
import { CoreContext } from '../context/CoreContext'

/* --- useRouter() ----------------------------------------------------------------------------- */

export const useRouter = () => {
    // Context
    const { contextRouter } = useContext(CoreContext)

    // Return
    return contextRouter
}
