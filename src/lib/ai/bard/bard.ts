import { Bard } from 'googlebard'
import { IAi } from '../type'
import { IBardAiOptions } from './type'
import { Exception } from '../../exception'
import { DecoratorAi } from '../decorator'

export class BardAi extends DecoratorAi implements IAi {
    private readonly client: Bard
    protected readonly header = 'Possible ways according to Bard:\n'
    protected readonly task = 'Find the solution to the following error'

    constructor(options: IBardAiOptions) {
        super(options.wrapper)
        try {
            const { cookie, account = 1, ...bardOptions } = options
            if (typeof cookie !== 'string') {
                throw new Exception('cookie must be a string')
            }
            this.client = new Bard(`__Secure-${account}PSID=${cookie}`, bardOptions)
        } catch (error) {
            throw new Exception('Try another cookie')
        }
    }

    private requestAdapter(task: string, message: string): string {
        return `${task}: ${message}`
    }

    private responseAdapter(response: any): string {
        return response
    }

    protected async getSolution(message: string): Promise<string> {
        const request = this.requestAdapter(this.task, message)
        const response = await this.client.ask(request)
        const solution = this.responseAdapter(response)
        return solution
    }

    protected async stream(message: string, onChunk: (solution: string) => void): Promise<void> {
        const request = this.requestAdapter(this.task, message)
        await this.client.askStream(onChunk, request)
    }
}