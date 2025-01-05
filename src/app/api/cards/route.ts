import { openai } from '@ai-sdk/openai';
import { streamObject } from 'ai';
import { cardsSchema } from './schema';

export async function POST() {

  const result = streamObject({
    model: openai('gpt-4-turbo'),
    schema: cardsSchema,
    prompt:
      `## 指示
モンスターをランダムに5つ生成し、コンセプトを出力してください。

## ルール
* モンスターは5体生成します
* 言語は必ず日本語で生成してください
* カードのimageフィールドには以下の画像URLを使用してください
    * /images/daniel-vargas-c-ewKs54sw4-unsplash.jpg
    * /images/gene-taylor-JWlY4Z4_mCI-unsplash.jpg
    * /images/joel-herzog-ny_5l4QKBnE-unsplash.jpg
    * /images/team-mfina-1SHsDOlMuvI-unsplash.jpg
    * /images/tomas-malik-7PvyUeHp2ww-unsplash.jpg
`
  });

  return result.toTextStreamResponse();
}