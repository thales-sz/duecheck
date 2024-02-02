'use client'

import { api } from '@/api/api'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import Link from 'next/link'
import LoadingSpinner from '@/components/LoadingSpinner'
import { Communication } from '@/types/comunication.type'

function LawsuitDetails({ params }: { params: { id: string } }) {
  const { data, isPending } = useQuery({
    queryKey: ['lawsuit'],
    queryFn: async () => {
      return api.get<Communication>(`/communication/${params.id}`)
    },
    refetchOnWindowFocus: false,
  })

  console.log(data)
  return (
    <div className="grid h-screen w-full lg:grid-cols-[300px_1fr] text-gray-900 lg:bg-gray-400">
      <nav className="hidden lg:flex lg:flex-col lg:justify-between lg:items-stretch lg:gap-4 lg:bg-gray-400 lg:px-4 lg:py-6 border-r-2 border-black">
        <div>
          <Link className="flex items-center gap-2 font-semibold" href="#">
            <IconGlobe className="h-6 w-6" />
            <span>Detalhes do Processo</span>
          </Link>
        </div>
        <div className="space-y-2 text-sm">
          <Link className="flex items-center gap-2 text-gray-900" href="/">
            <IconHome className="h-4 w-4" />
            <span>Pagina Inicial</span>
          </Link>
        </div>
      </nav>
      <div className="flex flex-col w-full bg-gray-100">
        <header className="flex items-center h-16 px-4 lg:px-6 border-b border-black bg-gray-400">
          <Link
            className="flex items-center gap-2 font-semibold lg:hidden"
            href="#"
          >
            <IconGlobe className="h-6 w-6" />
            <span className="">Detalhes do Processo</span>
          </Link>
          <nav className="ml-6 space-x-4 text-sm">
            <Link className="text-gray-500 hover:text-gray-900" href="#">
              Detalhes
            </Link>
            <Link className="text-gray-500 hover:text-gray-900" href="#">
              Comunicações do Processos
            </Link>
            <Link className="text-gray-500 hover:text-gray-900" href="#">
              Documentos
            </Link>
          </nav>
        </header>
        <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-6 bg-gray-100">
          {isPending ? (
            <LoadingSpinner />
          ) : (
            <section className="flex flex-col w-3/4 items-center self-center space-x-5">
              <p>
                Valor da causa:{' '}
                <span>R$ {data?.data?.lawsuit.lawsuitValue}</span>
              </p>
              <p>
                Número do processo:{' '}
                <span>{data?.data?.formatedLawsuitNumber}</span>
              </p>
              <p>
                Tribunal: <span>{data?.data?.court.description}</span>
              </p>
              <p>
                Conteúdo: <span>{data?.data?.content}</span>
              </p>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

export default LawsuitDetails

function IconGlobe(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

function IconHome(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}
