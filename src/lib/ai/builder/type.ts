import { IBingAiOptions } from '../bing'
import { IChatGptAiOptions } from '../chatGpt'
import { IBardAiOptions } from '../bard'
import { IAi } from '../type'

export interface IBuilderAi {
    setBing(options: IBingAiOptions): this
    setChatGpt(options: IChatGptAiOptions): this
    setGutHub(): this
    setBard(options: IBardAiOptions): this
    setGoogle(): this
    setStackOverflow(): this
    build(): IAi
}