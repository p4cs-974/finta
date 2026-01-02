import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

export interface Budget {
  id: string
  category: string
  spent: number
  limit: number
  period: 'weekly' | 'monthly'
}

interface BudgetCardProps {
  budget: Budget
  onEdit?: (budget: Budget) => void
  onDelete?: (id: string) => void
}

export function BudgetCard({ budget, onEdit, onDelete }: BudgetCardProps) {
  const percentage = Math.min((budget.spent / budget.limit) * 100, 100)
  const isOverBudget = budget.spent > budget.limit
  const remaining = budget.limit - budget.spent

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{budget.category}</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="size-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit?.(budget)}>
              <Pencil className="mr-2 size-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete?.(budget.id)}
              className="text-red-600"
            >
              <Trash2 className="mr-2 size-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-baseline justify-between">
          <span className="text-2xl font-bold">${budget.spent.toFixed(0)}</span>
          <span className="text-sm text-muted-foreground">
            of ${budget.limit.toFixed(0)}
          </span>
        </div>
        <Progress
          value={percentage}
          className={cn(isOverBudget && '[&>div]:bg-red-500')}
        />
        <div className="flex items-center justify-between text-xs">
          <span
            className={cn(
              isOverBudget ? 'text-red-600' : 'text-muted-foreground'
            )}
          >
            {isOverBudget
              ? `$${Math.abs(remaining).toFixed(0)} over budget`
              : `$${remaining.toFixed(0)} remaining`}
          </span>
          <span className="text-muted-foreground capitalize">
            {budget.period}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
