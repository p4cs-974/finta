import { Wallet, TrendingDown, TrendingUp } from 'lucide-react'
import { StatCard } from '@/components/stat-card'
import { RecentTransactions } from '@/components/recent-transactions'
import { BudgetProgress } from '@/components/budget-progress'

const mockTransactions = [
  {
    id: '1',
    description: 'Grocery Store',
    amount: 85.5,
    category: 'Groceries',
    date: 'Today',
    type: 'expense' as const,
  },
  {
    id: '2',
    description: 'Salary Deposit',
    amount: 3500,
    category: 'Income',
    date: 'Yesterday',
    type: 'income' as const,
  },
  {
    id: '3',
    description: 'Netflix Subscription',
    amount: 15.99,
    category: 'Entertainment',
    date: 'Dec 28',
    type: 'expense' as const,
  },
  {
    id: '4',
    description: 'Gas Station',
    amount: 45.0,
    category: 'Transport',
    date: 'Dec 27',
    type: 'expense' as const,
  },
  {
    id: '5',
    description: 'Restaurant',
    amount: 62.3,
    category: 'Dining',
    date: 'Dec 26',
    type: 'expense' as const,
  },
]

const mockBudgets = [
  { id: '1', category: 'Groceries', spent: 450, limit: 500 },
  { id: '2', category: 'Dining', spent: 120, limit: 200 },
  { id: '3', category: 'Transport', spent: 80, limit: 150 },
]

export default function AppDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="Total Balance"
          value="$12,450.00"
          trend={{ value: 12, isPositive: true }}
          description="from last month"
          icon={<Wallet className="size-4 text-muted-foreground" />}
        />
        <StatCard
          title="Monthly Spending"
          value="$2,340.00"
          trend={{ value: 8, isPositive: false }}
          description="from last month"
          icon={<TrendingDown className="size-4 text-muted-foreground" />}
        />
        <StatCard
          title="Monthly Income"
          value="$4,500.00"
          trend={{ value: 5, isPositive: true }}
          description="from last month"
          icon={<TrendingUp className="size-4 text-muted-foreground" />}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <RecentTransactions transactions={mockTransactions} />
        <BudgetProgress budgets={mockBudgets} />
      </div>
    </div>
  )
}
