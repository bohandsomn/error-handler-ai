import { Exception } from '../../exception'
import { BingAi, IBingAiOptions } from '../bing'
import { ChatGptAi, IChatGptAiOptions } from '../chatGpt'
import { GitHubAi, IGitHubAiOptions } from '../gitHub'
import { BardAi, IBardAiOptions } from '../bard'
import { GoogleAi, IGoogleAiOptions } from '../google'
import { IStackOverflowAiOptions, StackOverflowAi } from '../stackOverflow'
import { IAi } from '../type'
import { IBuilderAi } from './type'
import { IWriteSonicAiOptions, WriteSonicAi } from '../writeSonic'
import { IYouChatAiOptions, YouChatAi } from '../youChat'
import { IYouAiOptions, YouAi } from '../you'
import { IPerplexityAiOptions, PerplexityAi } from '../perplexity'
import { CharacterAi, ICharacterAiOptions } from '../character'

export class BuilderAi implements IBuilderAi {
    private ai?: IAi

    setBing(options: IBingAiOptions): this {
        this.ai = new BingAi({ ...options, wrapper: this.ai })
        return this
    }

    setChatGpt(options: IChatGptAiOptions): this {
        this.ai = new ChatGptAi({ ...options, wrapper: this.ai })
        return this
    }

    setBard(options: IBardAiOptions): this {
        this.ai = new BardAi({ ...options, wrapper: this.ai })
        return this
    }

    setWriteSonic(options: IWriteSonicAiOptions): this {
        this.ai = new WriteSonicAi({ ...options, wrapper: this.ai })
        return this
    }

    setYouChat(options: IYouChatAiOptions): this {
        this.ai = new YouChatAi({ ...options, wrapper: this.ai })
        return this
    }

    setYou(options: IYouAiOptions = {}): this {
        this.ai = new YouAi({ ...options, wrapper: this.ai })
        return this
    }

    setGitHub(options: IGitHubAiOptions = {}): this {
        this.ai = new GitHubAi({ ...options, wrapper: this.ai })
        return this
    }

    setGoogle(options: IGoogleAiOptions = {}): this {
        this.ai = new GoogleAi({ ...options, wrapper: this.ai })
        return this
    }

    setStackOverflow(options: IStackOverflowAiOptions = {}): this {
        this.ai = new StackOverflowAi({ ...options, wrapper: this.ai })
        return this
    }

    setPerplexity(options: IPerplexityAiOptions = {}): this {
        this.ai = new PerplexityAi({ ...options, wrapper: this.ai })
        return this
    }

    setCharacter(options: ICharacterAiOptions = {}): this {
        this.ai = new CharacterAi({ ...options, wrapper: this.ai })
        return this
    }

    build(): IAi {
        if (!this.ai) {
            throw new Exception('List of ais must contain at least one')
        }
        return this.ai
    }
}