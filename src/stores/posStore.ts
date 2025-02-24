import { defineStore, acceptHMRUpdate } from 'pinia'
import { Loading, Notify } from 'quasar'
import { api } from 'src/boot/axios'
import { type Product } from 'src/models'
import { computed, ref } from 'vue'
interface ProductItem {
  product: Product
  amount: number
}
export const usePosStore = defineStore('Pos', () => {
  const products = ref<Product[]>([])
  const productItems = ref<ProductItem[]>([])
  async function getProducts() {
    try {
      Loading.show()
      const res = await api.get('/products')
      console.log(res.data)
      products.value = res.data
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
  async function addOrder() {
      try {
        Loading.show()
        const res = await api.post('/orders', {
          userId: 1,
          orderItems: productItems.value.map((item) => {
            return { productId: item.product.id, qty: item.amount}
          })
        })
        console.log(res.data)
        //Clear
        productItems.value = []
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
  const sumPrice = computed(() => {
    let sum = 0
    for (let i = 0; i < productItems.value.length; i++) {
      sum = sum + productItems.value[i]!.product.price
    }
    return sum
  })
  function addItem(p:Product){
    productItems.value.push({product: p, amount: 1})
  }
  return { products, getProducts, productItems ,addItem, sumPrice, addOrder}
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePosStore, import.meta.hot))
}
