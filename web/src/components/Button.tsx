import { ComponentProps, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export type ButtonProps = ComponentProps<'button'> & {
  iconLeft?: ReactNode
  iconrRigth?: ReactNode
}

export const Button = ({
  iconLeft,
  iconrRigth,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={twMerge(
        'flex h-10 w-full items-center justify-center rounded-md bg-blue-400 p-4 text-black transition duration-150 hover:scale-105',
        className,
      )}
      {...props}
    >
      {iconLeft}
      {props.children}
      {iconrRigth}
    </button>
  )
}
