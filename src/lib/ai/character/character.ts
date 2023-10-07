import { DecoratorAi } from '../decorator'
import { IAi } from '../type'
import { ICharacterAiOptions } from './type'

export class CharacterAi extends DecoratorAi implements IAi {
    protected readonly header = 'Possible ways according to Character:\n'
    protected readonly task = 'Go to the following link'

    constructor(options: ICharacterAiOptions) {
        super(options.wrapper)
    }

    protected async getSolution(message: string): Promise<string> {
        const link = `https://beta.character.ai/chat?q=${message}&char=YntB_ZeqRq2l_aVf2gWDCZl4oBttQzDvhj9cXafWcF8`
        const solution = `${this.task}: ${link}\n`
        return solution
    }

    protected async stream(message: string, onChunk: (solution: string) => void): Promise<void> {
        const solution = await this.getSolution(message)
        return onChunk(solution)
    }
}