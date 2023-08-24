type Unit = 'minutes' | 'hours' | 'days'

export interface IDateProvider {
  now(): Date
  add(amount: number, unit: Unit): Date
  isBefore(startDate: Date, endDate: Date): boolean
}
