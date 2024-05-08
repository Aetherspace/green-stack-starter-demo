import React from 'react'
import type { UniversalLinkProps } from './Link.types'
import { CoreContext } from '../context/CoreContext'

/* --- <Link/> --------------------------------------------------------------------------------- */

export const Link = (props: UniversalLinkProps) => {
    // Context
    const { contextLink: ContextLink } = React.useContext(CoreContext)

    // Render
    return <ContextLink {...props} />
}

