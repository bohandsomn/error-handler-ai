import { DecoratorAi } from '../decorator'
import { IAi } from '../type'
import { IStackOverflowAiOptions } from './type'

export class StackOverflowAi extends DecoratorAi implements IAi {
    protected readonly header = 'Possible ways according to StackOverflow:\n'
    protected readonly task = 'Go to the following link'

    constructor(options: IStackOverflowAiOptions) {
        super(options.wrapper)
    }

    protected async getSolution(message: string): Promise<string> {
        const link = `https://stackoverflow.com/search?q=${message}`
        const solution = `${this.task}: ${link}\n`
        return solution
    }

    protected async stream(message: string, onChunk: (solution: string) => void): Promise<void> {
        const solution = await this.getSolution(message)
        return onChunk(solution)
    }
}