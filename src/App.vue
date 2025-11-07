<template>
  <div id="app">
    <div class="app-container">
      <!-- 机械风导航栏 -->
      <nav class="sidebar" :class="{ 'mobile-hidden': isMobileMenuClosed }">
        <div class="logo">
          <div class="logo-icon">⚙️</div>
          <h1>数据终端</h1>
          <button class="mobile-close" @click="toggleMobileMenu">×</button>
        </div>
        
        <ul class="nav-menu">
          <li>
            <router-link to="/" class="nav-link" @click="closeMobileMenu">
              <span class="icon">📁</span>
              <span class="text">数据档案</span>
              <span class="status-indicator"></span>
            </router-link>
          </li>
          <li>
            <router-link to="/favorites" class="nav-link" @click="closeMobileMenu">
              <span class="icon">🔰</span>
              <span class="text">核心标记</span>
              <span class="status-indicator"></span>
            </router-link>
          </li>
          <li>
            <button class="nav-link new-note-btn" @click="createNewNote">
              <span class="icon">🛠️</span>
              <span class="text">新建记录</span>
              <span class="pulse-dot"></span>
            </button>
          </li>
        </ul>
        
        <div class="system-info">
          <div class="info-item">
            <span class="label">存储状态:</span>
            <span class="value">LOCAL_ACTIVE</span>
          </div>
          <div class="info-item">
            <span class="label">数据条数:</span>
            <span class="value">{{ notes.length }}</span>
          </div>
          <div class="info-item">
            <span class="label">系统版本:</span>
            <span class="value">v2.3.7</span>
          </div>
        </div>
      </nav>

      <!-- 移动端菜单按钮 -->
      <button class="mobile-menu-btn" @click="toggleMobileMenu">☰</button>

      <!-- 主内容区 -->
      <main class="main-content" @click="closeMobileMenu">
        <router-view :notes="notes" @update-note="updateNote" @delete-note="deleteNote" />
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isMobileMenuClosed: true,
      notes: []
    }
  },
  mounted() {
    this.loadNotes()
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  methods: {
    loadNotes() {
      const saved = localStorage.getItem('my-notes-app')
      this.notes = saved ? JSON.parse(saved) : [
        {
          id: 1,
          title: '系统初始化记录',
          content: '数据终端已启动\n\n系统功能：\n✅ 本地数据存储\n✅ 加密数据保护\n✅ 多设备同步\n✅ 快速检索系统',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          favorite: false
        }
      ]
    },
    saveNotes() {
      localStorage.setItem('my-notes-app', JSON.stringify(this.notes))
    },
    createNewNote() {
      const newNote = {
        id: Date.now(),
        title: '新数据记录',
        content: '记录开始...',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        favorite: false
      }
      this.notes.unshift(newNote)
      this.saveNotes()
      this.closeMobileMenu()
      this.$router.push('/')
    },
    updateNote(updatedNote) {
      const index = this.notes.findIndex(note => note.id === updatedNote.id)
      if (index !== -1) {
        this.notes[index] = {
          ...updatedNote,
          updatedAt: new Date().toISOString()
        }
        this.saveNotes()
      }
    },
    deleteNote(noteId) {
      this.notes = this.notes.filter(note => note.id !== noteId)
      this.saveNotes()
    },
    toggleMobileMenu() {
      this.isMobileMenuClosed = !this.isMobileMenuClosed
    },
    closeMobileMenu() {
      if (window.innerWidth <= 768) {
        this.isMobileMenuClosed = true
      }
    },
    handleResize() {
      if (window.innerWidth > 768) {
        this.isMobileMenuClosed = false
      } else {
        this.isMobileMenuClosed = true
      }
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Courier New', 'SF Mono', Monaco, Inconsolata, monospace;
  background: #0a0a0a;
  color: #e0e0e0; /* 改为浅灰色，减少绿色 */
  line-height: 1.6;
  overflow-x: hidden;
}

/* 扫描线效果 - 改为更暗的颜色 */
body::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    transparent 50%,
    rgba(100, 255, 100, 0.02) 50% /* 更暗的绿色 */
  );
  background-size: 100% 4px;
  pointer-events: none;
  z-index: 9999;
}

.app-container {
  display: flex;
  min-height: 100vh;
  background: #0a0a0a;
}

