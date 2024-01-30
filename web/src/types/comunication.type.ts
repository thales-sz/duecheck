export type Communication = {
  id: number
  communicationDate: Date
  divulgationDate: string
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
  receiver: any // destinatarios
  lawyer: any // advogados
  read: boolean
  lawsuit: any
}
