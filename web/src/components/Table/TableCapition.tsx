import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export type TableCapitionProps = ComponentProps<'caption'>

export const TableCapition = ({
  className,
  children,
  ...props
}: TableCapitionProps) => {
  return (
    <caption
      className={twMerge(
        'bg-white p-2 text-left text-lg font-semibold text-gray-900 rtl:text-right sm:p-3 md:p-5',
        className,
      )}
      {...props}
    >
      {children}
    </caption>
  )
}
