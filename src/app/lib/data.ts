import { z } from "zod"

export const cardSchema = z.object({
  name: z.string(),
  image: z.string().url(),
  hp: z.number(),
  color: z.enum(['red', 'blue', 'green', 'yellow']),
  move: z.object({
    name: z.string(),
    power: z.number().min(10).max(200),
  }),
  description: z.string(),
})

export type Card = z.infer<typeof cardSchema>

const sampleCards: Card[] = [
  {
    name: "ファイアドラゴン",
    image: "/placeholder.svg?height=200&width=200",
    hp: 120,
    color: "red",
    move: {
      name: "フレイムブレス",
      power: 150,
    },
    description: "炎を操る伝説の竜。その咆哮は大地を揺るがす。",
  },
  {
    name: "アクアサーペント",
    image: "/placeholder.svg?height=200&width=200",
    hp: 100,
    color: "blue",
    move: {
      name: "ハイドロスラッシュ",
      power: 130,
    },
    description: "深海に潜む水棲の蛇。その力は海流をも変える。",
  },
  {
    name: "フォレストエルフ",
    image: "/placeholder.svg?height=200&width=200",
    hp: 80,
    color: "green",
    move: {
      name: "ネイチャーフォース",
      power: 100,
    },
    description: "森の守護者。自然の力を操り敵を倒す。",
  },
  {
    name: "サンダーフェニックス",
    image: "/placeholder.svg?height=200&width=200",
    hp: 150,
    color: "yellow",
    move: {
      name: "ライトニングストライク",
      power: 180,
    },
    description: "雷を纏う不死鳥。その翼は稲妻の如く輝く。",
  },
  {
    name: "ブレイズウルフ",
    image: "/placeholder.svg?height=200&width=200",
    hp: 90,
    color: "red",
    move: {
      name: "バーニングファング",
      power: 120,
    },
    description: "炎の毛皮を持つ狼。その牙は鋼をも溶かす。",
  },
]

export function drawRandomCards(count: number): Card[] {
  const shuffled = [...sampleCards].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

export function generateConcept(cards: Card[]): string {
  const colors = cards.map(card => card.color)
  const uniqueColors = Array.from(new Set(colors))
  const colorCounts = uniqueColors.map(color => ({
    color,
    count: colors.filter(c => c === color).length
  }))
  
  colorCounts.sort((a, b) => b.count - a.count)
  
  const mainColor = colorCounts[0].color
  const secondaryColor = colorCounts[1]?.color

  const colorNames = {
    red: "炎",
    blue: "水",
    green: "自然",
    yellow: "雷"
  }

  if (secondaryColor) {
    return `${colorNames[mainColor]}と${colorNames[secondaryColor]}の力を併せ持つ、バランスの取れたチーム`
  } else {
    return `${colorNames[mainColor]}の力に特化した、強力なチーム`
  }
}

