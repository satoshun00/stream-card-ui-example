import Image from "next/image"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { type OptionalCard } from "../api/cards/schema";
import { CardSkeleton, NameSkeleton, HPSkeleton, ImageSkeleton, MoveNameSkeleton, MovePowerSkeleton, DescriptionSkeleton } from "./card-skeletons";

const colorStyles = {
  red: "bg-gradient-to-br from-red-100 to-red-200 border-red-300",
  blue: "bg-gradient-to-br from-blue-100 to-blue-200 border-blue-300",
  green: "bg-gradient-to-br from-green-100 to-green-200 border-green-300",
  yellow: "bg-gradient-to-br from-yellow-100 to-yellow-200 border-yellow-300",
}

function isValidImageUrl(url?: string): url is string {
  return typeof url === "string" && /\.(jpeg|jpg|gif|png)$/.test(url)
}

export function MonsterCard({ card }: { card?: OptionalCard }) {
  if (!card) {
    return <CardSkeleton />
  }

  return (
    <Card className={cn(
      "w-64 p-3 transition-transform hover:scale-105",
      card?.color && colorStyles[card.color]
    )}>
      <div className="flex justify-between items-center mb-2">
        {card?.name ? <h3 className="text-lg font-bold">{card.name}</h3> : <NameSkeleton />}
        {card?.hp ? <span className="font-semibold">HP {card.hp}</span> : <HPSkeleton />}
      </div>
      <div className="relative aspect-square mb-3 bg-white rounded-lg overflow-hidden">
        {isValidImageUrl(card?.image) ? <Image
          src={card.image}
          alt={card?.name ?? ''}
          width={200}
          height={200}
          className="w-full h-full object-cover"
        /> : <ImageSkeleton />}
      </div>
      <div className="bg-white/80 rounded-lg p-3 mb-2">
        <div className="flex justify-between items-center mb-1">
          {card?.move?.name ? <span className="font-bold">{card.move.name}</span> : <MoveNameSkeleton />}
          {card?.move?.power ? <span className="text-sm">威力: {card.move.power}</span> : <MovePowerSkeleton />}
        </div>
      </div>
      {card?.description ? <p className="text-sm text-gray-700 bg-white/80 rounded-lg p-2">{card.description}</p> : <DescriptionSkeleton />}
    </Card>
  )
}

