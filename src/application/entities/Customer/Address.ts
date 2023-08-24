import { Cep } from './Cep'

interface AddressProps {
  cep: Cep
  street: string
  number: number
  complement?: string | null
  uf: string
}

export class Address {
  private props: AddressProps

  constructor(props: AddressProps) {
    this.props = props
  }

  public get cep(): Cep {
    return this.props.cep
  }

  public set cep(cep: Cep) {
    this.props.cep = cep
  }

  public get street(): string {
    return this.props.street
  }

  public set street(street: string) {
    this.props.street = street
  }

  public get number(): number {
    return this.props.number
  }

  public set number(number: number) {
    this.props.number = number
  }

  public get complement(): string | null | undefined {
    return this.props.complement
  }

  public set complement(complement: string | null | undefined) {
    this.props.complement = complement
  }

  public get uf(): string {
    return this.props.uf
  }

  public set uf(uf: string) {
    this.props.uf = uf
  }
}
