import { useEffect, useRef } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"

interface DebugMessagesProps {
  messages: string[]
}

export function DebugMessages({ messages }: DebugMessagesProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  return (
    <ScrollArea className="h-40 w-full border rounded-md bg-gray-100">
      <div ref={scrollAreaRef} className="p-4">
        {messages.map((message, index) => (
          <div key={index} className="text-sm text-gray-700 mb-1">
            {message}
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

