import OverviewPanel from './OverviewPanel'
import SalesCard from './SalesCard'
import RankingPanel from './RankingPanel'
import TrendChart from './TrendChart'
import ProductTop3 from './ProductTop3'
import './Dashboard.css'

interface DashboardProps {
  onNavigate: (page: string) => void
}

const Dashboard = ({ onNavigate }: DashboardProps) => {
  return (
    <div className="dashboard">
      <main className="dashboard-content">
        <div className="left-panel">
          <OverviewPanel />
          <TrendChart />
        </div>
        <div className="center-panel">
          <SalesCard type="year" />
          <SalesCard type="month" />
        </div>
        <div className="right-panel">
          <RankingPanel />
          <ProductTop3 />
          <button className="navigate-btn" onClick={() => onNavigate('marketing')}>
            📊 查看营销管理
          </button>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
