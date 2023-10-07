import { IBingAiOptions } from '../bing'
import { IChatGptAiOptions } from '../chatGpt'
import { IBardAiOptions } from '../bard'
import { IAi } from '../type'
import { IGitHubAiOptions } from '../gitHub'
import { IGoogleAiOptions } from '../google'
import { IStackOverflowAiOptions } from '../stackOverflow'
import { IWriteSonicAiOptions } from '../writeSonic'
import { IYouChatAiOptions } from '../youChat'
import { IYouAiOptions } from '../you'
import { IPerplexityAiOptions } from '../perplexity'

export interface IBuilderAi {
    setBing(options: IBingAiOptions): this
    setChatGpt(options: IChatGptAiOptions): this
    setBard(options: IBardAiOptions): this
    setWriteSonic(options: IWriteSonicAiOptions): this
    setYouChat(options: IYouChatAiOptions): this
    setYou(options?: IYouAiOptions): this
    setGitHub(options?: IGitHubAiOptions): this
    setGoogle(options?: IGoogleAiOptions): this
    setStackOverflow(options?: IStackOverflowAiOptions): this
    setPerplexity(options?: IPerplexityAiOptions): this
    build(): IAi
}