/**
 * NVIDIA (OpenAI-compatible) fallback transport. Used only when Gemini fails.
 * Plain fetch, no SDK, same reasoning as gemini.provider.ts.
 */
import { env } from "../../config/env.js";

const NVIDIA_BASE = "https://integrate.api.nvidia.com/v1";

interface NvidiaResponse {
    choices?: Array<{ message?: { content?: string | null } }>;
    usage?: { prompt_tokens?: number; completion_tokens?: number; total_tokens?: number };
}

export interface NvidiaCall {
    model: string;
    prompt: string;
    system?: string;
    temperature?: number;
    maxOutputTokens?: number;
    json?: boolean;
    timeoutMs: number;
}

export function isNvidiaConfigured(): boolean {
    return Boolean(env.NVIDIA_API_KEY);
}

export function getNvidiaModels(): string[] {
    const fallbacks = (env.NVIDIA_MODEL_FALLBACKS ?? "").split(",").map((s) => s.trim()).filter(Boolean);
    return [env.NVIDIA_MODEL, ...fallbacks.filter((m) => m !== env.NVIDIA_MODEL)];
}

export async function callNvidia(call: NvidiaCall): Promise<{ text: string; usage: NvidiaResponse["usage"]; }> {
    const res = await fetch(`${NVIDIA_BASE}/chat/completions`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${env.NVIDIA_API_KEY}` },
        body: JSON.stringify({
            model: call.model,
            messages: [
                ...(call.system ? [{ role: "system", content: call.system }] : []),
                { role: "user", content: call.prompt },
            ],
            temperature: call.temperature ?? 0.7,
            ...(call.maxOutputTokens ? { max_tokens: call.maxOutputTokens } : {}),
            ...(call.json ? { response_format: { type: "json_object" } } : {}),
        }),
        signal: AbortSignal.timeout(call.timeoutMs),
    });
    if (!res.ok) {
        throw new Error(`NVIDIA responded ${res.status}: ${(await res.text()).slice(0, 300)}`);
    }
    const data = (await res.json()) as NvidiaResponse;
    const text = data.choices?.[0]?.message?.content;
    if (!text?.trim()) throw new Error("NVIDIA returned an empty response");
    return { text, usage: data.usage };
}
