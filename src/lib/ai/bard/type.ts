import type Options from 'googlebard/dist/models/options'

export interface IBardAiOptions extends Options {
    cookie: string
    /**
     * @default 1
     */
    account?: number | `${number}`
}
