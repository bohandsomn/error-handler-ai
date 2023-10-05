import type Options from 'googlebard/dist/models/options'
import { IWithWrapper } from '../type'

export interface IBardAiOptions extends Options, IWithWrapper {
    cookie: string
    /**
     * @default 1
     */
    account?: number | `${number}`
}
