import { DecoratorAi } from '../decorator'
import { IAi } from '../type'
import { IGoogleAiOptions } from './type'

export class GoogleAi extends DecoratorAi implements IAi {
    protected readonly header = 'Possible ways according to Google:\n'
    protected readonly task = 'Go to the following link'

    constructor(options: IGoogleAiOptions)
    constructor(options: IGoogleAiOptions, wrapper?: IAi) {
        super(wrapper)
    }

    protected async getSolution(message: string): Promise<string> {
        const link = `https://www.google.com/search?q=${message}`
        const solution = `${this.task}: ${link}\n`
        return solution
    }

    protected async stream(message: string, onChunk: (solution: string) => void): Promise<void> {
        const solution = await this.getSolution(message)
        return onChunk(solution)
    }
}