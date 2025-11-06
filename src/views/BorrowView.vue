<template>
    <div class="borrow-view">
      <div class="page-header">
        <h2>借阅管理</h2>
        <p>管理图书借阅和归还</p>
      </div>
  
      <!-- 借阅操作区域 -->
      <div class="action-section">
        <div class="action-card">
          <h3>借阅图书</h3>
          <form @submit.prevent="handleBorrow" class="borrow-form">
            <div class="form-group">
              <label>图书ISBN/书名：</label>
              <input 
                v-model="borrowForm.bookId" 
                placeholder="输入ISBN或书名"
                required
              >
            </div>
            <div class="form-group">
              <label>借阅人：</label>
              <input 
                v-model="borrowForm.borrower" 
                placeholder="输入借阅人姓名"
                required
              >
            </div>
            <button type="submit" class="btn btn-primary">确认借阅</button>
          </form>
        </div>
  
        <div class="action-card">
          <h3>归还图书</h3>
          <form @submit.prevent="handleReturn" class="return-form">
            <div class="form-group">
              <label>借阅记录ID：</label>
              <input 
                v-model="returnForm.recordId" 
                placeholder="输入借阅记录ID"
                required
              >
            </div>
            <button type="submit" class="btn btn-secondary">确认归还</button>
          </form>
        </div>
      </div>
  
      <!-- 借阅记录列表 -->
      <div class="records-section">
        <h3>当前借阅记录</h3>
        <div class="records-table">
          <div class="table-header">
            <div>ID</div>
            <div>图书名称</div>
            <div>借阅人</div>
            <div>借阅日期</div>
            <div>应还日期</div>
            <div>操作</div>
          </div>
          <div 
            v-for="record in borrowRecords" 
            :key="record.id" 
            class="table-row"
          >
            <div>{{ record.id }}</div>
            <div>{{ record.bookName }}</div>
            <div>{{ record.borrower }}</div>
            <div>{{ record.borrowDate }}</div>
            <div>{{ record.dueDate }}</div>
            <div>
              <button 
                @click="returnBook(record.id)" 
                class="btn btn-small"
              >
                归还
              </button>
            </div>
          </div>
          <div v-if="borrowRecords.length === 0" class="empty-state">
            暂无借阅记录
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'BorrowView',
    data() {
      return {
        borrowForm: {
          bookId: '',
          borrower: ''
        },
        returnForm: {
          recordId: ''
        },
        borrowRecords: [
          {
            id: 1,
            bookName: 'Vue.js 实战',
            borrower: '张三',
            borrowDate: '2024-01-15',
            dueDate: '2024-02-15'
          },
          {
            id: 2,
            bookName: 'JavaScript 高级程序设计',
            borrower: '李四',
            borrowDate: '2024-01-10',
            dueDate: '2024-02-10'
          }
        ]
      }
    },
    methods: {
      handleBorrow() {
        if (this.borrowForm.bookId && this.borrowForm.borrower) {
          // 模拟借阅操作
          const newRecord = {
            id: this.borrowRecords.length + 1,
            bookName: `图书-${this.borrowForm.bookId}`,
            borrower: this.borrowForm.borrower,
            borrowDate: new Date().toISOString().split('T')[0],
            dueDate: this.calculateDueDate()
          }
          this.borrowRecords.push(newRecord)
          
          // 重置表单
          this.borrowForm.bookId = ''
          this.borrowForm.borrower = ''
          
          alert('借阅成功！')
        }
      },
      handleReturn() {
        if (this.returnForm.recordId) {
          const recordId = parseInt(this.returnForm.recordId)
          const index = this.borrowRecords.findIndex(record => record.id === recordId)
          
          if (index !== -1) {
            this.borrowRecords.splice(index, 1)
            this.returnForm.recordId = ''
            alert('归还成功！')
          } else {
            alert('未找到该借阅记录')
          }
        }
      },
      returnBook(recordId) {
        const index = this.borrowRecords.findIndex(record => record.id === recordId)
        if (index !== -1) {
          this.borrowRecords.splice(index, 1)
          alert('归还成功！')
        }
      },
      calculateDueDate() {
        const date = new Date()
        date.setDate(date.getDate() + 30) // 30天后应还
        return date.toISOString().split('T')[0]
      }
    }
  }
  </script>
  
  <style scoped>
  .borrow-view {
    max-width: 1000px;
  }
  
  .page-header {
    margin-bottom: 2rem;
  }
  
  .page-header h2 {
    color: #2c3e50;
    margin-bottom: 0.5rem;
    font-size: 1.8rem;
  }
  
  .page-header p {
    color: #6c757d;
    font-size: 1.1rem;
  }
  
  .action-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-bottom: 3rem;
  }
  
  .action-card {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }
  
  .action-card h3 {
    color: #2c3e50;
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    color: #495057;
    font-weight: 500;
  }
  
  .form-group input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    font-size: 0.95rem;
  }
  
  .form-group input:focus {
    outline: none;
    border-color: #1976d2;
  }
  
  .btn {
    padding: 0.6rem 1.2rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.3s ease;
  }
  
  .btn-primary {
    background: #1976d2;
    color: white;
  }
  
  .btn-primary:hover {
    background: #1565c0;
  }
  
  .btn-secondary {
    background: #6c757d;
    color: white;
  }
  
  .btn-secondary:hover {
    background: #5a6268;
  }
  
  .btn-small {
    padding: 0.3rem 0.8rem;
    font-size: 0.8rem;
  }
  
  .records-section h3 {
    color: #2c3e50;
    margin-bottom: 1rem;
    font-size: 1.3rem;
  }
  
  .records-table {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    overflow: hidden;
  }
  
  .table-header {
    display: grid;
    grid-template-columns: 80px 1fr 120px 120px 120px 100px;
    background: #f8f9fa;
    padding: 1rem;
    font-weight: 600;
    color: #495057;
    border-bottom: 1px solid #dee2e6;
  }
  
  .table-row {
    display: grid;
    grid-template-columns: 80px 1fr 120px 120px 120px 100px;
    padding: 1rem;
    border-bottom: 1px solid #f1f3f4;
    align-items: center;
  }
  
  .table-row:hover {
    background: #f8f9fa;
  }
  
  .empty-state {
    padding: 2rem;
    text-align: center;
    color: #6c757d;
    font-style: italic;
  }
  
  /* 响应式设计 */
  @media (max-width: 768px) {
    .action-section {
      grid-template-columns: 1fr;
    }
    
    .table-header,
    .table-row {
      grid-template-columns: 1fr;
      gap: 0.5rem;
    }
  }
  </style>