import { IWithWrapper } from '../type'

export interface IBingAiOptions extends IWithWrapper {
    cookie: string
    /**
     * @default "Creative"
     */
    variant?: IVariant
}

export type IVariant = 'Balanced' | 'Precise' | 'Creative'
