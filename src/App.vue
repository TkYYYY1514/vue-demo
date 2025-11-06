<template>
  <div id="app">
    <div class="app-container">
      <!-- 左侧导航栏 -->
      <nav class="sidebar">
        <div class="logo">
          <h1>📚 图书管理</h1>
        </div>
        <ul class="nav-menu">
          <li>
            <router-link to="/" class="nav-link">
              <span class="icon">🏠</span>
              <span class="text">首页</span>
            </router-link>
          </li>
          <li>
            <router-link to="/books" class="nav-link">
              <span class="icon">📖</span>
              <span class="text">图书管理</span>
            </router-link>
          </li>
          <li>
            <router-link to="/borrow" class="nav-link">
              <span class="icon">🔖</span>
              <span class="text">借阅管理</span>
            </router-link>
          </li>
          <li>
            <router-link to="/statistics" class="nav-link">
              <span class="icon">📊</span>
              <span class="text">数据统计</span>
            </router-link>
          </li>
        </ul>
      </nav>

      <!-- 主内容区 -->
      <main class="main-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Microsoft YaHei', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f8f9fa;
  color: #333;
  line-height: 1.6;
}

.app-container {
  display: flex;
  min-height: 100vh;
}

/* 侧边栏样式 */
.sidebar {
  width: 250px;
  background: white;
  box-shadow: 2px 0 10px rgba(0,0,0,0.1);
  position: fixed;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 1000;
}

.logo {
  padding: 1.5rem;
  border-bottom: 1px solid #e9ecef;
  text-align: center;
}

.logo h1 {
  font-size: 1.3rem;
  color: #2c3e50;
  font-weight: 600;
}

.nav-menu {
  list-style: none;
  padding: 1rem 0;
}

.nav-menu li {
  margin: 0.5rem 0;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 0.8rem 1.5rem;
  color: #495057;
  text-decoration: none;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
}

.nav-link:hover {
  background-color: #f8f9fa;
  color: #2c3e50;
  border-left-color: #dee2e6;
}

.nav-link.router-link-active {
  background-color: #e3f2fd;
  color: #1976d2;
  border-left-color: #1976d2;
  font-weight: 500;
}

.nav-link .icon {
  font-size: 1.2rem;
  margin-right: 0.8rem;
  width: 20px;
  text-align: center;
}

.nav-link .text {
  font-size: 0.95rem;
}

/* 主内容区样式 */
.main-content {
  flex: 1;
  margin-left: 250px;
  padding: 2rem;
  background-color: #f8f9fa;
  min-height: 100vh;
}
</style>