import { useState, useEffect } from 'react'
import './SalesCard.css'

interface SalesCardProps {
  type: 'year' | 'month'
}

const SalesCard = ({ type }: SalesCardProps) => {
  const [value, setValue] = useState(type === 'year' ? 269400000 : 23580000)
  const [targetValue, setTargetValue] = useState(value)

  useEffect(() => {
    const interval = setInterval(() => {
      setTargetValue(prev => {
        const change = (Math.random() - 0.5) * prev * 0.01
        return Math.max(prev + change, prev * 0.98)
      })
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const duration = 1000
    const steps = 60
    const increment = (targetValue - value) / steps
    let current = value
    let step = 0

    const timer = setInterval(() => {
      step++
      current += increment
      if (step >= steps) {
        setValue(targetValue)
        clearInterval(timer)
      } else {
        setValue(current)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [targetValue])

  const formatCurrency = (val: number) => {
    return val.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  const data = type === 'year' 
    ? {
        title: '年度销售额',
        ratio: 96.8,
        items: [
          { label: '年订单量', value: 324218, unit: '单', mom: 1.5, yoy: 1.5 },
          { label: '年销量', value: 447524, unit: '件', mom: -5.5, yoy: 1.5 },
          { label: '年活跃客户数', value: 303, unit: '人', mom: 1.5, yoy: 1.5 },
        ]
      }
    : {
        title: '月度销售额',
        ratio: 98.5,
        items: [
          { label: '月订单量', value: 26850, unit: '单', mom: 3.5, yoy: 1.5 },
          { label: '月销量', value: 37242, unit: '件', mom: 5.5, yoy: 3.5 },
          { label: '月活跃客户数', value: 300, unit: '人', mom: 7.2, yoy: 3.5 },
        ]
      }

  return (
    <div className="sales-card">
      <div className="card-header">
        <div className="ratio-badge">
          <span>同比: 8.6%</span>
        </div>
        <h3 className="card-title">{data.title}</h3>
        <div className="ratio-badge right">
          <span>同比: 8.6%</span>
        </div>
      </div>
      
      <div className="card-main">
        <div className="main-value">
          <span className="currency-symbol">¥</span>
          <span className="value-number">{formatCurrency(value)}</span>
        </div>
      </div>

      <div className="progress-section">
        <div className="progress-label">
          <span>年度目标完成率</span>
          <span>{data.ratio}%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${data.ratio}%` }}></div>
          <div className="progress-glow" style={{ left: `${data.ratio}%` }}></div>
        </div>
      </div>

      <div className="stats-grid">
        {data.items.map((item, index) => (
          <div key={index} className="stat-item">
            <div className="stat-icon">
              {index === 0 && <span>📋</span>}
              {index === 1 && <span>📦</span>}
              {index === 2 && <span>👥</span>}
            </div>
            <div className="stat-info">
              <div className="stat-value">
                {item.value.toLocaleString()}
                <span className="stat-unit">{item.unit}</span>
              </div>
              <div className="stat-label">{item.label}</div>
            </div>
            <div className="stat-changes">
              <span className={`change ${item.mom >= 0 ? 'up' : 'down'}`}>
                环比 {item.mom >= 0 ? '+' : ''}{item.mom}%
              </span>
              <span className={`change ${item.yoy >= 0 ? 'up' : 'down'}`}>
                同比 {item.yoy >= 0 ? '+' : ''}{item.yoy}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SalesCard
