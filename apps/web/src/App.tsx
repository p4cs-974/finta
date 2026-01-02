import { Routes, Route } from 'react-router-dom'
import LandingPage from '@/pages/landing'
import AppLayout from '@/pages/app/layout'
import AppDashboard from '@/pages/app'
import TransactionsPage from '@/pages/app/transactions'
import BudgetsPage from '@/pages/app/budgets'
import ChartsPage from '@/pages/app/charts'
import OlePage from '@/pages/app/ole'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/app" element={<AppLayout />}>
        <Route index element={<AppDashboard />} />
        <Route path="transactions" element={<TransactionsPage />} />
        <Route path="budgets" element={<BudgetsPage />} />
        <Route path="charts" element={<ChartsPage />} />
        <Route path="ole" element={<OlePage />} />
      </Route>
    </Routes>
  )
}

export default App
