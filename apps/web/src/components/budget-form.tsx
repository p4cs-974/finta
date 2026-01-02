import { useForm } from '@tanstack/react-form'
import { zodValidator } from '@tanstack/zod-form-adapter'
import { z } from 'zod/v4'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

const budgetSchema = z.object({
  category: z.string().min(1, 'Category is required'),
  limit: z.number().positive('Limit must be positive'),
  period: z.enum(['weekly', 'monthly']),
})

type BudgetFormData = z.infer<typeof budgetSchema>

const categories = [
  'Groceries',
  'Dining',
  'Transport',
  'Entertainment',
  'Shopping',
  'Utilities',
  'Health',
  'Other',
]

interface BudgetFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: BudgetFormData) => void
  defaultValues?: Partial<BudgetFormData>
}

export function BudgetForm({
  open,
  onOpenChange,
  onSubmit,
  defaultValues,
}: BudgetFormProps) {
  const form = useForm({
    defaultValues: {
      category: defaultValues?.category ?? '',
      limit: defaultValues?.limit ?? 0,
      period: defaultValues?.period ?? ('monthly' as const),
    },
    onSubmit: async ({ value }) => {
      onSubmit(value)
      onOpenChange(false)
    },
    validatorAdapter: zodValidator(),
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {defaultValues ? 'Edit Budget' : 'Add Budget'}
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
          className="space-y-4"
        >
          <form.Field
            name="category"
            validators={{ onChange: budgetSchema.shape.category }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={field.state.value}
                  onValueChange={field.handleChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {field.state.meta.errors?.[0] && (
                  <p className="text-sm text-red-500">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field
            name="limit"
            validators={{ onChange: budgetSchema.shape.limit }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="limit">Budget Limit</Label>
                <Input
                  id="limit"
                  type="number"
                  step="1"
                  min="0"
                  value={field.state.value || ''}
                  onChange={(e) =>
                    field.handleChange(parseFloat(e.target.value) || 0)
                  }
                  onBlur={field.handleBlur}
                  placeholder="500"
                />
                {field.state.meta.errors?.[0] && (
                  <p className="text-sm text-red-500">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field
            name="period"
            validators={{ onChange: budgetSchema.shape.period }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label>Period</Label>
                <Select
                  value={field.state.value}
                  onValueChange={(value: 'weekly' | 'monthly') =>
                    field.handleChange(value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </form.Field>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <form.Subscribe selector={(state) => state.isSubmitting}>
              {(isSubmitting) => (
                <Button type="submit" disabled={isSubmitting}>
                  {defaultValues ? 'Save Changes' : 'Add Budget'}
                </Button>
              )}
            </form.Subscribe>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
