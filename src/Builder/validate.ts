import { Config } from "../Config/index.js"

export function validate(this: any): void {
  Config.validate(this.config)
}