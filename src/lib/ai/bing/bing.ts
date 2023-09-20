import { BingChat, ChatMessage } from 'bing-chat'
import { Exception } from '../../exception'
import { getErrorMessage } from '../../message'
import { IAi } from '../type'
import { IBingAiOptions, IVariant } from './type'

export class BingAi implements IAi {
    private readonly variant: IVariant
    private readonly client: BingChat

    constructor(options: IBingAiOptions) {
        const { cookie, variant } = options
        if (typeof cookie !== "string") {
            throw new Exception('cookie must be a string')
        }
        this.variant = variant ?? 'Creative'
        this.client = new BingChat({ cookie })
    }

    async catch(error: unknown): Promise<string> {
        const header = 'Possible ways according to ai Bing microsoft'
        try {
            const task = 'Find the solution to the following error:'
            const message = getErrorMessage(error)
            const request = this.requestAdapter(task, message)
            const response = await this.client.sendMessage(request, {
                variant: this.variant,
            })
            const solution = this.responseAdapter(response)
            return `${header}:\n${solution}`
        } catch (error) {
            return `${header}:\n`
        }
    }

    private requestAdapter(task: string, message: string) {
        return `${task} ${message}`
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
}
