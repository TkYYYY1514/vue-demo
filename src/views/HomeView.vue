<template>
  <div class="terminal-interface">
    <!-- 终端头部 -->
    <div class="terminal-header">
      <div class="header-left">
        <div class="status-light"></div>
        <h1 class="terminal-title">数据档案库</h1>
      </div>
      <div class="header-right">
        <span class="system-time">{{ currentTime }}</span>
        <span class="record-count">记录: {{ filteredNotes.length }}</span>
      </div>
    </div>

    <!-- 命令输入区 -->
    <div class="command-bar">
      <div class="prompt">></div>
      <input 
        v-model="searchQuery"
        type="text" 
        placeholder="输入检索关键词..."
        class="command-input"
        @keyup.enter="executeSearch"
      >
      <button class="execute-btn" @click="executeSearch">执行</button>
    </div>

    <!-- 数据网格 -->
    <div class="data-grid">
      <div 
        v-for="note in filteredNotes" 
        :key="note.id"
        class="data-card"
        @click="editNote(note)"
      >
        <div class="card-header">
          <h3 class="data-title">{{ note.title }}</h3>
          <div class="card-actions">
            <button 
              @click.stop="toggleFavorite(note.id)"
              class="action-btn favorite"
              :class="{ active: note.favorite }"
              title="标记核心"
            >
              <span class="btn-icon">{{ note.favorite ? '🔰' : '⚙️' }}</span>
            </button>
            <button 
              @click.stop="showDeleteConfirm(note)"
              class="action-btn delete"
              title="删除记录"
            >
              <span class="btn-icon">🗑️</span>
            </button>
          </div>
        </div>
        <div class="data-preview">
          {{ note.content.substring(0, 120) }}{{ note.content.length > 120 ? '...' : '' }}
        </div>
        <div class="card-footer">
          <span class="timestamp">
            更新: {{ formatDate(note.updatedAt) }}
          </span>
          <span class="data-id">ID: {{ note.id }}</span>
        </div>
        <div class="card-glow"></div>
      </div>
      
      <!-- 空状态 -->
      <div v-if="filteredNotes.length === 0" class="empty-terminal">
        <div class="empty-icon">📡</div>
        <h3>未检索到数据</h3>
        <p>数据库为空或检索条件不匹配</p>
        <button @click="$emit('createNewNote')" class="terminal-btn">
          创建新记录
        </button>
      </div>
    </div>

    <!-- 数据编辑器 -->
    <div v-if="editingNote" class="editor-overlay" @click="closeEditor">
      <div class="editor-terminal" @click.stop>
        <div class="editor-header">
          <div class="editor-title">数据编辑器</div>
          <button @click="closeEditor" class="close-terminal">⨯</button>
        </div>
        <div class="editor-body">
          <div class="input-group">
            <label class="input-label">记录标题</label>
            <input 
              v-model="editingNote.title"
              type="text" 
              placeholder="输入记录标题..."
              class="terminal-input"
            >
          </div>
          <div class="input-group">
            <label class="input-label">数据内容</label>
            <textarea 
              v-model="editingNote.content"
              placeholder="输入数据内容..."
              class="terminal-textarea"
            ></textarea>
          </div>
        </div>
        <div class="editor-footer">
          <button @click="saveNote" class="terminal-btn primary">保存数据</button>
          <button @click="closeEditor" class="terminal-btn secondary">取消</button>
        </div>
      </div>
    </div>

    <!-- 删除确认弹窗 -->
    <div v-if="showDeleteModal" class="editor-overlay" @click="hideDeleteConfirm">
      <div class="confirm-terminal" @click.stop>
        <div class="confirm-header warning">
          <div class="confirm-icon">⚠️</div>
          <div class="confirm-title">确认删除</div>
          <button @click="hideDeleteConfirm" class="close-terminal">⨯</button>
        </div>
        <div class="confirm-body">
          <div class="warning-message">
            <h3>即将删除数据记录</h3>
            <p class="record-info">"{{ noteToDelete?.title }}"</p>
            <p class="warning-text">此操作不可恢复，请确认是否继续？</p>
          </div>
          <div class="data-preview" v-if="noteToDelete">
            {{ noteToDelete.content.substring(0, 100) }}{{ noteToDelete.content.length > 100 ? '...' : '' }}
          </div>
        </div>
        <div class="confirm-footer">
          <button @click="confirmDelete" class="terminal-btn danger">确认删除</button>
          <button @click="hideDeleteConfirm" class="terminal-btn secondary">取消</button>
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
      editingNote: null,
      currentTime: this.getCurrentTime(),
      showDeleteModal: false,
      noteToDelete: null
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
  mounted() {
    // 更新时间
    this.timeInterval = setInterval(() => {
      this.currentTime = this.getCurrentTime()
    }, 1000)
  },
  beforeUnmount() {
    clearInterval(this.timeInterval)
  },
  methods: {
    getCurrentTime() {
      return new Date().toLocaleTimeString('zh-CN', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    },
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
    // 显示删除确认弹窗
    showDeleteConfirm(note) {
      this.noteToDelete = note
      this.showDeleteModal = true
    },
    // 隐藏删除确认弹窗
    hideDeleteConfirm() {
      this.showDeleteModal = false
      this.noteToDelete = null
    },
    // 确认删除
    confirmDelete() {
      if (this.noteToDelete) {
        this.$emit('delete-note', this.noteToDelete.id)
        this.hideDeleteConfirm()
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
    },
    executeSearch() {
      // 搜索执行效果
      console.log('执行检索:', this.searchQuery)
    }
  }
}
</script>


<style scoped>
.terminal-interface {
  max-width: 1400px;
  margin: 0 auto;
  font-family: 'Courier New', 'SF Mono', Monaco, monospace;
}

/* 终端头部 */
.terminal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, #111 0%, #0a0a0a 100%);
  border: 1px solid #333;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.status-light {
  width: 12px;
  height: 12px;
  background: #666;
  border-radius: 50%;
  box-shadow: 0 0 6px #666;
  animation: blink 2s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0.3; }
}

