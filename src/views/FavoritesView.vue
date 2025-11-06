<template>
    <div class="favorites-view">
      <div class="page-header">
        <h1>⭐ 收藏的笔记</h1>
        <p>共 {{ favoriteNotes.length }} 条收藏</p>
      </div>
  
      <div class="notes-grid">
        <div 
          v-for="note in favoriteNotes" 
          :key="note.id"
          class="note-card"
          @click="$parent.editNote(note)"
        >
          <div class="note-header">
            <h3>{{ note.title }}</h3>
            <button 
              @click.stop="$parent.toggleFavorite(note.id)"
              class="favorite-btn active"
            >
              ★
            </button>
          </div>
          <div class="note-content">
            {{ note.content.substring(0, 100) }}{{ note.content.length > 100 ? '...' : '' }}
          </div>
          <div class="note-footer">
            <span class="note-date">
              {{ $parent.formatDate(note.updatedAt) }}
            </span>
          </div>
        </div>
        
        <div v-if="favoriteNotes.length === 0" class="empty-state">
          <p>暂无收藏的笔记</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'FavoritesView',
    props: {
      notes: {
        type: Array,
        default: () => []
      }
    },
    computed: {
      favoriteNotes() {
        return this.notes.filter(note => note.favorite)
      }
    }
  }
  </script>
  
  <style scoped>
  .favorites-view {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .page-header {
    margin-bottom: 2rem;
  }
  
  .page-header h1 {
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }
  
  .page-header p {
    color: #6c757d;
  }
  
  .notes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }
  
  .note-card {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid #ffeb3b;
  }
  
  .note-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  }
  
  .note-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
  }
  
  .note-header h3 {
    color: #2c3e50;
    margin: 0;
    flex: 1;
    margin-right: 1rem;
  }
  
  .favorite-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.9rem;
    color: #ff9800;
  }
  
  .note-content {
    color: #495057;
    line-height: 1.5;
    margin-bottom: 1rem;
    white-space: pre-line;
  }
  
  .note-footer {
    border-top: 1px solid #e9ecef;
    padding-top: 0.75rem;
  }
  
  .note-date {
    color: #6c757d;
    font-size: 0.85rem;
  }
  
  .empty-state {
    text-align: center;
    padding: 3rem;
    color: #6c757d;
    grid-column: 1 / -1;
  }
  
  .empty-state p {
    font-size: 1.1rem;
  }
  
  @media (max-width: 768px) {
    .notes-grid {
      grid-template-columns: 1fr;
    }
  }
  
  @media (max-width: 480px) {
    .page-header h1 {
      font-size: 1.5rem;
    }
    
    .note-card {
      padding: 1rem;
    }
  }
  </style>