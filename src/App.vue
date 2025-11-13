<!-- src/App.vue -->
<template>
    <div id="app">
      <main class="main-content">
        <router-view />
      </main>
      <BottomNav />
    </div>
  </template>
  
  <script>
  import BottomNav from './components/BottomNav.vue'
  
  export default {
    name: 'App',
    components: {
      BottomNav
    }
  }
  </script>
  
  <style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
  
  .main-content {
    padding-bottom: 70px; /* 为底部导航栏留出空间 */
  }
  </style>