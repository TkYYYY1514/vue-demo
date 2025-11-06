<template>
    <div class="home">
      <div class="welcome-card">
        <h2>欢迎使用图书管理系统</h2>
        <p class="subtitle">简单、实用的图书管理解决方案</p>
      </div>
  
      <div class="quick-stats">
        <div class="stat-card">
          <div class="stat-icon">📚</div>
          <div class="stat-info">
            <h3>总藏书量</h3>
            <p class="stat-number">1,234</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">👥</div>
          <div class="stat-info">
            <h3>在借图书</h3>
            <p class="stat-number">89</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">✅</div>
          <div class="stat-info">
            <h3>可借图书</h3>
            <p class="stat-number">1,145</p>
          </div>
        </div>
      </div>
  
      <div class="recent-actions">
        <h3>常用功能</h3>
        <div class="action-buttons">
          <button class="action-btn" @click="goToBooks">
            <span class="btn-icon">➕</span>
            添加新书
          </button>
          <button class="action-btn" @click="goToBorrow">
            <span class="btn-icon">📝</span>
            借阅登记
          </button>
          <button class="action-btn">
            <span class="btn-icon">🔍</span>
            图书查询
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomeView',
    methods: {
      goToBooks() {
        this.$router.push('/books');
      },
      goToBorrow() {
        this.$router.push('/borrow');
      }
    }
  }
  </script>
  
  <style scoped>
  .home {
    max-width: 1000px;
  }
  
  .welcome-card {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    margin-bottom: 2rem;
    text-align: center;
  }
  
  .welcome-card h2 {
    color: #2c3e50;
    margin-bottom: 0.5rem;
    font-size: 1.8rem;
  }
  
  .subtitle {
    color: #6c757d;
    font-size: 1.1rem;
  }
  
  .quick-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .stat-card {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    display: flex;
    align-items: center;
    transition: transform 0.2s ease;
  }
  
  .stat-card:hover {
    transform: translateY(-2px);
  }
  
  .stat-icon {
    font-size: 2rem;
    margin-right: 1rem;
  }
  
  .stat-info h3 {
    color: #6c757d;
    font-size: 0.9rem;
    margin-bottom: 0.3rem;
    font-weight: normal;
  }
  
  .stat-number {
    color: #2c3e50;
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0;
  }
  
  .recent-actions {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }
  
  .recent-actions h3 {
    color: #2c3e50;
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }
  
  .action-buttons {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
  
  .action-btn {
    display: flex;
    align-items: center;
    padding: 0.8rem 1.2rem;
    background: white;
    border: 1px solid #dee2e6;
    border-radius: 6px;
    color: #495057;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.95rem;
  }
  
  .action-btn:hover {
    background: #f8f9fa;
    border-color: #adb5bd;
    transform: translateY(-1px);
  }
  
  .btn-icon {
    margin-right: 0.5rem;
    font-size: 1.1rem;
  }
  </style>