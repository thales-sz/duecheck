'use client'

import { api } from '@/api/api'
import LoadingSpinner from '@/components/LoadingSpinner'
import { Communication } from '../types/comunication.type'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import TableHeadComm from '@/components/TableHeadComm'
import { Table } from '@/components/Table'
import { useState } from 'react'
import { Precatory } from '@/types/precatory.type'

type Inputs = {
  term: string
  documentType: string
  initialDate: string
  finalDate: string
  caseValueMin: string
  caseValueMax: string
  court: string
  journal: string
}

export default function Home() {
  const { register, handleSubmit, watch } = useForm<Inputs>()
  const { push } = useRouter()

  const { mutate, data, isPending } = useMutation({
    mutationFn: async (data: Inputs) => {
      return api.get<{ currentPage: number; items: Communication[] }>(
        `/communication?term=${data.term}&initialDate=${data.initialDate}&finalDate=${data.finalDate}&minValue=${data.caseValueMin}&maxValue=${data.caseValueMax}&court=${data.court}&itemsPerPage=300&currentPage=1&journal=${data.journal}`,
      )
    },
  })

  const precatoryReq = useMutation({
    mutationFn: async (data: Inputs) => {
      return api.get<{ currentPage: number; items: Precatory[] }>(
        '/precatory?itemsPerPage=300&currentPage=1',
      )
    },
  })

  const query = useQuery({
    queryKey: ['court'],
    queryFn: async () => {
      return api.get('court')
    },
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (data.court === 'TJSP') {
      return mutate(data)
    } else {
      return precatoryReq.mutate(data)
    }
  }

  return (
    <main className="flex-col min-h-screen w-full items-center bg-white text-black">
      <header className="w-full top bg-blue-300 p-4 rounded-b-lg shadow-xl">
        <form
          className="flex gap-4 items-center justify-evenly w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <div className="mb-2 block">
              Termo de pesquisa:
              <label htmlFor="term" />
            </div>
            <div className="relative max-w-sm">
              <input
                id="term"
                type="text"
                placeholder="Ex.: Precatório"
                {...register('term', { required: true })}
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
              {...register('court', {
                required: true,
              })}
              defaultValue="Tribunal"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option hidden value="Tribunal">
                Tribunal
              </option>
              <option value="TJSP">
                TJSP - Tribunal de Justiça de São Paulo
              </option>
              <option value="TJSP-pre">Lista de Precatórios - TJSP</option>
            </select>
          </div>
          <div className="text-center w-[300px]">
            <div>
              Valor da causa:
              <label htmlFor="caseValue" />
            </div>
            <div className="flex justify-around items-center">
              Min:
              <input
                type="number"
                id="caseValueMin"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5"
                placeholder="R$ 10,00"
                {...register('caseValueMin')}
              />
              Max:
              <input
                type="number"
                id="caseValueMax"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5"
                placeholder="R$ 5000,00"
                {...register('caseValueMax')}
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-white p-2.5 rounded-md hover:scale-105"
          >
            Pesquisar
          </button>
        </form>
      </header>
      <section className="p-4">
        <div className="relative overflow-x-hidden rounded-lg shadow-lg">
          {watch('court') === 'TJSP-pre' ? (
            <Table.Root>
              <Table.Head>
                <Table.HeadRow>
                  <Table.ContentHead>Nº DEPRE</Table.ContentHead>
                  <Table.ContentHead>Natureza</Table.ContentHead>
                  <Table.ContentHead>Advogado</Table.ContentHead>
                  <Table.ContentHead>Nº. Auto</Table.ContentHead>
                  <Table.ContentHead>Ordem de orçamento</Table.ContentHead>
                  <Table.ContentHead>Ordem de pagamento</Table.ContentHead>
                  <Table.ContentHead>Data do protocolo</Table.ContentHead>
                </Table.HeadRow>
              </Table.Head>
              <Table.Body>
                {precatoryReq.data?.data.items.map((precatory) => {
                  return (
                    <Table.Row key={precatory.id}>
                      <Table.Content>{precatory.DEPRE}</Table.Content>
                      <Table.Content>{precatory.nature}</Table.Content>
                      <Table.Content>{precatory.lawyer}</Table.Content>
                      <Table.Content>{precatory.autoNumber}</Table.Content>
                      <Table.Content>{precatory.budgetOrder}</Table.Content>
                      <Table.Content>{precatory.paymentOrder}</Table.Content>
                      <Table.Content>
                        {new Date(precatory.protocolDate).toLocaleString(
                          'pt-BR',
                          {
                            timeZone: 'America/Sao_Paulo',
                          },
                        )}
                      </Table.Content>
                    </Table.Row>
                  )
                })}
                {precatoryReq.isPending && (
                  <Table.Row className="p-2">
                    <Table.Content></Table.Content>
                    <Table.Content>
                      <div className=" bg-slate-400 animate-pulse rounded-lg w-1/2 h-3"></div>
                    </Table.Content>
                    <Table.Content>
                      <div className=" bg-slate-400 animate-pulse rounded-lg w-1/2 h-3"></div>
                    </Table.Content>
                    <Table.Content>
                      <div className=" bg-slate-400 animate-pulse rounded-lg w-1/2 h-3"></div>
                    </Table.Content>
                    <Table.Content>
                      <div className=" bg-slate-400 animate-pulse rounded-lg w-1/2 h-3"></div>
                    </Table.Content>
                    <Table.Content>
                      <div className=" bg-slate-400 animate-pulse rounded-lg w-1/2 h-3"></div>
                    </Table.Content>
                    <Table.Content>
                      <div className=" bg-slate-400 animate-pulse rounded-lg w-1/2 h-3"></div>
                    </Table.Content>
                  </Table.Row>
                )}
              </Table.Body>
            </Table.Root>
          ) : (
            <Table.Root>
              <Table.Head className="bg-white">
                <Table.HeadRow>
                  <Table.ContentHead>Nº Processo</Table.ContentHead>
                  <Table.ContentHead>Tribunal</Table.ContentHead>
                  <Table.ContentHead>Link de acesso</Table.ContentHead>
                  <Table.ContentHead>Conteúdo</Table.ContentHead>
                  <Table.ContentHead>Tipo do documento</Table.ContentHead>
                  <Table.ContentHead>Data de inclusão</Table.ContentHead>
                  <Table.ContentHead>Valor da causa</Table.ContentHead>
                </Table.HeadRow>
              </Table.Head>
              <Table.Body>
                {data?.data.items.map((communication) => {
                  return (
                    <Table.Row key={communication.id}>
                      <Table.Content>
                        <button
                          className="underline text-blue-600 hover:text-blue-400"
                          onClick={() =>
                            push(`/lawsuit/${communication.lawsuitNumber}`)
                          }
                        >
                          {communication.formatedLawsuitNumber}
                        </button>
                      </Table.Content>
                      <Table.Content>
                        {communication.court.acronym}
                      </Table.Content>
                      <Table.Content>
                        <a
                          href={communication.link}
                          target="_blank"
                          className="text-blue-700 underline hover:text-blue-400"
                        >
                          link
                        </a>
                      </Table.Content>
                      <Table.Content>{communication.resume}</Table.Content>
                      <Table.Content>
                        {communication.documentType}
                      </Table.Content>
                      <Table.Content>
                        {communication.divulgationDate}
                      </Table.Content>
                      <Table.Content>
                        {communication.lawsuit.lawsuitValue
                          ? `R$ ${communication.lawsuit.lawsuitValue}`
                          : '-'}
                      </Table.Content>
                    </Table.Row>
                  )
                })}
                {isPending && (
                  <Table.Row className="p-2">
                    <Table.Content></Table.Content>
                    <Table.Content>
                      <div className=" bg-slate-400 animate-pulse rounded-lg w-1/2 h-3"></div>
                    </Table.Content>
                    <Table.Content>
                      <div className=" bg-slate-400 animate-pulse rounded-lg w-1/2 h-3"></div>
                    </Table.Content>
                    <Table.Content>
                      <div className=" bg-slate-400 animate-pulse rounded-lg w-1/2 h-3"></div>
                    </Table.Content>
                    <Table.Content>
                      <div className=" bg-slate-400 animate-pulse rounded-lg w-1/2 h-3"></div>
                    </Table.Content>
                    <Table.Content>
                      <div className=" bg-slate-400 animate-pulse rounded-lg w-1/2 h-3"></div>
                    </Table.Content>
                    <Table.Content>
                      <div className=" bg-slate-400 animate-pulse rounded-lg w-1/2 h-3"></div>
                    </Table.Content>
                  </Table.Row>
                )}
              </Table.Body>
            </Table.Root>
          )}
        </div>
      </section>
    </main>
  )
}
