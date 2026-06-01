import { useState, useEffect } from 'react'
import './RankingPanel.css'

const RankingPanel = () => {
  const [ranking, setRanking] = useState([
    { id: 1, name: '公司F', value: 48645, percentage: 100 },
    { id: 2, name: '公司C', value: 48445, percentage: 99.6 },
    { id: 3, name: '公司A', value: 45899, percentage: 94.3 },
    { id: 4, name: '公司E', value: 44856, percentage: 92.2 },
    { id: 5, name: '公司D', value: 44458, percentage: 91.4 },
    { id: 6, name: '公司B', value: 44407, percentage: 91.3 },
    { id: 7, name: '公司F', value: 42830, percentage: 88.0 },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setRanking(prev => prev.map(item => ({
        ...item,
        value: item.value + Math.floor((Math.random() - 0.5) * 100)
      })).sort((a, b) => b.value - a.value))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const maxValue = ranking[0]?.value || 1

  return (
    <div className="ranking-panel">
      <div className="panel-header">
        <h3 className="panel-title">子公司销售排名</h3>
      </div>
      <div className="panel-content">
        {ranking.map((item, index) => (
          <div key={item.id} className={`ranking-item ${index < 3 ? 'top' : ''}`}>
            <span className={`rank-badge ${index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : ''}`}>
              {index + 1}
            </span>
            <span className="item-name">{item.name}</span>
            <div className="progress-wrapper">
              <div 
                className="progress-fill" 
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              ></div>
            </div>
            <span className="item-value">{item.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RankingPanel
