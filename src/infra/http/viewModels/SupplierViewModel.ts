import { Supplier } from '@app/entities/Supplier'

export class SupplierViewModel {
  static toHttp(supplier: Supplier) {
    return {
      id: supplier.id,
      name: supplier.name,
      email: supplier.email,
      cpf: supplier.cpf ?? null,
      cnpj: supplier.cnpj ?? null,
      ddd: supplier.ddd,
      phone: supplier.phone,
      street: supplier.address.street,
      complement: supplier.address.complement,
      number: supplier.address.number,
      cep: supplier.address.cep.value,
      uf: supplier.address.uf,
      createdAt: supplier.createdAt,
      updatedAt: supplier.updatedAt,
    }
  }
}
