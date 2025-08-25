export class DOMHelper {
  static createElement(tag: string): HTMLElement {
    return document.createElement(tag)
  }

  static querySelector(selector: string): Element | null {
    return document.querySelector(selector)
  }
}

export function ready(callback: () => void): void {
  if (document.readyState !== 'loading') {
    callback()
  } else {
    document.addEventListener('DOMContentLoaded', callback)
  }
}
