import { IAi } from '../type'

export class App implements IAi {
    constructor(protected readonly wrappers: IAi[]) { }

    async catch(error: unknown): Promise<string> {
        const header = 'Possible ways to solve the problem'
        const response = await Promise.all(this.wrappers.map((wrapper) => wrapper.catch(error)))
        const solution = response.join('\n')
        return `${header}:\n${solution}`
    }
}