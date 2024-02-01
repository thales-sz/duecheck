import { forwardRef, InputHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

export type InputProps = InputHTMLAttributes<HTMLInputElement>

export const InputContent = forwardRef<HTMLInputElement, InputProps>(
  ({ id, type, className, placeholder, value, ...props }, ref) => {
    return (
      <input
        id={id}
        type={type}
        className={twMerge(
          'flex w-full items-center justify-between rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 outline outline-0 focus:border-default-primary focus:outline-none focus:ring-default-primary',
          className,
        )}
        placeholder={placeholder}
        ref={ref}
        value={value}
        {...props}
      ></input>
    )
  },
)
