export interface IBingAiOptions {
    cookie: string
    /**
     * @default "Creative"
     */
    variant?: IVariant
}

export type IVariant = 'Balanced' | 'Precise' | 'Creative'
