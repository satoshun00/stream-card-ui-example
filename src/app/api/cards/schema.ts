import type { PartialDeep } from 'type-fest';
import { z } from 'zod';
export const cardSchema = z.object({
    name: z.string().describe('モンスターの名前'),
    image: z.string().describe('モンスターの画像URL'),
    hp: z.number().min(10).max(200).describe('モンスターのHP'),
    color: z.enum(['red', 'blue', 'green', 'yellow']).describe('モンスターの属性'),
    move: z.object({
        name: z.string().describe('技の名前'),
        power: z.number().min(10).max(200).describe('技の威力'),
    }).describe('モンスターの技'),
    description: z.string().describe('モンスターの説明'),
}).describe('モンスターのカード');

export const cardsSchema = z.object({
    concept: z.string().describe('生成されたカードのコンセプト'),
    cards: z.array(cardSchema).min(5).max(5),
}).describe('モンスターカードのリスト');

export type Card = z.infer<typeof cardSchema>;
export type OptionalCard = PartialDeep<Card>;
