import { CompletionCreateParamsBase } from 'openai/src/resources/completions'
import { IWithWrapper } from '../type'

export interface IChatGptAiOptions extends IWithWrapper {
    apiKey: string
    /**
     * @default "text-davinci-003"
     */
    model?: IModel
}

export type IModel = CompletionCreateParamsBase['model']
