import { defineStore, acceptHMRUpdate } from 'pinia'
import { Loading, Notify } from 'quasar'
import { api } from 'src/boot/axios'
import { type User } from 'src/models'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>([])

  async function addUser(u: User, file: File | null) {
    try {
      Loading.show()
      const formData = new FormData()
      formData.append('login', u.login)
      formData.append('password', u.password)
      formData.append('gender', u.gender)
      formData.append('age', u.age.toString())
      u.roleIds.forEach(id => formData.append('roleIds', id.toString()));
      if (file) {
        formData.append('file', file)
      }
      const res = await api.post('/users', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      console.log(res.data)
      await getUsers()
    } catch (err) {
      console.error(err)
      Notify.create({
        color: 'negative',
        position: 'top',
        message: 'Add failed',
        icon: 'report_problem'
      })
    } finally {
      console.log('finally')
      Loading.hide()
    }
  }
  async function delUser(u: User) {
    try {
      Loading.show()
      const res = await api.delete(`/users/${u.id}`)
      console.log(res.data)
      await getUsers()
    } catch (err) {
      console.log(err)
      Notify.create({
        color: 'negative',
        position: 'top',
        message: 'Delete failed',
        icon: 'report_problem',
      })
    } finally {
      console.log('finally')
      Loading.hide()
    }
  }

  async function updateUser(u: User, file: File | null) {
    try {
      Loading.show()
      const formData = new FormData()
      formData.append('login', u.login)
      formData.append('password', u.password)
      formData.append('gender', u.gender)
      formData.append('age', u.age.toString())
      u.roleIds.forEach(id => formData.append('roleIds', id.toString()));
      if (file) {
        formData.append('file', file)
      }
      const res = await api.patch('/users/' + u.id, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      console.log(res.data)
      await getUsers()
    } catch (err) {
      console.error(err)
      Notify.create({
        color: 'negative',
        position: 'top',
        message: 'Update failed',
        icon: 'report_problem'
      })
    } finally {
      console.log('finally')
      Loading.hide()
    }
  }
  function getUserByEmail(login: string): User | undefined {
    return users.value.find((item) => item.login === login)
  }

  async function getUsers() {
    try {
      Loading.show()
      const res = await api.get('/users')
      console.log(res.data)
      users.value = res.data
    } catch (err) {
      console.error(err)
      console.log('finally')
      Loading.hide()
      Notify.create({
        color: 'negative',
        position: 'top',
        message: 'Loading failed',
        icon: 'report_problem'
      })
    } finally {
      console.log('finally')
      Loading.hide()
    }
  }
  getUsers()
  return { users, addUser, delUser, updateUser, getUserByEmail }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