/* 侧边栏样式 - 减少绿色 */
.sidebar {
  width: 300px;
  background: linear-gradient(135deg, #111 0%, #0a0a0a 100%); /* 更深的背景 */
  border-right: 1px solid #333; /* 改为深灰色边框 */
  position: fixed;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 1000;
  transition: transform 0.3s ease;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5); /* 移除绿色发光 */
}

.logo {
  padding: 1.5rem;
  border-bottom: 1px solid #333; /* 深灰色边框 */
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-icon {
  font-size: 1.5rem;
  color: #e0e0e0; /* 改为灰色 */
}

.logo h1 {
  font-size: 1.2rem;
  color: #e0e0e0; /* 改为灰色 */
  font-weight: 600;
  text-shadow: none; /* 移除绿色发光 */
  letter-spacing: 1px;
}

.mobile-close {
  display: none;
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: 1px solid #555;
  color: #e0e0e0;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 2px;
}

.nav-menu {
  list-style: none;
  padding: 1.5rem 0;
}

.nav-menu li {
  margin: 0.5rem 0;
  position: relative;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  color: #e0e0e0; /* 改为灰色 */
  text-decoration: none;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
  background: transparent;
  border: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.nav-link::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 0;
  background: linear-gradient(90deg, transparent, rgba(100, 255, 100, 0.05), transparent); /* 更暗的绿色 */
  transition: width 0.3s ease;
}

.nav-link:hover::before {
  width: 100%;
}

.nav-link:hover {
  background: rgba(100, 255, 100, 0.03); /* 更暗的绿色 */
  color: #e0e0e0;
  border-left-color: #555; /* 深灰色 */
}

.nav-link.router-link-active {
  background: rgba(100, 255, 100, 0.05); /* 更暗的绿色 */
  color: #e0e0e0;
  border-left-color: #666; /* 中灰色 */
  font-weight: 600;
  text-shadow: none; /* 移除发光 */
}

.nav-link .icon {
  font-size: 1.1rem;
  margin-right: 0.8rem;
  width: 20px;
  text-align: center;
  color: #e0e0e0; /* 改为灰色 */
}

.nav-link .text {
  font-size: 0.95rem;
  flex: 1;
}

.status-indicator {
  width: 6px;
  height: 6px;
  background: #666; /* 改为灰色 */
  border-radius: 50%;
  box-shadow: 0 0 4px #666; /* 灰色发光 */
  animation: pulse 2s infinite;
}

.pulse-dot {
  width: 6px;
  height: 6px;
  background: #888; /* 改为灰色 */
  border-radius: 50%;
  box-shadow: 0 0 4px #888; /* 灰色发光 */
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.new-note-btn {
  background: linear-gradient(135deg, #333 0%, #222 100%) !important; /* 灰色渐变 */
  color: #e0e0e0 !important;
  border-left-color: #555 !important;
  font-weight: 600;
}

.new-note-btn:hover {
  background: linear-gradient(135deg, #444 0%, #333 100%) !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5); /* 黑色阴影 */
}

.system-info {
  padding: 1.5rem;
  border-top: 1px solid #333; /* 深灰色 */
  background: rgba(50, 50, 50, 0.3); /* 深灰色背景 */
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.8rem;
}

.info-item:last-child {
  margin-bottom: 0;
}

.label {
  color: #aaa; /* 浅灰色 */
  opacity: 0.8;
}

.value {
  color: #e0e0e0; /* 浅灰色 */
  font-weight: 600;
  font-family: 'Courier New', monospace;
}

/* 移动端菜单按钮 */
.mobile-menu-btn {
  display: none;
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1001;
  background: #333;
  color: #e0e0e0;
  border: none;
  border-radius: 2px;
  padding: 0.5rem 0.8rem;
  font-size: 1.2rem;
  cursor: pointer;
  font-weight: bold;
}

/* 主内容区样式 */
.main-content {
  flex: 1;
  margin-left: 300px;
  padding: 2rem;
  background: #0a0a0a;
  min-height: 100vh;
  position: relative;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    width: 280px;
  }
  
  .sidebar.mobile-hidden {
    transform: translateX(-100%);
  }
  
  .sidebar:not(.mobile-hidden) {
    transform: translateX(0);
  }
  
  .mobile-close {
    display: block;
  }
  
  .mobile-menu-btn {
    display: block;
  }
  
  .main-content {
    margin-left: 0;
    padding: 1rem;
    padding-top: 4rem;
  }
}

@media (max-width: 480px) {
  .main-content {
    padding: 0.5rem;
    padding-top: 4rem;
  }
  
  .sidebar {
    width: 100%;
  }
}
</style>