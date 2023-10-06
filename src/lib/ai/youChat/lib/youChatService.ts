import axios, { AxiosInstance } from 'axios'
import { IYouChatService } from './type'
import { parseSse } from '../../../sse'

export class YouChatService implements IYouChatService {
    private readonly network: AxiosInstance

    constructor(
        private readonly cookie: string
    ) {
        this.network = axios.create({
            baseURL: 'https://you.com/api',
            validateStatus: () => true,
        })
    }

    streamingSearch(question: string): Promise<string>;
    streamingSearch(question: string, onChunk: (chunk: string) => void): void;
    async streamingSearch(question: string, onChunk?: (chunk: string) => void): Promise<string | void> {
        try {
            const text = await this.network.get(`https://you.com/api/streamingSearch?q=${question}&domain=youchat`, {
                headers: {
                    Origin: 'https://you.com',
                    Referer: 'https://you.com/',
                    Cookie: `__cf_bm=${this.cookie};`,
                    'User-Agent': 'PostmanRuntime/7.33.0',
                    Accept: '*/*',
                    'Accept-Encoding': 'gzip, deflate, br',
                    Connection: 'keep-alive',
                },
                responseType: 'stream'
            })
                .then((response) => this.decodeIncomingMessage(response.data!, onChunk))
            return text
        } catch (error) {
            const ERROR_MESSAGE = 'Try another cookie'
            throw new Error(ERROR_MESSAGE, { cause: error })
        }
    }

    private decodeIncomingMessage(
        stream: NodeJS.ReadableStream,
        onChunk?: (chunk: string) => void,
    ): Promise<string> {
        const SEARCH_EVENT = 'youChatToken'
        return new Promise((resolve, reject) => {
            let text = ''
            const textDecoder = new TextDecoder('utf-8')
            stream.on('data', (source: Buffer) => {
                const list = parseSse({
                    data: textDecoder.decode(source),
                    searchEvent: SEARCH_EVENT
                }).map((chunk): string => JSON.parse(chunk)?.[SEARCH_EVENT] || '')
                list.forEach((chunk) => {
                    text += chunk
                    onChunk?.(chunk)
                })
            })
            stream.on('error', (error) => {
                reject(error)
            })
            stream.on('end', () => {
                resolve(text)
            })
        })
    }
}