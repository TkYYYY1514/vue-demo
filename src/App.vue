<template>
  <div id="app">
    <div class="app-container">
      <!-- 响应式导航栏 -->
      <nav class="sidebar" :class="{ 'mobile-hidden': isMobileMenuClosed }">
        <div class="logo">
          <h1>📝 我的笔记</h1>
          <button class="mobile-close" @click="toggleMobileMenu">×</button>
        </div>
        <ul class="nav-menu">
          <li>
            <router-link to="/" class="nav-link" @click="closeMobileMenu">
              <span class="icon">📋</span>
              <span class="text">所有笔记</span>
            </router-link>
          </li>
          <li>
            <router-link to="/favorites" class="nav-link" @click="closeMobileMenu">
              <span class="icon">⭐</span>
              <span class="text">收藏夹</span>
            </router-link>
          </li>
          <li>
            <button class="nav-link new-note-btn" @click="createNewNote">
              <span class="icon">➕</span>
              <span class="text">新建笔记</span>
            </button>
          </li>
        </ul>
        
        <div class="storage-info">
          <p>数据自动保存到本地</p>
          <small>同一浏览器可用</small>
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
    // 监听窗口大小变化
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  methods: {
    loadNotes() {
      const saved = localStorage.getItem('my-notes-app')
      this.notes = saved ? JSON.parse(saved) : [
        {
          id: 1,
          title: '欢迎使用笔记应用',
          content: '这是一个可以在不同设备间保存数据的笔记应用！\n\n功能：\n✅ 自动保存到本地存储\n✅ 响应式设计\n✅ 无需登录\n✅ 多设备支持（同一浏览器）',
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
        title: '新笔记',
        content: '开始记录你的想法...',
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
  width: 280px;
  background: white;
  box-shadow: 2px 0 10px rgba(0,0,0,0.1);
  position: fixed;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 1000;
  transition: transform 0.3s ease;
}

.logo {
  padding: 1.5rem;
  border-bottom: 1px solid #e9ecef;
  text-align: center;
  position: relative;
}

.logo h1 {
  font-size: 1.3rem;
  color: #2c3e50;
  font-weight: 600;
}

.mobile-close {
  display: none;
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
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
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
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

.new-note-btn {
  background: #1976d2 !important;
  color: white !important;
  border-left-color: #1976d2 !important;
}

.new-note-btn:hover {
  background: #1565c0 !important;
}

.storage-info {
  padding: 1rem;
  border-top: 1px solid #e9ecef;
  text-align: center;
  color: #6c757d;
  font-size: 0.9rem;
}

.storage-info small {
  color: #adb5bd;
}

/* 移动端菜单按钮 */
.mobile-menu-btn {
  display: none;
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1001;
  background: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 0.8rem;
  font-size: 1.2rem;
  cursor: pointer;
}

/* 主内容区样式 */
.main-content {
  flex: 1;
  margin-left: 280px;
  padding: 2rem;
  background-color: #f8f9fa;
  min-height: 100vh;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
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