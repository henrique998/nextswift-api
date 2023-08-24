import dayjs from 'dayjs'

import { IDateProvider } from '@app/providers/IDateProvider'

export class DayjsDateProvider implements IDateProvider {
  now(): Date {
    return dayjs().toDate()
  }

  add(amount: number, unit: 'minutes' | 'hours' | 'days'): Date {
    return dayjs().add(amount, unit).toDate()
  }

  isBefore(startDate: Date, endDate: Date): boolean {
    return dayjs(startDate).isBefore(endDate)
  }
}
