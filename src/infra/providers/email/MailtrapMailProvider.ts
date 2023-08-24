import handlebars from 'handlebars'
import nodemailer, { Transporter } from 'nodemailer'

import {
    IMailProvider,
    SendMailProps,
} from '@app/providers/IMailProvider'
import { env } from '@infra/env'
import { readFileSync } from 'node:fs'

export class MailtrapMailProvider implements IMailProvider {
  private client: Transporter

  constructor() {
    this.client = nodemailer.createTransport({
      host: env.MAILTRAP_API_HOST,
      port: Number(env.MAILTRAP_API_PORT),
      auth: {
        user: env.MAILTRAP_API_USER,
        pass: env.MAILTRAP_API_PASS,
      },
    })
  }

  async sendMail({
    to,
    path,
    subject,
    variables,
    attachments,
  }: SendMailProps): Promise<void> {
    const templateFileContent = readFileSync(path, 'utf-8')

    const templateParse = handlebars.compile(templateFileContent)

    const templateHTML = templateParse(variables)

    this.client.sendMail({
      from: {
        address: 'POS <noreplay@pos.com.br>',
        name: 'Jhon doe',
      },
      to,
      subject,
      html: templateHTML,
      attachments,
    })
  }
}
