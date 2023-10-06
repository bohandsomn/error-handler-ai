import { BuilderAi } from './lib'

export * from './lib'

(async () => {
    const ai = new BuilderAi()
        .setYou()
        .setYouChat({
            cookie: 'ZryycUeJQH2lfqqfvsKw7F3_tR4mUps0KgPVSUKXrGA-1696585683-0-AWhUN8E5FyyIDBbPVZNWFiWLxXS4Ljx4HnssnP8CXJLFlPR/ab4pgBC3x8/mtc+BDbRnqhHCU0Xo4dXm1KRVD4mO67msuMd6ihKNI31DxUBN'
        })
        .build()
    ai.catch(
        new Error('database failed to connect'),
        (chunk) => process.stdout.write(chunk)
    )
})()
