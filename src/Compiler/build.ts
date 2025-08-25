import { build as tsupBuild } from "tsup"

export async function build(config: any): Promise<any> {
  return tsupBuild(config)
}