.terminal-title {
  color: #e0e0e0;
  font-size: 1.5rem;
  font-weight: 600;
  text-shadow: none;
  margin: 0;
}

.header-right {
  display: flex;
  gap: 1.5rem;
  font-size: 0.9rem;
  color: #e0e0e0;
}

.system-time, .record-count {
  background: rgba(80, 80, 80, 0.3);
  padding: 0.4rem 0.8rem;
  border-radius: 2px;
  border: 1px solid #444;
}

/* 命令输入区 */
.command-bar {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem;
  background: rgba(50, 50, 50, 0.3);
  border: 1px solid #333;
  border-radius: 4px;
}

.prompt {
  color: #e0e0e0;
  font-weight: bold;
  margin-right: 0.5rem;
  font-size: 1.1rem;
}

.command-input {
  flex: 1;
  background: transparent;
  border: none;
  color: #e0e0e0;
  font-family: 'Courier New', monospace;
  font-size: 1rem;
  padding: 0.5rem;
  outline: none;
}

.command-input::placeholder {
  color: rgba(200, 200, 200, 0.5);
}

.execute-btn {
  background: #444;
  color: #e0e0e0;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 2px;
  cursor: pointer;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  transition: all 0.3s ease;
}

.execute-btn:hover {
  background: #555;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}

/* 数据网格 */
.data-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.data-card {
  background: linear-gradient(135deg, #111 0%, #0a0a0a 100%);
  border: 1px solid #333;
  border-radius: 4px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.data-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(100, 100, 100, 0.1), transparent);
  transition: left 0.5s ease;
}

.data-card:hover::before {
  left: 100%;
}

.data-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.7);
  border-color: #444;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.data-title {
  color: #e0e0e0;
  margin: 0;
  flex: 1;
  margin-right: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
}

.card-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  background: rgba(80, 80, 80, 0.3);
  border: 1px solid #555;
  color: #e0e0e0;
  padding: 0.4rem;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-btn:hover {
  background: rgba(100, 100, 100, 0.4);
  transform: scale(1.1);
}

.action-btn.favorite.active {
  background: rgba(120, 120, 120, 0.5);
  box-shadow: 0 0 8px rgba(150, 150, 150, 0.5);
}

.action-btn.delete:hover {
  background: rgba(120, 80, 80, 0.4);
  border-color: #844;
}

.btn-icon {
  font-size: 0.9rem;
}

.data-preview {
  color: rgba(200, 200, 200, 0.8);
  line-height: 1.5;
  margin-bottom: 1rem;
  white-space: pre-line;
  font-size: 0.9rem;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(100, 100, 100, 0.3);
  padding-top: 0.75rem;
  font-size: 0.8rem;
}

.timestamp {
  color: rgba(180, 180, 180, 0.7);
}

.data-id {
  color: rgba(150, 150, 150, 0.5);
  font-family: 'Courier New', monospace;
}

.card-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: #666;
  box-shadow: 0 0 6px #666;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.data-card:hover .card-glow {
  opacity: 1;
}

/* 空状态 */
.empty-terminal {
  text-align: center;
  padding: 4rem 2rem;
  color: rgba(180, 180, 180, 0.7);
  grid-column: 1 / -1;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.7;
}

