export function greet(name: string): string {
  return `Hello, ${name}!`
}

export class Calculator {
  add(a: number, b: number): number {
    return a + b
  }

  multiply(a: number, b: number): number {
    return a * b
  }
}

export const VERSION = '1.0.0'
export const PI = Math.PI