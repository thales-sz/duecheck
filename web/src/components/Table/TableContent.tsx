import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export type TableContentProps = ComponentProps<'td'>

export const TableContent = ({
  className,
  children,
  ...props
}: TableContentProps) => {
  return (
    <td
      className={twMerge(
        'px-2 py-1 text-xs font-light sm:px-4 sm:py-2  sm:text-sm',
        className,
      )}
      {...props}
      role="cell"
    >
      {children}
    </td>
  )
}
