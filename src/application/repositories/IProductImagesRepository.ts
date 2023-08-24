import { ProductImage } from '@app/entities/ProductImage'

export interface IProductImagesRepository {
  findManyById(imageIds: string[]): Promise<ProductImage[] | null>
  findManyByProductId(productId: string): Promise<ProductImage[] | null>
  create(images: ProductImage[], productId: string): Promise<void>
  delete(imagesIds: string[], productId: string): Promise<void>
}
