import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import { ChatContainer } from '@/components/chat/chat-container'
import { ChatInput } from '@/components/chat/chat-input'
import { SuggestionChips } from '@/components/chat/suggestion-chips'
import { Separator } from '@/components/ui/separator'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

const suggestions = [
  'Add expense',
  'Show my spending summary',
  'How much did I spend this month?',
  'What are my top spending categories?',
]

const initialMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content:
      "Hi! I'm Ole, your financial assistant. I can help you track expenses, get insights on your spending, and manage your finances. Just tell me what you need!",
  },
]

export default function OlePage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async (content: string) => {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
    }
    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    setTimeout(() => {
      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: getResponse(content),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col">
      <div className="flex items-center gap-2 pb-4">
        <div className="flex size-10 items-center justify-center rounded-full bg-primary">
          <Sparkles className="size-5 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">Ole</h2>
          <p className="text-sm text-muted-foreground">
            Your AI financial assistant
          </p>
        </div>
      </div>

      <Separator />

      <ChatContainer
        messages={messages}
        isLoading={isLoading}
        emptyState={
          <div className="text-center text-muted-foreground">
            <Sparkles className="mx-auto size-12 mb-4 opacity-50" />
            <p>Start a conversation with Ole</p>
          </div>
        }
      />

      <div className="space-y-3 pt-4">
        <SuggestionChips suggestions={suggestions} onSelect={handleSend} />
        <ChatInput
          onSend={handleSend}
          isLoading={isLoading}
          placeholder="Tell Ole about your expenses..."
        />
      </div>
    </div>
  )
}

function getResponse(input: string): string {
  const lower = input.toLowerCase()

  if (lower.includes('bought') || lower.includes('spent') || lower.includes('paid')) {
    const amountMatch = input.match(/\$?(\d+(?:\.\d{2})?)/)?.[1]
    if (amountMatch) {
      return `Got it! I've recorded an expense of $${amountMatch}. Would you like to categorize it or add any notes?`
    }
    return "I noticed you mentioned a purchase. Could you tell me the amount so I can record it?"
  }

  if (lower.includes('summary') || lower.includes('how much')) {
    return "Based on your transactions this month:\n\n- Total spending: $2,340\n- Biggest category: Groceries ($450)\n- You're within budget on most categories!\n\nWould you like more details on any specific category?"
  }

  if (lower.includes('top') && lower.includes('categor')) {
    return "Your top spending categories this month:\n\n1. Groceries - $450 (19%)\n2. Shopping - $200 (9%)\n3. Dining - $120 (5%)\n4. Entertainment - $95 (4%)\n5. Transport - $80 (3%)\n\nGroceries takes up the largest portion of your budget."
  }

  if (lower.includes('add expense')) {
    return "Sure! Tell me about your expense. For example:\n\n\"I just bought coffee for $5\"\n\"Spent $50 on groceries today\"\n\"Paid $120 for electric bill\""
  }

  return "I'm here to help with your finances! You can tell me about expenses you've made, ask for spending summaries, or get insights on your financial habits."
}
