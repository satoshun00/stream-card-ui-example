"use client"

import { useMemo, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { MonsterCard } from "@/components/monster-card"
import { DebugMessages } from "@/components/debug-messages"
import { motion, AnimatePresence } from "framer-motion"
import { experimental_useObject as useObject } from 'ai/react';
import { cardsSchema } from './api/cards/schema';

export default function CardDrawPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { object, submit, isLoading } = useObject({
    api: '/api/cards',
    schema: cardsSchema,
    onFinish: () => {
      setIsSubmitting(false)
    },
  });
  const [debugMessages, setDebugMessages] = useState<string[]>([])

  const addDebugMessage = (message: string) => {
    setDebugMessages(prev => [...prev, `[${new Date().toISOString()}] ${message}`])
  }

  const handleDraw = () => {
    setIsSubmitting(true);
    submit('');
  }

  useEffect(() => {
    if (object) {
      addDebugMessage(JSON.stringify(object));
    }
  }, [object]);

  const cards = useMemo(() => {
    // submit前は空の配列を返す
    if (!isSubmitting && !object?.cards) {
      return [];
    }
    const cards = object?.cards ?? [];
    // submit中はcardsが５個の配列になるようにする
    return cards.concat(Array(5 - cards.length).fill(null));
  }, [object?.cards, isSubmitting]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <Button
            size="lg"
            disabled={isLoading}
            onClick={handleDraw}
            className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            {isLoading ? "抽選中..." : "抽選する"}
          </Button>
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6 max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-xl font-bold text-gray-800 bg-white/80 py-3 px-6 rounded-lg shadow-md"
            >
              {!isSubmitting && !object?.concept ? '抽選するをクリックしてください！' : object?.concept}
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 justify-items-center">
              {cards.map((card, index) => (
                <motion.div
                  key={`${index}-${card ? 'loaded' : 'loading'}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * (card ? 1 : index) }}
                >
                  <MonsterCard card={card} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2">デバッグメッセージ</h2>
          <DebugMessages messages={debugMessages} />
        </div>
      </div>
    </div>
  )
}

