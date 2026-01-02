import { cn } from '@/lib/utils'
import { Avatar } from '@/components/ui/avatar'
import { Sparkles, User } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

interface MessageBubbleProps {
  message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user'

  return (
    <div
      className={cn(
        'flex gap-3 max-w-[85%]',
        isUser ? 'ml-auto flex-row-reverse' : ''
      )}
    >
      <Avatar
        className={cn(
          'size-8 shrink-0 flex items-center justify-center',
          isUser ? 'bg-primary' : 'bg-muted'
        )}
      >
        {isUser ? (
          <User className="size-4 text-primary-foreground" />
        ) : (
          <Sparkles className="size-4" />
        )}
      </Avatar>
      <div
        className={cn(
          'rounded-lg px-4 py-2 text-sm',
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-foreground'
        )}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  )
}
