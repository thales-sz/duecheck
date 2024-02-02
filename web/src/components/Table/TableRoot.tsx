import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export type TableRootProps = ComponentProps<'table'>

export const TableRoot = ({
  className,
  children,
  ...props
}: TableRootProps) => {
  return (
    <table
      className={twMerge('w-full text-left text-sm text-gray-900', className)}
      {...props}
    >
      {children}
    </table>
  )
}
