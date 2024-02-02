import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export type TableBodyProps = ComponentProps<'tbody'>

export const TableBody = ({
  className,
  children,
  ...props
}: TableBodyProps) => {
  return (
    <tbody
      role="rowgroup"
      className={twMerge('text-black', className)}
      {...props}
    >
      {children}
    </tbody>
  )
}
