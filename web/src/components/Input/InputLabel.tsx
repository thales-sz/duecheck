import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export type InputLabelProps = ComponentProps<'label'>

export const InputLabel = ({
  htmlFor,
  className,
  children,
}: InputLabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={twMerge('text-sm text-black', className)}
    >
      {children}
    </label>
  )
}
