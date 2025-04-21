declare module '@wllama/wllama' {
  export class Wllama {
    constructor(wasmLoader: any)
    loadModelFromUrl(model: { url: string; size: number }, options?: any): Promise<void>
    loadModelFromHF(org: string, filename: string, options?: any): Promise<void>
    createCompletion(prompt: string, options?: any): Promise<string>
  }
}

declare module '@wllama/wllama/esm/wasm-from-cdn.js' {
  const WasmFromCDN: any
  export default WasmFromCDN
}

declare module '*.worker.js' {
  class WebpackWorker extends Worker {
    constructor()
  }
  export default WebpackWorker
}

declare module '*.worker.ts' {
  class WebpackWorker extends Worker {
    constructor()
  }
  export default WebpackWorker
}
