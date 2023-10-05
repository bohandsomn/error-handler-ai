import { getErrorMessage } from '../../message'
import { IAi } from '../type'

export abstract class DecoratorAi implements IAi {
    constructor(
        protected readonly wrapper?: IAi
    ) { }

    protected abstract readonly header: string
    protected abstract readonly task: string

    protected abstract getSolution(message: string): Promise<string>
    protected abstract stream(message: string, onChunk: (solution: string) => void): Promise<void>

    catch(error: unknown): Promise<string>
    catch(error: unknown, onChunk: (solution: string) => void): void
    async catch(error: unknown, onChunk?: (solution: string) => void): Promise<void | string> {
        try {
            const message = getErrorMessage(error)
            if (onChunk) {
                await this.wrapper?.catch(error, onChunk)
                onChunk(this.header)
                await this.stream(message, onChunk)
            }
            const wrapperSolution = await this.wrapper?.catch(error) || ''
            const solution = await this.getSolution(message)
            return `${wrapperSolution}\n${this.header}${solution}`
        } catch (error) {
            return '\n'
        }
    }
}