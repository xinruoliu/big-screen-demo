import { useState } from 'react'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import MarketingPage from './components/MarketingPage'

type PageType = 'dashboard' | 'marketing' | 'customers' | 'products'

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard')

  const handleNavClick = (page: PageType) => {
    setCurrentPage(page)
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={(page) => setCurrentPage(page as PageType)} />
      case 'marketing':
        return <MarketingPage />
      case 'customers':
        return <div className="placeholder-page">客户分析页面</div>
      case 'products':
        return <div className="placeholder-page">产品分析页面</div>
      default:
        return <Dashboard onNavigate={(page) => setCurrentPage(page as PageType)} />
    }
  }

  return (
    <div className="app">
      <Header currentPage={currentPage} onNavClick={handleNavClick} />
      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  )
}

export default App
