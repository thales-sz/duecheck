import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export type InputIconProps = ComponentProps<'div'>

export const InputIcon = ({ className, children }: InputIconProps) => {
  return (
    <div
      className={twMerge(
        'text-blue-gray-500 absolute right-3 top-2/4 grid h-5 w-5 -translate-y-2/4 place-items-center',
        className,
      )}
    >
      {children}
    </div>
  )
}
