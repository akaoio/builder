export class DOM {
  static create(tag: string): HTMLElement {
    return document.createElement(tag)
  }

  static select(selector: string): Element | null {
    return document.querySelector(selector)
  }

  static ready(callback: () => void): void {
    if (document.readyState !== 'loading') {
      callback()
    } else {
      document.addEventListener('DOMContentLoaded', callback)
    }
  }
}

export function animate(element: HTMLElement, duration: number = 1000): void {
  element.style.transition = `all ${duration}ms ease`
}