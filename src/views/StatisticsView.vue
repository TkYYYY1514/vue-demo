<template>
    <div class="statistics-view">
      <div class="page-header">
        <h2>数据统计</h2>
        <p>查看图书数据统计信息</p>
      </div>
      <div class="content-card">
        <p>这里是数据统计页面，功能开发中...</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'StatisticsView'
  }
  </script>
  
  <style scoped>
  .page-header {
    margin-bottom: 1.5rem;
  }
  
  .page-header h2 {
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }
  
  .page-header p {
    color: #6c757d;
  }
  
  .content-card {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    text-align: center;
    color: #6c757d;
  }
  </style>