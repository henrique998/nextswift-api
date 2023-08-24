export class Name {
  private readonly name: string

  constructor(name: string) {
    const isLenghtValid = this.hasValidLenght(name)

    if (!isLenghtValid) {
      throw new Error('Lenght invalid!')
    }

    this.name = name
  }

  hasValidLenght(name: string): boolean {
    return name.length >= 3
  }

  public get value(): string {
    return this.name
  }
}
