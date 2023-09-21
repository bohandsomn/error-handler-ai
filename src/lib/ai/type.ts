export interface IAi {
    /**
     * 
     * @param error unknown
     * 
     * @example
     * try {
     *     ...
     * } catch (error) {
     *     const solution = await ai.catch(error)
     *     console.log(solution)
     * }
     * 
     * @returns {Promise<string>} solution
     */
    catch(error: unknown): Promise<string>
    /**
     * 
     * @param error unknown
     * @param onChunk (solution: string) => void
     * 
     * @example
     * try {
     *     ...
     * } catch (error) {
     *     ai.catch(error, (solution: string) => process.stdout.write(solution))
     * }
     * 
     * @returns {void}
     */
    catch(error: unknown, onChunk: (solution: string) => void): void
}