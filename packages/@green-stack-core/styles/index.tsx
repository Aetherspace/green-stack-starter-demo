import { cn } from '../utils/styleUtils'
import { forwardRef } from 'react'

/* --- Reexports ------------------------------------------------------------------------------- */

export * from '../utils/styleUtils'

/* --- Utility --------------------------------------------------------------------------------- */

export const styled = <
    COMP extends React.ComponentType<any>,
    REF extends React.ElementRef<COMP>,
    PROPS extends React.ComponentProps<COMP>,
>(Component: COMP, className = '', defaultProps?: Partial<PROPS>) => {
    const displayName = [Component.displayName, Component.name].filter(Boolean).join('.')
    const StyledComponent = forwardRef<REF, PROPS & { className?: string }>(
        (props: React.ComponentProps<COMP>, ref) => {
            const finalClassName = cn(className, props.className)
            return (
                // @ts-ignore
                <Component
                    ref={ref}
                    {...defaultProps}
                    {...props}
                    className={finalClassName}
                />
            )
        }
    )
    StyledComponent.displayName = displayName
    return StyledComponent
}
