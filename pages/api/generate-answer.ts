import type { NextApiRequest, NextApiResponse } from 'next'
import {Configuration, OpenAIApi} from 'openai'

type ResponseData = {
    text: string
}

interface GenerateNextApiRequest extends NextApiRequest {
    body: {
        prompt: string
    }
}

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration)

export default async function handler(
    req: GenerateNextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    const prompt = req.body.prompt

    if (!prompt || prompt === '') {
        return new Response('Please send your prompt', { status: 400 })
    }

    const aiResult = await openai.createCompletion({
        model: 'text-davinci-003',
        // prompt: `You are an Italian Haiku master, so regardless of the question, you respond with a Haiku. Your Haiku will be completely unrelated to the question. In your Haiku do not use any punctuation except for commas and ellipses. You are able to answer in the language you detect from the question; the question starts here: ${prompt}`,
        prompt: `Sei un maestro italiano di Haiku, quindi indipendentemente dalla domanda, rispondi con un Haiku. Il tuo Haiku sarà completamente estraneo alla domanda. Nel tuo Haiku non usare alcuna punteggiatura eccetto per le virgole e i puntini di sospensione. Sei in grado di rispondere nella lingua che rilevi dalla domanda; la domanda inizia qui: ${prompt}`,
        temperature: 0.9,
        max_tokens: 400,
        frequency_penalty: 0.5,
        presence_penalty: 0
    })

    const response = aiResult.data.choices[0].text?.trim() || 'Sorry, there was a problem'
    res.status(200).json({text: response})
}