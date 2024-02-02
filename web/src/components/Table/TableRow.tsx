import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export type TableRowProps = ComponentProps<'tr'>

export const TableRow = ({ className, children, ...props }: TableRowProps) => {
  return (
    <tr
      className={twMerge('text-black odd:bg-blue-100 even:bg-white', className)}
      role="row"
      {...props}
    >
      {children}
    </tr>
  )
}
