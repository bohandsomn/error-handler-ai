import type Options from 'googlebard/dist/models/options'
import { IWithWrapper } from '../type'

export interface IWriteSonicAiOptions extends Options, IWithWrapper {
    token: string
}
