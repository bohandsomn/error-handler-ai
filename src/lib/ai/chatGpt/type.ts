import { CompletionCreateParamsBase } from 'openai/src/resources/completions'

export interface IChatGptAiOptions {
    apiKey: string
    /**
     * @default "text-davinci-003"
     */
    model?: IModel
}

export type IModel = CompletionCreateParamsBase['model']
