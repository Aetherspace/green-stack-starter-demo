import * as React from 'react'
import { TextInput as BaseTextInput } from '@green-stack/forms/TextInput.base'
import { cn } from '@green-stack/utils/tailwindUtils'

export const TextInput = React.forwardRef<
    React.ElementRef<typeof BaseTextInput>,
    React.ComponentProps<typeof BaseTextInput>
>((props, ref) => {
    return (
        <BaseTextInput
            ref={ref}
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            {...props}
            className={cn(
                "h-10 rounded-md bg-background px-3 text-base text-foreground",
                "lg:text-sm",
                "border-l-[2] border-[#333]",
                "native:h-12 native:text-lg native:leading-[1.25]",
                "web:flex web:w-full web:py-2 web:ring-offset-background",
                "web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2",
                "file:border-0 file:bg-transparent file:font-medium",
                props.className,
            )}
        />
    )
})
