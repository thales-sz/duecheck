import { APP_ROUTE } from '@/constants/app.routes'

export const checkIsPublicRoute = (path: string) => {
  const appPublicRoutes = Object.values(APP_ROUTE.public)

  return appPublicRoutes.includes(path)
}
