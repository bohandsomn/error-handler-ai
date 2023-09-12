import { IBingAiOptions } from '../bing'
import { IChatGptAiOptions } from '../chatGpt'
import { IAi } from '../type'

export interface IBuilderAi {
    setBing(options: IBingAiOptions): this
    setChatGpt(options: IChatGptAiOptions): this
    setGutHub(): this
    setGoogle(): this
    setStackOverflow(): this
    build(): IAi
}