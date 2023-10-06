import { DecoratorAi } from '../decorator'
import { IAi } from '../type'
import { IYouAiOptions } from './type'

export class YouAi extends DecoratorAi implements IAi {
    protected readonly header = 'Possible ways according to You:\n'
    protected readonly task = 'Go to the following link'

    constructor(options: IYouAiOptions) {
        super(options.wrapper)
    }

    protected async getSolution(message: string): Promise<string> {
        const link = `https://you.com/search?q=${message}&fromSearchBar=true&tbm=youchat`
        const solution = `${this.task}: ${link}\n`
        return solution
    }

    protected async stream(message: string, onChunk: (solution: string) => void): Promise<void> {
        const solution = await this.getSolution(message)
        return onChunk(solution)
    }
}