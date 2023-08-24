interface Attachment {
  filename: string
  content: Buffer
  contentType: string
}

export interface SendMailProps {
  to: string
  subject: string
  variables: any
  path: string
  attachments?: Attachment[]
}

export interface IMailProvider {
  sendMail(props: SendMailProps): Promise<void>
}
