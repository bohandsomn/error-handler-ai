import { IAi } from '../type'

export class App implements IAi {
    constructor(protected readonly wrappers: IAi[]) { }

    readonly header = 'Possible ways to solve the problem'

    async catch(error: unknown): Promise<string> {
        const response = await Promise.all(
            this.wrappers.map(
                async (wrapper) => ({
                    solution: await wrapper.catch(error),
                    header: wrapper.header,
                })
            )
        )
        const solution = `${this.header}:\n` + response
            .filter(({ solution }) => !!solution)
            .map(({ solution, header }) => `${header}: ${solution}`)
            .join('\n')
        return solution
    }
}