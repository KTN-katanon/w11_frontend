import { defineStore, acceptHMRUpdate } from 'pinia'
import { Loading, Notify } from 'quasar'
import { api } from 'src/boot/axios'
import { type Order } from 'src/models'
import { ref } from 'vue'
export const useOrderStore = defineStore('order', () => {
const orders = ref<Order[]>([])

  async function getOrder() {
    try {
      Loading.show()
      const res = await api.get('/orders')
      console.log(res.data)
      orders.value = res.data
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

  


  return { orders, getOrder }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useOrderStore, import.meta.hot))
}
