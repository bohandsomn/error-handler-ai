# Error handler ai

Handles errors that may occur while the program is running. Under the hood of the program, modern solutions are used, which are actively used by developers now

You can use this package to speed up error detection and resolution. Popular solutions such as "ChatGPT", "Bing", "StackOverflow", "Google", "GitHub" are used under the hood.

## Usage

```
import { BuilderAi } from 'error-handler-ai'

const ai = new BuilderAi()
  .setBing({
    cookie: process.env.BING_COOKIE
  })
  .setGoogle()
  .setGutHub()
  .setStackOverflow()
  .build()

async function bootstrap() {
  try {
    throw new Error(`
    ERROR in node:crypto
    Module build failed: UnhandledSchemeError: Reading from "node:crypto" is not handled by plugins (Unhandled scheme).
    Webpack supports "data:" and "file:" URIs by default.
    You may need an additional plugin to handle "node:" URIs.
    `)
  } catch (error) {
    const solution = await ai.catch(error)
    console.log(solution)
  }
}

bootstrap()
```
