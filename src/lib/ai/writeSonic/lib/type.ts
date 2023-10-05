export interface IWriteSonicService {
    /**
     * @param seedText 
     * @type {string}
     * @example 
     * const WRITE_SONIC_TOKEN = 'token'
     * const writeSonic = new WriteSonicService(WRITE_SONIC_TOKEN)
     * const solution = await writeSonic.contentChatSonicSse('Find the solution to the following error: database failed to connect')
     * console.log(solution)
     * @returns {Promise<string>}
     */
    contentChatSonicSse(seedText: string): Promise<string>
    /**
     * @param seedText 
     * @type {string}
     * @param onChunk 
     * @type {(chunk: string) => void}
     * @example 
     * const WRITE_SONIC_TOKEN = 'token'
     * const writeSonic = new WriteSonicService(WRITE_SONIC_TOKEN)
     * writeSonic.contentChatSonicSse(
     *     'Find the solution to the following error: database failed to connect',
     *     (chunk) => process.stdout.write(chunk)
     * )
     * @returns {void}
     */
    contentChatSonicSse(seedText: string, onChunk?: (chunk: string) => void): void
}