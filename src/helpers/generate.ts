import { Category } from '@app/entities/Category'
import { Customer } from '@app/entities/Customer'
import { Address } from '@app/entities/Customer/Address'
import { Cep } from '@app/entities/Customer/Cep'
import { Cpf } from '@app/entities/Customer/Cpf'
import { Employee } from '@app/entities/Employee'
import { Email } from '@app/entities/Employee/Email'
import { Password } from '@app/entities/Employee/Password'
import { Product } from '@app/entities/Product'
import { ProductImage } from '@app/entities/ProductImage'
import { Purchase } from '@app/entities/Purchase'
import { Role } from '@app/entities/Role'
import { Supplier } from '@app/entities/Supplier'
import { Address as SupplierAddress } from '@app/entities/Supplier/Address'
import { Cep as SupplierCep } from '@app/entities/Supplier/Cep'

export class Generate {
  static product(product: any): Product {
    return new Product(
      {
        name: product.name,
        excerpt: product.excerpt,
        description: product.description,
        width: product.width,
        height: product.height,
        quantity: product.quantity,
        price: product.price,
        weight: product.weight,
        categories: product.categories.map(
          (category: any) =>
            new Category(
              {
                name: category.name,
                productsCount: null,
                createdAt: category.createdAt,
              },
              category.id,
            ),
        ),
        images: product.images.map(
          (image: any) =>
            new ProductImage(
              {
                url: image.url,
                name: image.name,
                size: image.size,
                createdAt: image.createdAt,
              },
              image.id,
            ),
        ),
        authorId: product.authorId,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
        removedAt: product.removedAt,
      },
      product.id,
    )
  }

  static redisProduct(product: Product) {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      excerpt: product.excerpt,
      width: product.width,
      height: product.height,
      quantity: product.quantity,
      weight: product.weight,
      categories: product.categories?.map((category) => {
        return {
          id: category.id,
          name: category.name,
          createdAt: category.createdAt,
        }
      }),
      images: product.images?.map((image) => {
        return {
          id: image.id,
          url: image.url,
          createdAt: image.createdAt,
        }
      }),
      authorId: product.authorId,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      removedAt: product.removedAt,
    }
  }

  static employee(employee: any): Employee {
    return new Employee(
      {
        name: employee.name,
        email: new Email(employee.email),
        password: new Password(employee.password),
        avatar: employee.avatar,
        ddd: employee.ddd,
        phone: employee.phone,
        role: employee.role,
        cpf: employee.cpf,
        createdAt: employee.createdAt,
        updatedAt: employee.updatedAt,
        dismissedAt: employee.dismissedAt,
      },
      employee.id,
    )
  }

  static redisEmployee(employee: Employee) {
    return {
      id: employee.id,
      name: employee.name,
      email: employee.email.value,
      password: employee.password.value,
      avatar: employee.avatar,
      ddd: employee.ddd,
      phone: employee.phone,
      role: employee.role,
      cpf: employee.cpf,
      createdAt: employee.createdAt,
      updatedAt: employee.updatedAt,
      dismissedAt: employee.dismissedAt,
    }
  }

  static role(role: any): Role {
    return new Role(
      {
        name: role.name,
        employeeId: role.employeeId,
        createdAt: role.createdAt,
      },
      role.id,
    )
  }

  static redisRole(role: Role) {
    return {
      id: role.id,
      name: role.name,
      employeeId: role.employeeId,
      createdAt: role.createdAt,
    }
  }

  static customer(customer: any): Customer {
    return new Customer(
      {
        name: customer.name,
        email: customer.email,
        cpf: new Cpf(customer.cpf),
        ddd: customer.ddd,
        phone: customer.phone,
        address: new Address({
          cep: new Cep(customer.address.cep),
          number: customer.address.number,
          street: customer.address.street,
          uf: customer.address.uf,
          complement: customer.address.complement,
        }),
        createdAt: customer.createdAt,
        updatedAt: customer.updatedAt,
        deletedAt: customer.deletedAt,
      },
      customer.id,
    )
  }

  static redisCustomer(customer: Customer) {
    return {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      cpf: customer.cpf?.value,
      ddd: customer.ddd,
      phone: customer.phone,
      address: {
        cep: customer.address.cep.value,
        number: customer.address.number,
        street: customer.address.street,
        uf: customer.address.uf,
        complement: customer.address.complement,
      },
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
      deletedAt: customer.deletedAt,
    }
  }

  static purchase(purchase: any): Purchase {
    return new Purchase(
      {
        buyerId: purchase.buyerId,
        paymentMethod: purchase.paymentMethod,
        productId: purchase.productId,
        productsQty: purchase.productsQty,
        total: purchase.total,
        buyerName: purchase.buyerName,
        productName: purchase.productName,
        createdAt: purchase.createdAt,
      },
      purchase.id,
    )
  }

  static redisPurchase(purchase: Purchase) {
    return {
      id: purchase.id,
      buyerId: purchase.buyerId,
      paymentMethod: purchase.paymentMethod,
      productId: purchase.productId,
      productsQty: purchase.productsQty,
      total: purchase.total,
      buyerName: purchase.buyerName,
      productName: purchase.productName,
      createdAt: purchase.createdAt,
    }
  }

  static category(category: any): Category {
    return new Category(
      {
        name: category.name,
        productsCount: category.productsCount,
        createdAt: category.createdAt,
      },
      category.id,
    )
  }

  static redisCategory(category: Category) {
    return {
      id: category.id,
      name: category.name,
      productsCount: category.productsCount,
      createdAt: category.createdAt,
    }
  }

  static supplier(supplier: any): Supplier {
    return new Supplier(
      {
        name: supplier.name,
        email: supplier.email,
        cpf: supplier.cpf,
        cnpj: supplier.cnpj,
        ddd: supplier.ddd,
        phone: supplier.phone,
        address: new SupplierAddress({
          cep: new SupplierCep(supplier.address.cep),
          number: supplier.address.number,
          street: supplier.address.street,
          uf: supplier.address.uf,
          complement: supplier.address.complement,
        }),
        createdAt: supplier.createdAt,
        updatedAt: supplier.updatedAt,
        deletedAt: supplier.deletedAt,
      },
      supplier.id,
    )
  }

  static redisSupplier(supplier: Supplier) {
    return {
      id: supplier.id,
      name: supplier.name,
      email: supplier.email,
      cpf: supplier.cpf,
      cnpj: supplier.cnpj,
      ddd: supplier.ddd,
      phone: supplier.phone,
      address: {
        cep: supplier.address.cep.value,
        number: supplier.address.number,
        street: supplier.address.street,
        uf: supplier.address.uf,
        complement: supplier.address.complement,
      },
      createdAt: supplier.createdAt,
      updatedAt: supplier.updatedAt,
      deletedAt: supplier.deletedAt,
    }
  }
}
