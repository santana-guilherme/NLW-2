export function valuesAreNotEmpty(value1: string, value2: string): boolean {
  if(value1.trim() !== '' && value2.trim() !== ''){
    return true
  }
  return false
}