.empty-terminal h3 {
  margin-bottom: 1rem;
  color: #e0e0e0;
}

.empty-terminal p {
  margin-bottom: 2rem;
  opacity: 0.8;
}

/* 终端按钮 */
.terminal-btn {
  background: #444;
  color: #e0e0e0;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 2px;
  cursor: pointer;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  transition: all 0.3s ease;
}

.terminal-btn:hover {
  background: #555;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}

.terminal-btn.secondary {
  background: transparent;
  color: #e0e0e0;
  border: 1px solid #555;
}

.terminal-btn.secondary:hover {
  background: rgba(80, 80, 80, 0.3);
}

/* 编辑器样式 */
.editor-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.editor-terminal {
  background: linear-gradient(135deg, #111 0%, #0a0a0a 100%);
  border: 2px solid #333;
  border-radius: 4px;
  width: 90%;
  max-width: 700px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.7);
}

.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #333;
  background: rgba(50, 50, 50, 0.3);
}

.editor-title {
  color: #e0e0e0;
  font-size: 1.2rem;
  font-weight: 600;
}

.close-terminal {
  background: none;
  border: none;
  color: #e0e0e0;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 2px;
}

.close-terminal:hover {
  background: rgba(120, 80, 80, 0.3);
}

.editor-body {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
}

.input-group {
  margin-bottom: 1.5rem;
}

.input-label {
  display: block;
  color: #e0e0e0;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.terminal-input, .terminal-textarea {
  width: 100%;
  background: rgba(50, 50, 50, 0.3);
  border: 1px solid #444;
  color: #e0e0e0;
  padding: 0.75rem;
  border-radius: 2px;
  font-family: 'Courier New', monospace;
  font-size: 1rem;
}

.terminal-input:focus, .terminal-textarea:focus {
  outline: none;
  box-shadow: 0 0 10px rgba(100, 100, 100, 0.3);
  border-color: #555;
}

.terminal-textarea {
  height: 300px;
  resize: vertical;
}

.editor-footer {
  padding: 1.5rem;
  border-top: 1px solid #333;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  background: rgba(50, 50, 50, 0.3);
}

.terminal-btn.primary {
  background: #444;
  color: #e0e0e0;
}

.terminal-btn.primary:hover {
  background: #555;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .data-grid {
    grid-template-columns: 1fr;
  }
  
  .terminal-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .editor-terminal {
    width: 95%;
    margin: 1rem;
  }
  
  .editor-footer {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .terminal-title {
    font-size: 1.2rem;
  }
  
  .data-card {
    padding: 1rem;
  }
  
  .card-header {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .card-actions {
    align-self: flex-end;
  }
}
.confirm-terminal {
  background: linear-gradient(135deg, #1a0f0f 0%, #0a0a0a 100%);
  border: 2px solid #aa4444;
  border-radius: 4px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 30px rgba(170, 68, 68, 0.3);
}

.confirm-header {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #aa4444;
  background: rgba(170, 68, 68, 0.1);
  gap: 1rem;
}

.confirm-header.warning {
  border-bottom-color: #aa8c3c;
  background: rgba(170, 140, 60, 0.1);
}

.confirm-icon {
  font-size: 1.5rem;
}

.confirm-title {
  color: #e0e0e0;
  font-size: 1.2rem;
  font-weight: 600;
  flex: 1;
}

.confirm-body {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
}

.warning-message {
  text-align: center;
  margin-bottom: 1.5rem;
}

.warning-message h3 {
  color: #e0e0e0;
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.record-info {
  color: #aa8c3c;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background: rgba(170, 140, 60, 0.1);
  border-radius: 2px;
  border: 1px solid #aa8c3c;
}

.warning-text {
  color: rgba(200, 200, 200, 0.8);
  line-height: 1.5;
}

.confirm-footer {
  padding: 1.5rem;
  border-top: 1px solid #aa4444;
  display: flex;
  gap: 1rem;
  justify-content: center;
  background: rgba(170, 68, 68, 0.05);
}

.confirm-terminal .terminal-btn.danger {
  background: #aa4444;
  color: #e0e0e0;
  border: 1px solid #aa4444;
}

.confirm-terminal .terminal-btn.danger:hover {
  background: #bb5555;
  box-shadow: 0 4px 12px rgba(170, 68, 68, 0.3);
}

/* 响应式设计调整 */
@media (max-width: 768px) {
  .confirm-terminal {
    width: 95%;
    margin: 1rem;
  }
  
  .confirm-footer {
    flex-direction: column;
  }
}
</style>