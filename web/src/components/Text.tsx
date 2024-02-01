import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export type TextProps = ComponentProps<'p'>

export const Text = ({ children, className, ...props }: TextProps) => {
  return (
    <p
      className={twMerge(
        'text-xs font-normal text-black lg:text-sm',
        className,
      )}
      {...props}
    >
      {children}
    </p>
  )
}
