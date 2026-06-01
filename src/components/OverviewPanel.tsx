import { useState, useEffect } from 'react'
import './OverviewPanel.css'

const OverviewPanel = () => {
  const [items, setItems] = useState([
    { id: 1, label: '历史累计销售额', value: 382290, unit: '¥' },
    { id: 2, label: '历史累计销售量', value: 382290, unit: '' },
    { id: 3, label: '历史累计订单量', value: 520, unit: '单' },
    { id: 4, label: '历史累计销量', value: 680, unit: '万' },
    { id: 5, label: '产品库存总量', value: 80, unit: '万' },
    { id: 6, label: '客户总数', value: 10, unit: '万' },
    { id: 7, label: '店铺总数', value: 120, unit: '家' },
    { id: 8, label: '店铺总数', value: 120, unit: '家' },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setItems(prev => prev.map(item => ({
        ...item,
        value: item.value + Math.floor((Math.random() - 0.5) * item.value * 0.02)
      })))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const formatValue = (value: number) => {
    if (value >= 10000) {
      return (value / 10000).toFixed(1) + '万'
    }
    return value.toLocaleString()
  }

  return (
    <div className="overview-panel">
      <div className="panel-header">
        <h3 className="panel-title">平台数据概览</h3>
      </div>
      <div className="panel-content">
        {items.map((item, index) => (
          <div key={item.id} className={`overview-item ${index % 2 === 0 ? 'even' : 'odd'}`}>
            <span className="item-label">{item.label}</span>
            <span className="item-value">
              {item.unit === '¥' && '¥'}
              {formatValue(item.value)}
              {item.unit !== '¥' && item.unit}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OverviewPanel
