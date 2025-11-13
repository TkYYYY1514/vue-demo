<template>
    <div>
      <h1>图书管理系统</h1>
      <p>欢迎使用图书管理系统！</p>
    </div>

    <div class="book-list">
      <BookCard
        v-for="book in displayedBooks"
        :key="book.id"
        :book="book"
        @toggle-favorite="handleToggleFavorite"
        @edit="handleEdit"
        @delete="handleDelete"
      />
    </div>

  </template>

  <script>
  import { useBooks } from '../stores/books'
  import { ref, computed } from 'vue'
  import BookCard from '../components/BookCard.vue'

  export default {
    name: 'HomeView',
    components: { BookCard },
    setup() {
      const {
        allBooks,
        toggleFavorite,
        deleteBook,
        // ... 其他函数
      } = useBooks()

      // 定义displayedBooks变量
      const displayedBooks = allBooks

      const handleToggleFavorite = (bookId) => {
        toggleFavorite(bookId)
      }

      const handleEdit = (book) => {
        // 处理编辑
      }

      const handleDelete = (book) => {
        // 处理删除
      }

      return {
        // 返回displayedBooks和其他状态与方法
        displayedBooks,
        handleToggleFavorite,
        handleEdit,
        handleDelete
      }
    }
  }
  </script>