import { openai } from '@ai-sdk/openai';
import { streamObject } from 'ai';
import { cardsSchema } from './schema';

export async function POST(req: Request): Promise<Response> {
  const body = await req.json() as { keyword: string };
  const result = streamObject({
    model: openai('gpt-4o-mini'),
    schema: cardsSchema,
    prompt:
      `## 指示
モンスターをランダムに5つ生成してください。
はじめに入力のキーワードにあったコンセプトを決めてから、それにあったモンスターを5つ生成します。
コンセプトはアドベンチャーゲームとして面白そうなコンセプトを考えてください。

## ルール
* モンスターは5体生成します
* 言語は必ず日本語で生成してください
* カードのimageフィールドには以下の画像URLを使用してください。
    * /images/daniel-vargas-c-ewKs54sw4-unsplash.jpg
    * /images/gene-taylor-JWlY4Z4_mCI-unsplash.jpg
    * /images/joel-herzog-ny_5l4QKBnE-unsplash.jpg
    * /images/team-mfina-1SHsDOlMuvI-unsplash.jpg
    * /images/tomas-malik-7PvyUeHp2ww-unsplash.jpg

## キーワード
${body.keyword}
`
  });

  return result.toTextStreamResponse();
}