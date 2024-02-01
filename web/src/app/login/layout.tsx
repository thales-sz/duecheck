import { Title } from '@/components/Title'

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <main className="flex h-screen items-center justify-center bg-white p-8 md:p-20 lg:justify-between">
        <div className=" hidden flex-col gap-6 lg:flex">
          <Title>Bem vindo de volta!</Title>
        </div>
        {children}
      </main>
    </>
  )
}
