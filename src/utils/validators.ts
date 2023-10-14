export function licensePlateValidate(licensePlate: string): boolean {
  licensePlate = licensePlate.toUpperCase().replace('-', '')
  const licensePlateRegex = /[A-Z]{3}[0-9][0-9A-Z][0-9]{2}/
  return licensePlateRegex.test(licensePlate)
}
