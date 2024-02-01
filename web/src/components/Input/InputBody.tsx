import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export type InputBodyProps = ComponentProps<'div'>

export const InputBody = ({
  className,
  children,
  ...props
}: InputBodyProps) => {
  return (
    <div
      className={twMerge('relative h-10 w-full min-w-[200px]', className)}
      {...props}
    >
      {children}
    </div>
  )
}
