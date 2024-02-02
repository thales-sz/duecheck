export type Communication = {
  id: number
  communicationDate: Date
  divulgationDate: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  court: any
  communicationType: string
  keyword: string
  organName: string // nome do orgão
  content: string // texto
  resume: string
  lawsuitNumber: string // numero do processo
  link: string // link
  documentType: string // tipo documento
  className: string // nome classe
  source: string // meio completo
  formatedLawsuitNumber: string // numero processo com mascara
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  receiver: any // destinatarios
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lawyer: any // advogados
  read: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lawsuit: any
}
