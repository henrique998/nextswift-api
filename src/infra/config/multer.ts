import multer, { Options } from 'multer'
import { randomBytes } from 'node:crypto'
import { resolve } from 'path'

export class UploaderConfig {
  static execute(folder: string): Options {
    return {
      storage: multer.diskStorage({
        destination: resolve(__dirname, '..', './uploads', folder),
        filename: (req, file, cb) => {
          const fileHash = randomBytes(10).toString('hex')

          const fileName = `${fileHash}-${file.originalname}`

          return cb(null, fileName)
        },
      }),
      limits: {
        fileSize: 3 * 1024 * 1024,
      },
      fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg']

        if (allowedTypes.includes(file.mimetype)) {
          cb(null, true)
        } else {
          cb(new Error('Invalid file type!'))
        }
      },
    }
  }
}

export class UploaderExcellConfig {
  static execute(folder: string): Options {
    return {
      storage: multer.diskStorage({
        destination: resolve(__dirname, '..', './uploads', folder),
        filename: (req, file, cb) => {
          const fileHash = randomBytes(10).toString('hex')

          const fileName = `${fileHash}-${file.originalname}`

          return cb(null, fileName)
        },
      }),
      limits: {
        fileSize: 3 * 1024 * 1024,
      },
      fileFilter: (req, file, cb) => {
        const allowedTypes = [
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'text/csv',
        ]

        if (allowedTypes.includes(file.mimetype)) {
          cb(null, true)
        } else {
          cb(new Error('Invalid file type!'))
        }
      },
    }
  }
}
