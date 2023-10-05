import { BingChat, ChatMessage } from 'bing-chat'
import { Exception } from '../../exception'
import { IAi } from '../type'
import { IBingAiOptions, IVariant } from './type'
import { DecoratorAi } from '../decorator'

export class BingAi extends DecoratorAi implements IAi {
    private readonly variant: IVariant
    private readonly client: BingChat
    protected readonly header = 'Possible ways according to ai Bing microsoft:\n'
    protected readonly task = 'Find the solution to the following error'

    constructor(options: IBingAiOptions) {
        super(options.wrapper)
        const { cookie, variant } = options
        if (typeof cookie !== 'string') {
            throw new Exception('cookie must be a string')
        }
        this.variant = variant ?? 'Creative'
        this.client = new BingChat({ cookie })
    }

    private requestAdapter(task: string, message: string) {
        return `${task}: ${message}`
    }

    private responseAdapter(response: ChatMessage) {
        return this.extractTextWithBrackets(response.text)
    }

    private extractTextWithBrackets(input: string): string {
        const regex = /\*\*(.*?)\*\*/
        const match = input.match(regex)
        if (match && match[1]) {
            return match[1].trim()
        } else {
            return input.trim()
        }
    }

    protected async getSolution(message: string): Promise<string> {
        const request = this.requestAdapter(this.task, message)
        const response = await this.client.sendMessage(request, {
            variant: this.variant,
        })
        const solution = this.responseAdapter(response)
        return solution
    }

    protected async stream(message: string, onChunk: (solution: string) => void): Promise<void> {
        const request = this.requestAdapter(this.task, message)
        await this.client.sendMessage(request, {
            onProgress: (response) => {
                onChunk(this.responseAdapter(response))
            }
        })
    }
}
