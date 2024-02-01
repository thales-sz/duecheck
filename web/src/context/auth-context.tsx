'use client'

import { createContext, ReactNode, useLayoutEffect, useState } from 'react'
import { parseCookies, setCookie } from 'nookies'
import { fetchApi } from '@/api/fetchApi'
import { usePathname, useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import jwt from 'jsonwebtoken'
import { checkIsPublicRoute } from '@/util/check-is-public-route'
import { APP_ROUTE } from '@/constants/app.routes'

export type User = {
  createdAt: string
  updatedAt: string
  deletedAt: null
  id: string
  firstName: string
  lastName: string
  email: string
  password: string
  role: string
  iat: string
  exp: string
}

type SignInData = {
  email: string
  password: string
}

type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  signIn: (data: SignInData) => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const isAuthenticated = !!user
  const jwtSecret = process.env.NEXT_PUBLIC_JWT_SECRET
  const { push } = useRouter()
  const pathName = usePathname()
  const isPublicPage = checkIsPublicRoute(pathName)

  useLayoutEffect(() => {
    async function recoverUser() {
      const { 'user.token': userToken } = parseCookies()
      if (userToken) {
        const resp = await fetchApi<User>('/auth/token', {
          body: JSON.stringify({ token: userToken }),
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!resp.id) {
          push(APP_ROUTE.public.login)
          return
        }

        setUser(resp)
        return // IMPORTANTE para nao cair no if abaixo
      }

      if (!isPublicPage) {
        push(APP_ROUTE.public.login)
      }
    }
    recoverUser()
  }, [isAuthenticated, isPublicPage, push])

  async function signIn({ email, password }: SignInData) {
    const loadingToast = toast.loading('Entrando...')

    try {
      const body: string = JSON.stringify({ email, password })
      const { token } = await fetchApi<{ token: string }>('/auth/signin', {
        body,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      toast.dismiss(loadingToast)

      if (token) {
        toast.success('Bem vindo!')
        if (jwtSecret) {
          const payload = jwt.verify(token, jwtSecret) as unknown as User
          setUser(payload)
        }

        setCookie(undefined, 'user.token', token, {
          maxAge: 60 * 30 * 1, // half hour
        })

        router.push(APP_ROUTE.private.index)
      } else {
        toast.error('Usuario ou senha invalidos')
      }
    } catch (error) {
      toast.dismiss(loadingToast)
      toast.error('Não foi possivel realizar o login no momento')
    }
  }

  if (!isPublicPage && !isAuthenticated) {
    return null
  }

  return (
    <AuthContext.Provider value={{ user, signIn, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}
