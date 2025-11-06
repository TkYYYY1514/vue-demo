<template>
  <div class="notes-home">
    <div class="page-header">
      <h1>所有笔记</h1>
      <p>共 {{ filteredNotes.length }} 条笔记</p>
    </div>

    <div class="search-bar">
      <input 
        v-model="searchQuery"
        type="text" 
        placeholder="搜索笔记..."
        class="search-input"
      >
    </div>

    <div class="notes-grid">
      <div 
        v-for="note in filteredNotes" 
        :key="note.id"
        class="note-card"
        @click="editNote(note)"
      >
        <div class="note-header">
          <h3>{{ note.title }}</h3>
          <div class="note-actions">
            <button 
              @click.stop="toggleFavorite(note.id)"
              class="favorite-btn"
              :class="{ active: note.favorite }"
            >
              {{ note.favorite ? '★' : '☆' }}
            </button>
            <button 
              @click.stop="deleteNote(note.id)"
              class="delete-btn"
            >
              删除
            </button>
          </div>
        </div>
        <div class="note-content">
          {{ note.content.substring(0, 100) }}{{ note.content.length > 100 ? '...' : '' }}
        </div>
        <div class="note-footer">
          <span class="note-date">
            {{ formatDate(note.updatedAt) }}
          </span>
        </div>
      </div>
      
      <div v-if="filteredNotes.length === 0" class="empty-state">
        <p>暂无笔记</p>
        <button @click="$emit('createNewNote')" class="btn-primary">
          创建第一条笔记
        </button>
      </div>
    </div>

    <!-- 笔记编辑器模态框 -->
    <div v-if="editingNote" class="modal-overlay" @click="closeEditor">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>编辑笔记</h2>
          <button @click="closeEditor" class="close-btn">×</button>
        </div>
        <div class="modal-body">
          <input 
            v-model="editingNote.title"
            type="text" 
            placeholder="笔记标题"
            class="title-input"
          >
          <textarea 
            v-model="editingNote.content"
            placeholder="开始写作..."
            class="content-textarea"
          ></textarea>
        </div>
        <div class="modal-footer">
          <button @click="saveNote" class="btn-primary">保存</button>
          <button @click="closeEditor" class="btn-secondary">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  props: {
    notes: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      searchQuery: '',
      editingNote: null
    }
  },
  computed: {
    filteredNotes() {
      if (!this.searchQuery) {
        return this.notes
      }
      const query = this.searchQuery.toLowerCase()
      return this.notes.filter(note => 
        note.title.toLowerCase().includes(query) || 
        note.content.toLowerCase().includes(query)
      )
    }
  },
  methods: {
    editNote(note) {
      this.editingNote = { ...note }
    },
    closeEditor() {
      this.editingNote = null
    },
    saveNote() {
      if (this.editingNote) {
        this.$emit('update-note', this.editingNote)
        this.closeEditor()
      }
    },
    deleteNote(noteId) {
      if (confirm('确定要删除这条笔记吗？')) {
        this.$emit('delete-note', noteId)
      }
    },
    toggleFavorite(noteId) {
      const note = this.notes.find(n => n.id === noteId)
      if (note) {
        this.$emit('update-note', {
          ...note,
          favorite: !note.favorite
        })
      }
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('zh-CN')
    }
  }
}
</script>

<style scoped>
.notes-home {
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

.search-bar {
  margin-bottom: 2rem;
}

.search-input {
  width: 100%;
  max-width: 400px;
  padding: 0.75rem 1rem;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  font-size: 1rem;
}

.search-input:focus {
  outline: none;
  border-color: #1976d2;
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
  border: 1px solid transparent;
}

.note-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  border-color: #1976d2;
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

.note-actions {
  display: flex;
  gap: 0.5rem;
}

.favorite-btn, .delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
}

.favorite-btn {
  color: #ffc107;
}

.favorite-btn.active {
  color: #ff9800;
}

.delete-btn {
  color: #dc3545;
}

.favorite-btn:hover, .delete-btn:hover {
  background: #f8f9fa;
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
}

.empty-state p {
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

/* 模态框样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e9ecef;
}

.modal-header h2 {
  margin: 0;
  color: #2c3e50;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6c757d;
}

.modal-body {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
}

.title-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.content-textarea {
  width: 100%;
  height: 300px;
  padding: 0.75rem;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
}

.modal-footer {
  padding: 1.5rem;
  border-top: 1px solid #e9ecef;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.btn-primary {
  background: #1976d2;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.btn-secondary {
  background: #6c757d;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.btn-primary:hover {
  background: #1565c0;
}

.btn-secondary:hover {
  background: #5a6268;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .notes-grid {
    grid-template-columns: 1fr;
  }
  
  .modal-content {
    width: 95%;
    margin: 1rem;
  }
  
  .note-actions {
    flex-direction: column;
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