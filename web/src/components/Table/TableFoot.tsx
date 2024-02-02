import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export type TableFootProps = ComponentProps<'tfoot'>

export const TableFoot = ({
  className,
  children,
  ...props
}: TableFootProps) => {
  return (
    <tfoot
      className={twMerge('font-semibold text-gray-900', className)}
      {...props}
    >
      {children}
    </tfoot>
  )
}
