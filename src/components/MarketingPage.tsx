import { useState } from 'react'
import './MarketingPage.css'

const MarketingPage = () => {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', name: '营销概览' },
    { id: 'campaigns', name: '营销活动' },
    { id: 'channels', name: '渠道管理' },
    { id: 'reports', name: '效果报表' },
  ]

  const campaignData = [
    { id: 1, name: '618大促活动', status: '进行中', budget: '¥50万', clicks: 125800, conversions: 3256 },
    { id: 2, name: '新品发布推广', status: '进行中', budget: '¥30万', clicks: 89500, conversions: 2156 },
    { id: 3, name: '会员日活动', status: '已结束', budget: '¥20万', clicks: 65300, conversions: 1890 },
    { id: 4, name: '双11预热', status: '待开始', budget: '¥80万', clicks: 0, conversions: 0 },
  ]

  const channelData = [
    { name: '微信公众号', reach: 1250000, engagement: 85600, conversion: 2356 },
    { name: '抖音', reach: 2350000, engagement: 156800, conversion: 4520 },
    { name: '微博', reach: 890000, engagement: 45200, conversion: 1258 },
    { name: '小红书', reach: 680000, engagement: 78500, conversion: 2156 },
    { name: 'B站', reach: 450000, engagement: 35600, conversion: 890 },
  ]

  const stats = [
    { label: '本月营销投入', value: '¥285万', change: '+12.5%' },
    { label: '触达用户', value: '568万', change: '+8.3%' },
    { label: '转化率', value: '3.2%', change: '+0.5%' },
    { label: 'ROI', value: '4.8', change: '+0.3' },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="tab-content">
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-label">{stat.label}</div>
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-change up">{stat.change}</div>
                </div>
              ))}
            </div>
            <div className="charts-row">
              <div className="chart-card">
                <h4>营销费用分布</h4>
                <div className="pie-chart">
                  <svg viewBox="0 0 100 100" className="pie-svg">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#333" strokeWidth="20" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#ffd700" strokeWidth="20" strokeDasharray="126 251" transform="rotate(-90 50 50)" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#00d4ff" strokeWidth="20" strokeDasharray="75 251" transform="rotate(65 50 50)" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#7c3aed" strokeWidth="20" strokeDasharray="50 251" transform="rotate(160 50 50)" />
                  </svg>
                  <div className="pie-legend">
                    <span><span className="dot gold"></span> 搜索广告 50%</span>
                    <span><span className="dot blue"></span> 社交媒体 30%</span>
                    <span><span className="dot purple"></span> 其他 20%</span>
                  </div>
                </div>
              </div>
              <div className="chart-card">
                <h4>渠道效果对比</h4>
                <div className="bar-chart">
                  {channelData.slice(0, 4).map((channel, index) => (
                    <div key={index} className="bar-item">
                      <span className="bar-label">{channel.name}</span>
                      <div className="bar-wrapper">
                        <div className="bar-fill" style={{ height: `${(channel.conversion / 4520) * 100}%` }}></div>
                      </div>
                      <span className="bar-value">{channel.conversion.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      case 'campaigns':
        return (
          <div className="tab-content">
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>活动名称</th>
                    <th>状态</th>
                    <th>预算</th>
                    <th>点击量</th>
                    <th>转化数</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {campaignData.map(campaign => (
                    <tr key={campaign.id}>
                      <td>{campaign.name}</td>
                      <td><span className={`status-badge ${campaign.status === '进行中' ? 'active' : campaign.status === '待开始' ? 'pending' : 'completed'}`}>
                        {campaign.status}
                      </span></td>
                      <td>{campaign.budget}</td>
                      <td>{campaign.clicks.toLocaleString()}</td>
                      <td>{campaign.conversions.toLocaleString()}</td>
                      <td><button className="action-btn">详情</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      case 'channels':
        return (
          <div className="tab-content">
            <div className="channel-grid">
              {channelData.map((channel, index) => (
                <div key={index} className="channel-card">
                  <div className="channel-icon">📢</div>
                  <div className="channel-info">
                    <div className="channel-name">{channel.name}</div>
                    <div className="channel-stats">
                      <span>触达: {channel.reach.toLocaleString()}</span>
                      <span>互动: {channel.engagement.toLocaleString()}</span>
                      <span>转化: {channel.conversion.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="channel-progress">
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${(channel.conversion / 4520) * 100}%` }}></div>
                    </div>
                    <span className="progress-text">{((channel.conversion / channel.reach) * 100).toFixed(2)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      case 'reports':
        return (
          <div className="tab-content">
            <div className="report-section">
              <h4>营销效果汇总</h4>
              <div className="report-grid">
                <div className="report-item">
                  <div className="report-value">¥1,368万</div>
                  <div className="report-label">总销售额</div>
                </div>
                <div className="report-item">
                  <div className="report-value">28.5%</div>
                  <div className="report-label">营销贡献占比</div>
                </div>
                <div className="report-item">
                  <div className="report-value">4.8</div>
                  <div className="report-label">平均ROI</div>
                </div>
                <div className="report-item">
                  <div className="report-value">12,580</div>
                  <div className="report-label">新增客户</div>
                </div>
              </div>
            </div>
            <div className="trend-section">
              <h4>月度趋势</h4>
              <div className="line-chart">
                {[65, 72, 68, 85, 92, 78, 88, 95, 82, 98, 85, 96].map((value, index) => (
                  <div key={index} className="chart-bar">
                    <div className="bar" style={{ height: `${value}%` }}></div>
                    <span className="bar-label">{index + 1}月</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="marketing-page">
      <div className="page-header">
        <h2 className="page-title">营销管理</h2>
        <p className="page-subtitle">营销活动管理与效果分析</p>
      </div>
      
      <div className="page-nav">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`nav-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {renderContent()}
    </div>
  )
}

export default MarketingPage
