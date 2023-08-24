/* eslint-disable no-async-promise-executor */
import { createReadStream } from 'node:fs'

import {
    IProductsExcelProvider,
    ProductData,
} from '@app/providers/IProductsExcelProvider'
import { parse } from 'fast-csv'

export class FastCsvProductsExcelProvider implements IProductsExcelProvider {
  async load(file: Express.Multer.File): Promise<ProductData[]> {
    return new Promise(async (resolve, reject) => {
      const productsData: ProductData[] = []

      try {
        const productsStream = createReadStream(file.path).pipe(parse())

        productsStream.on('error', (error) => {
          reject(error)
        })

        productsStream.on('data', async (row: ProductData) => {
          productsData.push({
            name: row.name?.toString(),
            excerpt: row.excerpt?.toString(),
            description: row.description?.toString(),
            width: Number(row?.width),
            height: Number(row?.height),
            weight: Number(row?.weight),
            price: Number(row?.price),
            quantity: Number(row?.quantity),
          })
        })

        productsStream.on('end', () => {
          resolve(productsData)
        })
      } catch (error) {
        reject(error)
      }
    })
  }
}
