import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  TransactionsTable,
  type Transaction,
} from '@/components/transactions-table'
import { TransactionForm } from '@/components/transaction-form'

const mockTransactions: Transaction[] = [
  {
    id: '1',
    description: 'Grocery Store',
    amount: 85.5,
    category: 'Groceries',
    date: '2025-01-02',
    type: 'expense',
  },
  {
    id: '2',
    description: 'Salary Deposit',
    amount: 3500,
    category: 'Income',
    date: '2025-01-01',
    type: 'income',
  },
  {
    id: '3',
    description: 'Netflix Subscription',
    amount: 15.99,
    category: 'Entertainment',
    date: '2024-12-28',
    type: 'expense',
  },
  {
    id: '4',
    description: 'Gas Station',
    amount: 45.0,
    category: 'Transport',
    date: '2024-12-27',
    type: 'expense',
  },
  {
    id: '5',
    description: 'Restaurant',
    amount: 62.3,
    category: 'Dining',
    date: '2024-12-26',
    type: 'expense',
  },
  {
    id: '6',
    description: 'Electric Bill',
    amount: 120.0,
    category: 'Utilities',
    date: '2024-12-25',
    type: 'expense',
  },
  {
    id: '7',
    description: 'Freelance Payment',
    amount: 800.0,
    category: 'Income',
    date: '2024-12-24',
    type: 'income',
  },
  {
    id: '8',
    description: 'Coffee Shop',
    amount: 12.5,
    category: 'Dining',
    date: '2024-12-23',
    type: 'expense',
  },
]

export default function TransactionsPage() {
  const [transactions, setTransactions] =
    useState<Transaction[]>(mockTransactions)
  const [formOpen, setFormOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null)

  const handleAdd = (data: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...data,
      id: crypto.randomUUID(),
    }
    setTransactions([newTransaction, ...transactions])
  }

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction)
    setFormOpen(true)
  }

  const handleUpdate = (data: Omit<Transaction, 'id'>) => {
    if (!editingTransaction) return
    setTransactions(
      transactions.map((t) =>
        t.id === editingTransaction.id ? { ...data, id: t.id } : t
      )
    )
    setEditingTransaction(null)
  }

  const handleDelete = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Transactions</h2>
          <p className="text-muted-foreground">
            View and manage your transactions.
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingTransaction(null)
            setFormOpen(true)
          }}
        >
          <Plus className="mr-2 size-4" />
          Add Transaction
        </Button>
      </div>

      <TransactionsTable
        data={transactions}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <TransactionForm
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open)
          if (!open) setEditingTransaction(null)
        }}
        onSubmit={editingTransaction ? handleUpdate : handleAdd}
        defaultValues={editingTransaction ?? undefined}
      />
    </div>
  )
}
