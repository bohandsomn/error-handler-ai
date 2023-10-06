import { IYouChatService, YouChatService } from './lib'
import { DecoratorAi } from '../decorator'
import { IAi } from '../type'
import { IYouChatAiOptions } from './type'

export class YouChatAi extends DecoratorAi implements IAi {
    private readonly client: IYouChatService
    protected readonly header = 'Possible ways according to YouChat:\n'
    protected readonly task = 'Find the solution to the following error'

    constructor(options: IYouChatAiOptions) {
        super(options.wrapper)
        this.client = new YouChatService(options.cookie)
    }

    private requestAdapter(task: string, message: string): string {
        return `${task}: ${message}`
    }

    private responseAdapter(response: string): string {
        return response
    }

    protected async getSolution(message: string): Promise<string> {
        const request = this.requestAdapter(this.task, message)
        const response = await this.client.streamingSearch(request)
        const solution = this.responseAdapter(response)
        return solution
    }

    protected async stream(message: string, onChunk: (solution: string) => void): Promise<void> {
        const request = this.requestAdapter(this.task, message)
        await this.client.streamingSearch(request, onChunk)
    }
}