import { useState, useEffect } from 'react'
import './ProductTop3.css'

const ProductTop3 = () => {
  const [products, setProducts] = useState([
    { id: 1, name: '产品A', sales: 4500, percentage: 35, color: '#ffd700' },
    { id: 2, name: '产品B', sales: 3455, percentage: 27, color: '#00d4ff' },
    { id: 3, name: '产品C', sales: 4500, percentage: 38, color: '#7c3aed' },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setProducts(prev => prev.map(item => ({
        ...item,
        sales: item.sales + Math.floor((Math.random() - 0.5) * 100)
      })))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const maxSales = Math.max(...products.map(p => p.sales))

  return (
    <div className="product-top3">
      <div className="panel-header">
        <h3 className="panel-title">产品销售额TOP3</h3>
        <div className="legend">
          <span className="legend-item">
            <span className="legend-dot" style={{ background: '#ffd700' }}></span>
            <span>销量</span>
          </span>
          <span className="legend-item">
            <span className="legend-dot" style={{ background: '#00d4ff' }}></span>
            <span>销售额</span>
          </span>
        </div>
      </div>
      
      <div className="panel-content">
        <div className="product-ring">
          <div className="ring-center">
            <div className="center-value">¥{products[0]?.sales.toLocaleString()}</div>
            <div className="center-label">产品A</div>
          </div>
          
          <svg className="ring-svg" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="8"
            />
            {products.map((product, index) => {
              const startAngle = (index / products.length) * Math.PI * 2 - Math.PI / 2
              const endAngle = ((index + 1) / products.length) * Math.PI * 2 - Math.PI / 2
              const largeArcFlag = (endAngle - startAngle) > Math.PI ? 1 : 0
              
              return (
                <circle
                  key={product.id}
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke={product.color}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${((product.percentage / 100) * Math.PI * 80)} 251.2`}
                  transform={`rotate(${(startAngle + Math.PI / 2) * (180 / Math.PI)} 50 50)`}
                  className="ring-segment"
                />
              )
            })}
          </svg>
        </div>

        <div className="product-list">
          {products.map((product, index) => (
            <div key={product.id} className="product-item">
              <span className="product-rank">{index + 1}</span>
              <div className="product-info">
                <span className="product-name">{product.name}</span>
                <div className="product-bar-wrapper">
                  <div 
                    className="product-bar" 
                    style={{ 
                      width: `${(product.sales / maxSales) * 100}%`,
                      background: product.color 
                    }}
                  ></div>
                </div>
              </div>
              <span className="product-sales">¥{product.sales.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductTop3
