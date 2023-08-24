import { Supplier } from '@app/entities/Supplier'
import { Address } from '@app/entities/Supplier/Address'
import { Cep } from '@app/entities/Supplier/Cep'
import { Supplier as RawSupplier } from '@prisma/client'

export class PrismaSuppliersMapper {
  static toPrisma(supplier: Supplier): RawSupplier {
    return {
      id: supplier.id,
      name: supplier.name,
      email: supplier.email,
      cpf: supplier.cpf ?? null,
      cnpj: supplier.cnpj ?? null,
      ddd: supplier.ddd,
      phone: supplier.phone,
      deletedAt: supplier.deletedAt ?? null,
      cep: supplier.address.cep.value,
      street: supplier.address.street,
      number: supplier.address.number,
      complement: supplier.address.complement ?? null,
      uf: supplier.address.uf,
      createdAt: supplier.createdAt,
      updatedAt: supplier.updatedAt ?? null,
    }
  }

  static toDomain(rawSupplier: RawSupplier): Supplier {
    return new Supplier(
      {
        name: rawSupplier.name,
        email: rawSupplier.email,
        cpf: rawSupplier.cpf ?? null,
        cnpj: rawSupplier.cnpj ?? null,
        ddd: rawSupplier.ddd,
        phone: rawSupplier.phone,
        address: new Address({
          cep: new Cep(rawSupplier.cep),
          street: rawSupplier.street,
          number: rawSupplier.number,
          complement: rawSupplier.complement,
          uf: rawSupplier.uf,
        }),
        deletedAt: rawSupplier.deletedAt,
        createdAt: rawSupplier.createdAt,
        updatedAt: rawSupplier.updatedAt,
      },
      rawSupplier.id,
    )
  }
}
