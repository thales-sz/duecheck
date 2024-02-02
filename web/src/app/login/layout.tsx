import { Title } from '@/components/Title'

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <main className="flex h-screen items-center justify-center bg-gradient-to-r from-cyan-200 to-blue-500 p-8 md:p-20">
        {children}
      </main>
    </>
  )
}
