import { cn } from '../utils/tailwindUtils'
import { forwardRef } from 'react'

/* --- Reexports ------------------------------------------------------------------------------- */

export { cn }

/* --- Utility --------------------------------------------------------------------------------- */

export const styled = <
    COMP extends React.ComponentType<any>,
    REF extends React.ElementRef<COMP>,
    PROPS extends React.ComponentProps<COMP>,
>(Component: COMP, className = '') => { 
    return forwardRef<REF, PROPS & { className?: string }>(
        (props: React.ComponentProps<COMP>, ref) => (
            // @ts-ignore
            <Component
                ref={ref}
                {...props}
                className={cn(className, props.className)}
            />
        )
    )
}
