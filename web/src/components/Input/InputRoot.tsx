import { ComponentProps } from 'react'

export type InputRootProps = ComponentProps<'div'>

export const InputRoot = ({ children, ...props }: InputRootProps) => {
  return <div {...props}>{children}</div>
}
