import { WriteSonicService, IWriteSonicService } from './lib'
import { IAi } from '../type'
import { IWriteSonicAiOptions } from './type'
import { Exception } from '../../exception'
import { DecoratorAi } from '../decorator'

export class WriteSonicAi extends DecoratorAi implements IAi {
    private readonly client: IWriteSonicService
    protected readonly header = 'Possible ways according to WriteSonic:\n'
    protected readonly task = 'Find the solution to the following error'

    constructor(options: IWriteSonicAiOptions) {
        super(options.wrapper)
        const { token } = options
        if (typeof token !== 'string') {
            throw new Exception('WriteSonic token must be a string')
        }
        this.client = new WriteSonicService(token)
    }

    private requestAdapter(task: string, message: string): string {
        return `${task}: ${message}`
    }

    private responseAdapter(response: string): string {
        return response
    }

    protected async getSolution(message: string): Promise<string> {
        const request = this.requestAdapter(this.task, message)
        const response = await this.client.contentChatSonicSse(request)
        const solution = this.responseAdapter(response)
        return solution
    }

    protected async stream(message: string, onChunk: (solution: string) => void): Promise<void> {
        const request = this.requestAdapter(this.task, message)
        await this.client.contentChatSonicSse(request, onChunk)
    }
}