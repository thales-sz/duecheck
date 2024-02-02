import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export type TableHeadProps = ComponentProps<'thead'>

export const TableHead = ({
  className,
  children,
  ...props
}: TableHeadProps) => {
  return (
    <thead
      className={twMerge(
        'border-b border-t bg-white uppercase text-black',
        className,
      )}
      {...props}
    >
      {children}
    </thead>
  )
}
