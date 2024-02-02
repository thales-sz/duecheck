import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export type TableContentHeadProps = ComponentProps<'th'>

export const TableContentHead = ({
  className,
  children,
  ...props
}: TableContentHeadProps) => {
  return (
    <th
      role="columnheader"
      className={twMerge(
        'px-2 py-1 text-xs font-medium sm:px-4 sm:py-2  sm:text-sm',
        className,
      )}
      {...props}
    >
      {children}
    </th>
  )
}
