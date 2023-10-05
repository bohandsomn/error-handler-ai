import { DecoratorAi } from '../decorator'
import { IAi } from '../type'
import { IGitHubAiOptions } from './type'

export class GitHubAi extends DecoratorAi implements IAi {
    protected readonly header = 'Possible ways according to GitHub:\n'
    protected readonly task = 'Go to the following link'

    constructor(options: IGitHubAiOptions) {
        super(options.wrapper)
    }

    protected async getSolution(message: string): Promise<string> {
        const link = `https://github.com/search?q=${message}&type=issues`
        const solution = `${this.task}: ${link}\n`
        return solution
    }

    protected async stream(message: string, onChunk: (solution: string) => void): Promise<void> {
        const solution = await this.getSolution(message)
        return onChunk(solution)
    }
}