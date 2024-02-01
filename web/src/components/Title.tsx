import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export type TitleProps = ComponentProps<'h1'>

export const Title = ({ children, className, ...props }: TitleProps) => {
  return (
    <h1
      className={twMerge('text-3xl font-bold text-black', className)}
      {...props}
    >
      {children}
    </h1>
  )
}
