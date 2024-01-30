'use client'

import { api } from '@/api/api'
import LoadingSpinner from '@/components/LoadingSpinner'
import { Communication } from '../types/comunication.type'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'

type Inputs = {
  keyword: string
  documentType: string
  initialDate: string
  finalDate: string
  caseValue?: string
  court: string
  journal: string
}

export default function Home() {
  const { register, handleSubmit, watch } = useForm<Inputs>()
  const { push } = useRouter()
  const { mutate, data, isPending } = useMutation({
    mutationFn: async (data: Inputs) => {
      return api.get<{ currentPage: number; items: Communication[] }>(
        `/communication?keyword=${data.keyword}&initialDate=${data.initialDate}&finalDate=${data.finalDate}&value=${data.caseValue}&court=${data.court}&itemsPerPage=50&currentPage=1&journal=${data.journal}`,
      )
    },
  })

  const query = useQuery({
    queryKey: ['court'],
    queryFn: async () => {
      return api.get('court')
    },
  })

  console.log(query.data?.data)

  const onSubmit: SubmitHandler<Inputs> = (data) => mutate(data)

  return (
    <main className="flex-col min-h-screen w-full items-center bg-white text-black">
      <header className="w-full top bg-gray-400 p-4 rounded-b-lg shadow-xl">
        <form
          className="flex gap-4 items-center justify-evenly w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <div className="mb-2 block">
              Palavra-chave:
              <label htmlFor="keyword" />
            </div>
            <div className="relative max-w-sm">
              <input
                id="keyword"
                type="text"
                placeholder="Ex.: Precatório"
                {...register('keyword', { required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
          </div>
          <div>
            <div className="mb-2 block">
              Data inicial:
              <label htmlFor="initialDate" />
            </div>
            <div className="relative max-w-sm">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
              </div>
              <input
                type="date"
                id="initialDate"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full pl-10 p-2.5"
                placeholder="Select date"
                {...register('initialDate', { required: true })}
              />
            </div>
          </div>
          <div>
            <div className="mb-2 block">
              Data final:
              <label htmlFor="finalDate" />
            </div>
            <div className="relative max-w-sm">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
              </div>
              <input
                type="date"
                id="finalDate"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                placeholder="Select date"
                required
                {...register('finalDate', { required: true })}
              />
            </div>
          </div>
          <div>
            <div>
              <label
                htmlFor="court"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Tribunal:
              </label>
            </div>
            <select
              id="court"
              {...register('court', { required: true })}
              defaultValue="Tribunal"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option hidden value="Tribunal">
                Tribunal
              </option>
              {query.data?.data.map((court: any) => {
                return (
                  <option key={court.id} value={court.acronym}>
                    {court.acronym}
                  </option>
                )
              })}
            </select>
          </div>
          {watch('court') === 'TJSP' && (
            <div>
              <div className="mb-2 block">
                Caderno:
                <label htmlFor="journal" />
              </div>
              <select
                id="journal"
                {...register('journal', { required: true })}
                defaultValue="Caderno"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-40"
              >
                <option hidden value="Caderno" className="text-sm">
                  Caderno
                </option>
                <option value="10" className="text-xs">
                  Caderno 1 - Administrativo
                </option>
                <option value="11" className="text-xs">
                  Caderno 2 - Judicial - 2ª Instância - Entrada e Distribuição -
                  Parte I
                </option>
                <option value="12" className="text-xs">
                  Caderno 3 - Judicial - 1ª Instância - Capital - Parte I
                </option>
                <option value="20" className="text-xs">
                  Caderno 3 - Judicial - 1ª Instância - Capital - Parte II
                </option>
                <option value="18" className="text-xs">
                  Caderno 4 - Judicial - 1ª Instância - Interior - Parte I
                </option>
                <option value="13" className="text-xs">
                  Caderno 4 - Judicial - 1ª Instância - Interior - Parte II
                </option>
                <option value="15" className="text-xs">
                  Caderno 4 - Judicial - 1ª Instância - Interior - Parte III
                </option>
                <option value="14" className="text-xs">
                  Caderno 5 - Editais e Leilões
                </option>
                <option value="0" className="text-xs">
                  Todos
                </option>
              </select>
            </div>
          )}
          <div>
            <div className="mb-2 block">
              Valor da causa:
              <label htmlFor="caseValue" />
            </div>
            <div className="relative max-w-sm">
              <input
                type="range"
                id="caseValue"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Ex.: R$ 1000,00"
                {...register('caseValue')}
              />
            </div>
          </div>
          <button type="submit" className="bg-blue-300 p-2.5 rounded-md">
            Pesquisar
          </button>
        </form>
      </header>
      <section className="pt-5 text-center">
        <table className="w-4/5 mx-auto bg-white">
          <thead className="bg-gray-300 rounded-t-md rounded">
            <tr>
              <th className="border">Nº Processo</th>
              <th className="border">Vara</th>
              <th className="border">Comarca</th>
              <th className="border max-w-10">Tribunal</th>
              <th className="border">Link de acesso</th>
              <th className="border">Conteúdo</th>
              <th className="border">Tipo do documento</th>
              <th className="border">Nome da classe</th>
              <th className="border">Palavra-chave</th>
              <th className="border">Data de inclusão</th>
              <th className="border">Valor da causa</th>
            </tr>
          </thead>
          <tbody className="w-4/5 mx-auto overflow-y-auto">
            {isPending && <LoadingSpinner />}
            {data?.data.items.map((communication) => {
              return (
                <tr key={communication.id}>
                  <td className="border h-20">
                    <button
                      onClick={() =>
                        push(`/lawsuit/${communication.lawsuitNumber}`)
                      }
                    >
                      {communication.formatedLawsuitNumber}
                    </button>
                  </td>
                  <td className="border max-h-20 overflow-y-auto">
                    {communication.organName}
                  </td>
                  <td className="border max-h-20 overflow-y-auto">
                    {communication.className}
                  </td>
                  <td className="border max-h-20 overflow-y-auto">
                    {communication.court.acronym}
                  </td>
                  <td className="border max-h-20 max-w-10 overflow-y-auto">
                    <a href={communication.link} target="_blank">
                      link
                    </a>
                  </td>
                  <td className="border max-h-20 overflow-x-auto">
                    {communication.resume}
                  </td>
                  <td className="border max-h-20 overflow-y-auto">
                    {communication.documentType}
                  </td>
                  <td className="border max-h-20 overflow-y-auto">
                    {communication.className}
                  </td>
                  <td className="border max-h-20 overflow-y-auto">
                    {communication.keyword}
                  </td>
                  <td className="border max-h-20 overflow-y-auto">
                    {communication.divulgationDate}
                  </td>
                  <td className="border max-h-20 overflow-y-auto">
                    {communication.lawsuit.lawsuitValue
                      ? `R$ ${communication.lawsuit.lawsuitValue}`
                      : '-'}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>
    </main>
  )
}
