'use client'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Text } from '@/components/Text'
import { Title } from '@/components/Title'
import { AuthContext } from '@/context/auth-context'
import { Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'

type FormValues = {
  email: string
  password: string
}

export default function Login() {
  const { signIn } = useContext(AuthContext)
  const [showPassword, setShowPassword] = useState(false)

  const { register, handleSubmit } = useForm<FormValues>()

  const onSubmit = async (data: FormValues) => {
    const { email, password } = data
    await signIn({ email, password })
  }

  return (
    <div className="w-full rounded-lg border bg-white p-4 shadow-lg sm:w-1/2 sm:p-6 md:w-2/3 lg:w-1/3">
      <Title className="mb-4">Entrar na sua conta</Title>
      <div className="flex flex-col items-center justify-center space-y-6 ">
        <div className="w-full">
          <div className="mb-6 gap-2">
            <Input.Root className="w-full">
              <Input.Label className="text-xs">Usuário</Input.Label>
              <Input.Body>
                <Input.Content
                  {...register('email')}
                  placeholder="Digite seu e-mail"
                ></Input.Content>
              </Input.Body>
            </Input.Root>
            <Input.Root className="w-full">
              <Input.Label className="text-xs">Senha</Input.Label>
              <Input.Body>
                <Input.Content
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Digite seu senha"
                ></Input.Content>
                <Input.Icon>
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="hover:cursor-pointer"
                  >
                    {showPassword ? (
                      <Eye color="black" />
                    ) : (
                      <EyeOff color="black" />
                    )}
                  </button>
                </Input.Icon>
              </Input.Body>
            </Input.Root>
            <Text className="text-end text-blue-500">
              <Link href={'/forget_password'}>Esqueceu sua senha?</Link>
            </Text>
          </div>
        </div>
        <div className="w-2/3">
          <Button onClick={handleSubmit(onSubmit)}>Entrar</Button>
        </div>
        <div className="w-2/3">
          <hr />
        </div>
        <div>
          <Text>
            Não possui conta?{' '}
            <Link href={'/forget_password'} className="text-blue-500">
              Cadastre-se
            </Link>
          </Text>
        </div>
      </div>
    </div>
  )
}
