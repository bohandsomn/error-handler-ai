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
    header: string
}