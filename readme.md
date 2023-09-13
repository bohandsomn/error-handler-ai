# Error handler ai

Handles errors that may occur while the program is running. Under the hood of the program, modern solutions are used, which are actively used by developers now.

You can use this package to speed up error detection and resolution. Popular solutions such as `ChatGPT`, `Bing`, `StackOverflow`, `Google`, `GitHub` are used under the hood.

## Installation

```
npm install error-handler-ai
```

## API Reference

#### IBingAiOptions

| Parameter | Type       | Description                                  |
| :-------- | :--------- | :------------------------------------------- |
| `cookie`  | `string`   | **Required**. \_U cookie from Microsoft Edge |
| `variant` | `IVariant` | **Default:** `"Creative"`.                   |

`type IVariant = "Balanced" | "Precise" | "Creative"`

#### IChatGptAiOptions

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `apiKey`  | `string` | **Required**. apiKey from OpenAI   |
| `model`   | `IModel` | **Default:** `"text-davinci-003"`. |

`type IModel = "babbage-002" | "davinci-002" | "text-davinci-003" | "text-davinci-002" | "text-davinci-001" | "code-davinci-002" | "text-curie-001" | "text-babbage-001" | "text-ada-001"`

#### IAi

Method `catch` takes one error and returns the solution.

```
interface IAi {
  catch(error: unknown): Promise<string>
}
```

#### IBuilderAi

```
interface IBuilderAi {
    setBing(options: IBingAiOptions): this
    setChatGpt(options: IChatGptAiOptions): this
    setGutHub(): this
    setGoogle(): this
    setStackOverflow(): this
    build(): IAi
}
```

## Usage

You can use `BuilderAi` to create an ai service that implements the IAi interface. It is a combination of services that you add with setters.

**NOTE:** It is recommended to use in `development` mode.

```
import { BuilderAi } from "error-handler-ai"

const isDev = process.env.NODE_ENV === 'development'
const ai = new BuilderAi()
  .setBing({
    cookie: process.env.BING_COOKIE!
  })
  .setChatGpt({
    apiKey: process.env.CHAT_GPT_API_KEY!
  })
  .setGoogle()
  .setGutHub()
  .setStackOverflow()
  .build()

async  function  bootstrap() {
  try {
    throw  new  Error('database failed to connect')
  } catch (error) {
    if (isDev) {
      const  solution  =  await  ai.catch(error)
      console.log(solution)
    }
  }
}
bootstrap()
```

### Example of response:

```console
Possible ways to solve the problem:
Possible ways according to ai Bing microsoft:
There are various causes for database connection failures, such as incorrect database
information, firewall settings, corrupt database, or unresponsive database server.
Depending on the type of database you are using, you may need to troubleshoot different
issues.
Possible ways according to GitHub:
Go to the following link: https://github.com/search?q=database%20failed%20to%20connect&
type=issues
Possible ways according to Google:
Go to the following link: https://www.google.com/search?q=database%20failed%20to%20connect
Possible ways according to StackOverflow:
Go to the following link: https://stackoverflow.com/search?
q=database%20failed%20to%20connect
```

You can also use the services separately, namely: `BingAi`, `ChatGptAi`, `GitHubAi`, `GoogleAi` and `StackOverflowAi`. They have the same API and implement one interface - IAi.

```
import { BingAi } from "error-handler-ai"

const isDev = process.env.NODE_ENV === 'development'
const ai = new BingAi({
  cookie: process.env.BING_COOKIE!
})

async function bootstrap() {
  try {
    throw new Error('database failed to connect')
  } catch (error) {
    if (isDev) {
      const solution = await ai.catch(error)
      console.log(solution)
    }
  }
}

bootstrap()
```

**NOTE:** In order for you to be able to use `BingAi`, you must provide a `cookie` that you can receive in your Microsoft Edge browser:

- Open the Microsoft Edge browser;
- Go to the Microsoft Bing [chat page](https://www.bing.com/search?q=Bing+AI&showconv=1&FORM=hpcodx);
- Open the dev tools tab `ctrl + shift + I`;
- Open the Application tab;
- In Storage/Cookies/https://www.bing.com, find the cookie called `_U` and copy its value.

```
import { ChatGptAi } from "error-handler-ai"

const isDev = process.env.NODE_ENV === 'development'
const ai = new ChatGptAi({
  apiKey: process.env.CHAT_GPT_API_KEY!
})

async function bootstrap() {
  try {
    throw new Error('database failed to connect')
  } catch (error) {
    if (isDev) {
      const solution = await ai.catch(error)
      console.log(solution)
    }
  }
}

bootstrap()
```

**NOTE:** In order for you to be able to use `ChatGptAi`, you need to provide an `apiKey`, which you can get in your [OpenAI account](https://platform.openai.com/account/api-keys).

```
import { GitHubAi } from "error-handler-ai"

const isDev = process.env.NODE_ENV === 'development'
const ai = new GitHubAi()

async function bootstrap() {
  try {
    throw new Error('database failed to connect')
  } catch (error) {
    if (isDev) {
      const solution = await ai.catch(error)
      console.log(solution)
    }
  }
}

bootstrap()
```

```
import { GoogleAi } from "error-handler-ai"

const isDev = process.env.NODE_ENV === 'development'
const ai = new GoogleAi()

async function bootstrap() {
  try {
    throw new Error('database failed to connect')
  } catch (error) {
    if (isDev) {
      const solution = await ai.catch(error)
      console.log(solution)
    }
  }
}

bootstrap()
```

```
import { StackOverflowAi } from "error-handler-ai"

const isDev = process.env.NODE_ENV === 'development'
const ai = new StackOverflowAi()

async function bootstrap() {
  try {
    throw new Error('database failed to connect')
  } catch (error) {
    if (isDev) {
      const solution = await ai.catch(error)
      console.log(solution)
    }
  }
}

bootstrap()
```
