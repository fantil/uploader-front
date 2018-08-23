<template>
  <div id="app">
    <input v-model="inputValue" />
    <button @click="handleSubmit">添加</button>
    <ul>
      <todo-item v-for="(item, index) of list"
                 :key="index"
                 :content="item"
                 :index="index"
                 @deleteItem="handleDelete">
      </todo-item>
    </ul>
    <uploader></uploader>
  </div>
</template>

<script>
import TodoItem from './components/TodoItem'
import Uploader from './components/Uploader'

export default {
  name: 'App',
  components: {
      'todo-item': TodoItem,
      'uploader': Uploader
  },
  data () {
      return {
          inputValue: '',
          list: []
      }
  },
  methods: {
      handleSubmit() {
          this.list.push(this.inputValue);
          this.inputValue = ''
      },
      handleDelete(index) {
          this.list.splice(index, 1)
      }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
