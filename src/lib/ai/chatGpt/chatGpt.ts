import OpenAI from 'openai'
import { Exception } from '../../exception'
import { IAi } from '../type'
import { IChatGptAiOptions, IModel } from './type'
import { DecoratorAi } from '../decorator'

export class ChatGptAi extends DecoratorAi implements IAi {
    private readonly client: OpenAI
    private readonly model: IModel
    protected readonly header = 'Possible ways according to ai ChatGPT:\n'
    protected readonly task = 'Find the solution to the following error'

    constructor(options: IChatGptAiOptions) {
        super(options.wrapper)
        const { apiKey, model } = options
        if (typeof apiKey !== 'string') {
            throw new Exception('apiKey must be a string')
        }
        this.client = new OpenAI({ apiKey })
        this.model = model ?? 'text-davinci-003'
    }

    private requestAdapter(task: string, message: string) {
        return {
            model: this.model,
            prompt: [`${task}: ${message}`]
        }
    }

    private responseAdapter(response: OpenAI.Completions.Completion) {
        return response.choices.map((choice) => choice.text).join(' ')
    }

    protected async getSolution(message: string): Promise<string> {
        const request = this.requestAdapter(this.task, message)
        const response = await this.client.completions.create(request)
        const solution = this.responseAdapter(response)
        return solution
    }

    protected async stream(message: string, onChunk: (solution: string) => void): Promise<void> {
        const request = this.requestAdapter(this.task, message)
            ; (await this
                .client
                .completions
                .create(request)
            ).choices
                .forEach((choice) => onChunk(choice.text))
    }
}