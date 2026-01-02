import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

interface Budget {
  id: string
  category: string
  spent: number
  limit: number
}

interface BudgetProgressProps {
  budgets: Budget[]
}

export function BudgetProgress({ budgets }: BudgetProgressProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Overview</CardTitle>
      </CardHeader>
      <CardContent>
        {budgets.length === 0 ? (
          <p className="text-sm text-muted-foreground">No budgets set yet.</p>
        ) : (
          <div className="space-y-4">
            {budgets.map((budget) => {
              const percentage = Math.min(
                (budget.spent / budget.limit) * 100,
                100
              )
              const isOverBudget = budget.spent > budget.limit
              return (
                <div key={budget.id} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{budget.category}</span>
                    <span className="text-muted-foreground">
                      ${budget.spent.toFixed(0)} / ${budget.limit.toFixed(0)}
                    </span>
                  </div>
                  <Progress
                    value={percentage}
                    className={isOverBudget ? '[&>div]:bg-red-500' : ''}
                  />
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
