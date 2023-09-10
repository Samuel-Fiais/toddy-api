export class CompanyInfoPresenter {
  tradeName: string
  companyName: string
  cnpj: string
  status: string
  sector: string
  primaryCnaeDescription: string
  primaryCnaeCode: string
  cep: string
  openingDate: string
  ddd: string
  phoneNumber: string
  email: string
  addressType: string
  address: string
  number: string
  complement: string
  neighborhood: string
  city: string
  state: string

  constructor(data: any) {
    this.tradeName = data["NOME FANTASIA"]
    this.companyName = data["RAZAO SOCIAL"]
    this.cnpj = data["CNPJ"]
    this.status = data["STATUS"]
    this.sector = data["SETOR"]
    this.primaryCnaeDescription = data["CNAE PRINCIPAL DESCRICAO"]
    this.primaryCnaeCode = data["CNAE PRINCIPAL CODIGO"]
    this.cep = data["CEP"]
    this.openingDate = data["DATA ABERTURA"]
    this.ddd = data["DDD"]
    this.phoneNumber = data["TELEFONE"]
    this.email = data["EMAIL"]
    this.addressType = data["TIPO LOGRADOURO"]
    this.address = data["LOGRADOURO"]
    this.number = data["NUMERO"]
    this.complement = data["COMPLEMENTO"]
    this.neighborhood = data["BAIRRO"]
    this.city = data["MUNICIPIO"]
    this.state = data["UF"]
  }
}