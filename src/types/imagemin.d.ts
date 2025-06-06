declare module 'imagemin-webp' {
  interface Options {
    quality?: number
    alphaQuality?: number
    method?: number
    sns?: number
    filter?: number
    autoFilter?: boolean
    sharpness?: number
    lossless?: boolean
    nearLossless?: number
    crop?: {
      x: number
      y: number
      width: number
      height: number
    }
    resize?: {
      width: number
      height: number
    }
    metadata?: string[]
  }

  function imageminWebp(options?: Options): (input: Buffer) => Promise<Buffer>
  export = imageminWebp
}
