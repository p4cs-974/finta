import { useRef, useEffect, type ReactNode } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MessageBubble } from './message-bubble'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

interface ChatContainerProps {
  messages: Message[]
  isLoading?: boolean
  emptyState?: ReactNode
}

export function ChatContainer({
  messages,
  isLoading,
  emptyState,
}: ChatContainerProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  if (messages.length === 0 && emptyState) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        {emptyState}
      </div>
    )
  }

  return (
    <ScrollArea className="flex-1" ref={scrollRef}>
      <div className="flex flex-col gap-4 p-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isLoading && (
          <div className="flex gap-3 max-w-[85%]">
            <div className="size-8 shrink-0 rounded-full bg-muted flex items-center justify-center">
              <span className="animate-pulse">...</span>
            </div>
            <div className="rounded-lg px-4 py-2 text-sm bg-muted">
              <span className="animate-pulse">Thinking...</span>
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  )
}
