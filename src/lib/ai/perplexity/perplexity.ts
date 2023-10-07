import { DecoratorAi } from '../decorator'
import { IAi } from '../type'
import { IPerplexityAiOptions } from './type'

export class PerplexityAi extends DecoratorAi implements IAi {
    protected readonly header = 'Possible ways according to Perplexity:\n'
    protected readonly task = 'Go to the following link'

    constructor(options: IPerplexityAiOptions) {
        super(options.wrapper)
    }

    protected async getSolution(message: string): Promise<string> {
        const link = `https://www.perplexity.ai/search?q=${message}`
        const solution = `${this.task}: ${link}\n`
        return solution
    }

    protected async stream(message: string, onChunk: (solution: string) => void): Promise<void> {
        const solution = await this.getSolution(message)
        return onChunk(solution)
    }
}