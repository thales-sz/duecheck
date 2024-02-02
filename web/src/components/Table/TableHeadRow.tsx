import { TableRowProps } from './TableRow'

export const TableHeadRow = ({
  className,
  children,
  ...props
}: TableRowProps) => {
  return (
    <tr className={className} {...props} role="row">
      {children}
    </tr>
  )
}
