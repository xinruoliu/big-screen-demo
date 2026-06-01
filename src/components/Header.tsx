import { useState, useEffect } from 'react'
import './Header.css'

type PageType = 'dashboard' | 'marketing' | 'customers' | 'products'

interface HeaderProps {
  currentPage: PageType
  onNavClick: (page: PageType) => void
}

const Header = ({ currentPage, onNavClick }: HeaderProps) => {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const navItems: { name: string; key: PageType }[] = [
    { name: '数据概览', key: 'dashboard' },
    { name: '营销管理', key: 'marketing' },
    { name: '客户分析', key: 'customers' },
    { name: '产品分析', key: 'products' },
  ]

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <div className="logo-icon"></div>
          <span className="logo-text">数字化营销数据分析平台</span>
        </div>
      </div>
      
      <nav className="header-nav">
        {navItems.map((item) => (
          <button
            key={item.key}
            className={`nav-item ${currentPage === item.key ? 'active' : ''}`}
            onClick={() => onNavClick(item.key)}
          >
            {item.name}
          </button>
        ))}
      </nav>

      <div className="header-right">
        <span className="data-date">
          数据截止: {currentTime.toLocaleDateString('zh-CN')}
        </span>
        <button className="header-btn">
          <span className="btn-icon"></span>
        </button>
      </div>
    </header>
  )
}

export default Header
