import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { BudgetCard, type Budget } from '@/components/budget-card'
import { BudgetForm } from '@/components/budget-form'

const mockBudgets: Budget[] = [
  { id: '1', category: 'Groceries', spent: 450, limit: 500, period: 'monthly' },
  { id: '2', category: 'Dining', spent: 120, limit: 200, period: 'monthly' },
  { id: '3', category: 'Transport', spent: 80, limit: 150, period: 'monthly' },
  {
    id: '4',
    category: 'Entertainment',
    spent: 95,
    limit: 100,
    period: 'monthly',
  },
  { id: '5', category: 'Shopping', spent: 200, limit: 300, period: 'monthly' },
]

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState<Budget[]>(mockBudgets)
  const [formOpen, setFormOpen] = useState(false)
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null)

  const handleAdd = (data: Omit<Budget, 'id' | 'spent'>) => {
    const newBudget: Budget = {
      ...data,
      id: crypto.randomUUID(),
      spent: 0,
    }
    setBudgets([...budgets, newBudget])
  }

  const handleEdit = (budget: Budget) => {
    setEditingBudget(budget)
    setFormOpen(true)
  }

  const handleUpdate = (data: Omit<Budget, 'id' | 'spent'>) => {
    if (!editingBudget) return
    setBudgets(
      budgets.map((b) =>
        b.id === editingBudget.id ? { ...b, ...data } : b
      )
    )
    setEditingBudget(null)
  }

  const handleDelete = (id: string) => {
    setBudgets(budgets.filter((b) => b.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Budgets</h2>
          <p className="text-muted-foreground">
            Track your spending against budget limits.
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingBudget(null)
            setFormOpen(true)
          }}
        >
          <Plus className="mr-2 size-4" />
          Add Budget
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {budgets.map((budget) => (
          <BudgetCard
            key={budget.id}
            budget={budget}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
        <Card
          className="flex cursor-pointer items-center justify-center border-dashed hover:bg-muted/50"
          onClick={() => {
            setEditingBudget(null)
            setFormOpen(true)
          }}
        >
          <CardContent className="flex flex-col items-center gap-2 py-8 text-muted-foreground">
            <Plus className="size-8" />
            <span className="text-sm">Add Budget</span>
          </CardContent>
        </Card>
      </div>

      <BudgetForm
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open)
          if (!open) setEditingBudget(null)
        }}
        onSubmit={editingBudget ? handleUpdate : handleAdd}
        defaultValues={editingBudget ?? undefined}
      />
    </div>
  )
}
