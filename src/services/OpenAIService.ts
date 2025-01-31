import OpenAI from "openai";

export class OpenAIService {
    private openAiApi;
    private moderationTypes: string[] = ['nightbot'];

    constructor() {
        this.openAiApi = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
            dangerouslyAllowBrowser: true
        });
    }

    async assistant(message: string, type: string): Promise<string | null> {
        const moderationType = this.moderationTypes.includes(type) ? type : null;
        if (!moderationType) {
            return null;
        }

        const completion = await this.openAiApi.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: `Usa comandos de ${moderationType} cuando te los pida, corrige typos, corrige errores ortográficos y responde únicamente con los comandos sin usar comillas cuando sea necesario` },
                { role: "assistant", content: message },
            ],
        });

        return completion.choices[0].message.content;
    }
}