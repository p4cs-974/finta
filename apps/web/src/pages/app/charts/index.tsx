import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SpendingByCategory } from '@/components/chart-spending'
import { MonthlyTrend } from '@/components/chart-trend'
import { DailySpending } from '@/components/chart-daily'

const spendingByCategory = [
  { name: 'Groceries', value: 450, color: 'hsl(142, 76%, 36%)' },
  { name: 'Dining', value: 120, color: 'hsl(25, 95%, 53%)' },
  { name: 'Transport', value: 80, color: 'hsl(199, 89%, 48%)' },
  { name: 'Entertainment', value: 95, color: 'hsl(280, 65%, 60%)' },
  { name: 'Shopping', value: 200, color: 'hsl(340, 75%, 55%)' },
]

const monthlyTrend = [
  { month: 'Jul', income: 4200, expenses: 2800 },
  { month: 'Aug', income: 4500, expenses: 3100 },
  { month: 'Sep', income: 4300, expenses: 2900 },
  { month: 'Oct', income: 4800, expenses: 3200 },
  { month: 'Nov', income: 4600, expenses: 2700 },
  { month: 'Dec', income: 5100, expenses: 3500 },
]

const dailySpending = [
  { day: 'Dec 19', amount: 45 },
  { day: 'Dec 20', amount: 120 },
  { day: 'Dec 21', amount: 30 },
  { day: 'Dec 22', amount: 85 },
  { day: 'Dec 23', amount: 12 },
  { day: 'Dec 24', amount: 200 },
  { day: 'Dec 25', amount: 0 },
  { day: 'Dec 26', amount: 62 },
  { day: 'Dec 27', amount: 45 },
  { day: 'Dec 28', amount: 16 },
  { day: 'Dec 29', amount: 95 },
  { day: 'Dec 30', amount: 40 },
  { day: 'Dec 31', amount: 180 },
  { day: 'Jan 1', amount: 35 },
]

export default function ChartsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">Charts</h2>
        <p className="text-muted-foreground">Visualize your financial data.</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="category">By Category</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <SpendingByCategory data={spendingByCategory} />
            <MonthlyTrend data={monthlyTrend} />
          </div>
          <DailySpending data={dailySpending} />
        </TabsContent>

        <TabsContent value="category">
          <SpendingByCategory data={spendingByCategory} />
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <MonthlyTrend data={monthlyTrend} />
          <DailySpending data={dailySpending} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
