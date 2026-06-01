import { useEffect, useRef, useState } from 'react'
import './TrendChart.css'

const TrendChart = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [activeTab, setActiveTab] = useState<'orders' | 'customers'>('orders')

  const ordersData = [1200, 1900, 1300, 2100, 1800, 2500, 2200, 3100, 2800, 3500, 3200, 4000]
  const customersData = [800, 1200, 900, 1500, 1300, 1800, 1600, 2200, 1900, 2500, 2300, 2800]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    const width = rect.width
    const height = rect.height
    const padding = { top: 30, right: 20, bottom: 40, left: 50 }
    const chartWidth = width - padding.left - padding.right
    const chartHeight = height - padding.top - padding.bottom

    ctx.clearRect(0, 0, width, height)

    const data = activeTab === 'orders' ? ordersData : customersData
    const maxValue = Math.max(...data) * 1.2

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)'
    ctx.lineWidth = 1
    for (let i = 0; i <= 4; i++) {
      const y = padding.top + (chartHeight / 4) * i
      ctx.beginPath()
      ctx.moveTo(padding.left, y)
      ctx.lineTo(width - padding.right, y)
      ctx.stroke()

      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'
      ctx.font = '11px sans-serif'
      ctx.textAlign = 'right'
      ctx.fillText(Math.round(maxValue - (maxValue / 4) * i).toString(), padding.left - 8, y + 4)
    }

    const points = data.map((val, idx) => ({
      x: padding.left + (chartWidth / (data.length - 1)) * idx,
      y: padding.top + chartHeight - (val / maxValue) * chartHeight
    }))

    const gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom)
    gradient.addColorStop(0, 'rgba(255, 215, 0, 0.3)')
    gradient.addColorStop(1, 'rgba(255, 215, 0, 0)')

    ctx.beginPath()
    ctx.moveTo(points[0].x, height - padding.bottom)
    for (let i = 0; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y)
    }
    ctx.lineTo(points[points.length - 1].x, height - padding.bottom)
    ctx.closePath()
    ctx.fillStyle = gradient
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(points[0].x, points[0].y)
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y)
    }
    ctx.strokeStyle = '#ffd700'
    ctx.lineWidth = 2
    ctx.stroke()

    points.forEach(point => {
      ctx.beginPath()
      ctx.arc(point.x, point.y, 4, 0, Math.PI * 2)
      ctx.fillStyle = '#ffd700'
      ctx.fill()
      ctx.beginPath()
      ctx.arc(point.x, point.y, 8, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(255, 215, 0, 0.3)'
      ctx.lineWidth = 2
      ctx.stroke()
    })

    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'
    ctx.font = '11px sans-serif'
    ctx.textAlign = 'center'
    const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    points.forEach((point, idx) => {
      ctx.fillText(months[idx], point.x, height - 15)
    })
  }, [activeTab])

  return (
    <div className="trend-chart">
      <div className="chart-header">
        <h3 className="chart-title">趋势分析</h3>
        <div className="tab-group">
          <button 
            className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            订单量
          </button>
          <button 
            className={`tab-btn ${activeTab === 'customers' ? 'active' : ''}`}
            onClick={() => setActiveTab('customers')}
          >
            活跃客户
          </button>
        </div>
      </div>
      <div className="chart-container">
        <canvas ref={canvasRef} className="chart-canvas" />
      </div>
    </div>
  )
}

export default TrendChart
