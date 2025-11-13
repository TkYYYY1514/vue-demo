<!-- src/components/BottomNav.vue -->
<template>
    <div class="bottom-nav">
      <div 
        class="nav-item" 
        :class="{ active: activeTab === 'home' }"
        @click="navigateTo('home')"
      >
        <span class="icon">🏠</span>
        <span class="label">首页</span>
      </div>
      <div 
        class="nav-item" 
        :class="{ active: activeTab === 'bookshelf' }"
        @click="navigateTo('bookshelf')"
      >
        <span class="icon">📚</span>
        <span class="label">书架</span>
      </div>
      <div 
        class="nav-item" 
        :class="{ active: activeTab === 'profile' }"
        @click="navigateTo('profile')"
      >
        <span class="icon">👤</span>
        <span class="label">个人</span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'BottomNav',
    data() {
      return {
        activeTab: 'home'
      }
    },
    methods: {
      navigateTo(tab) {
        this.activeTab = tab;
        // 根据当前激活的标签进行路由跳转
        switch(tab) {
          case 'home':
            this.$router.push('/');
            break;
          case 'bookshelf':
            this.$router.push('/bookshelf');
            break;
          case 'profile':
            this.$router.push('/profile');
            break;
        }
      }
    },
    mounted() {
      // 根据当前路由设置激活的标签
      const currentPath = this.$route.path;
      if (currentPath === '/') {
        this.activeTab = 'home';
      } else if (currentPath === '/bookshelf') {
        this.activeTab = 'bookshelf';
      } else if (currentPath === '/profile') {
        this.activeTab = 'profile';
      }
    },
    watch: {
      '$route'(to) {
        // 监听路由变化，更新激活的标签
        if (to.path === '/') {
          this.activeTab = 'home';
        } else if (to.path === '/bookshelf') {
          this.activeTab = 'bookshelf';
        } else if (to.path === '/profile') {
          this.activeTab = 'profile';
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #fff;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
    padding: 8px 0;
    z-index: 1000;
  }
  
  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px 10px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .nav-item.active {
    color: #42b983; /* Vue主题色，可根据需要调整 */
  }
  
  .nav-item .icon {
    font-size: 20px;
    margin-bottom: 4px;
  }
  
  .nav-item .label {
    font-size: 12px;
  }
  
  .nav-item:hover {
    opacity: 0.8;
  }
  </style>