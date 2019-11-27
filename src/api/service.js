import api from './index'

export default {
  // ------   Categories -------
  getCategories() {
    return api.get('/categories')
  },
  addCategory(categoryObj) {
    return api.post('/categories', categoryObj)
  },
  removeCategory(categoryId) {
    return api.delete('/categories/' + categoryId)
  },
  // ------ Tasks -------
  getTasks() {
    return api.get('/tasks')
  },
  getTasksByCategory(categoryId) {
    return api.get('/tasks?categoryId=' + categoryId)
  },
  addTask(taskObj) {
    return api.post('/tasks', taskObj)
  },
  removeTask(taskId) {
    return api.delete('/tasks/' + taskId)
  },
  editTask(taskObj) {
    return api.patch('/tasks/' + taskObj.id, taskObj)
  },
  // ------ Colors -------
  getColors() {
    return api.get('/colors')
  }
}