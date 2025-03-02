import { defineStore, acceptHMRUpdate } from 'pinia'
import { Loading, Notify } from 'quasar'
import { api } from 'src/boot/axios'
import { type Role } from 'src/models'
import { ref } from 'vue'

export const useRoleStore = defineStore('role', () => {
    const roles = ref<Role[]>([])

    async function addRole(u: Role) {
        try {
            Loading.show()
            const res = await api.post('/roles', u)
            console.log(res.data)
            await getRoles()
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
    async function delRole(u: Role) {
        try {
            Loading.show()
            const res = await api.delete('/roles/' + u.id)
            console.log(res.data)
            await getRoles()
        } catch (err) {
            console.error(err)
            Notify.create({
                color: 'negative',
                position: 'top',
                message: 'Delete failed',
                icon: 'report_problem'
            })
        } finally {
            console.log('finally')
            Loading.hide()
        }
    }
    async function updateRole(u: Role) {
        try {
            Loading.show()
            const res = await api.patch('/roles/' + u.id, u)
            console.log(res.data)
            await getRoles()
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

    async function getRoles() {
        try {
            Loading.show()
            const res = await api.get('/roles')
            console.log(res.data)
            roles.value = res.data
        } catch (err) {
            console.error(err)
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
    getRoles()
    return { roles, addRole, delRole, updateRole, getRoles }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useRoleStore, import.meta.hot))
}
