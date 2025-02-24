<template>
  <q-page padding style="width: 600px">
    <div>Pos Page</div>
    <div class="row full-width">
      <div class="col-6">
        <q-scroll-area style="height: 100%; max-width: 600px">
          <div class="row">
            <div v-for="p in productStore.products" :key="p.id ?? 0" class="col-4">
              <ProductCard :product="p" @select="select"></ProductCard>
            </div>
          </div>
        </q-scroll-area>
      </div>
      <div class="col-6">
        <q-scroll-area style="height: 400px; max-width: 400px">
          <table class="q-table">
            <thead>
              <tr>
                <th>id</th>
                <th>name</th>
                <th>price</th>
                <th>amount</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in productItems" :key="item.id">
                <td class="text-center">{{ item.id }}</td>
                <td class="text-center">{{ item.product.name }}</td>
                <td class="text-center">{{ item.product.price }}</td>
                <td class="text-center">{{ item.amount }}</td>
              </tr>
            </tbody>
          </table>
        </q-scroll-area>
        <div class="text-h1">{{ sumPrice }}</div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import ProductCard from 'src/components/ProductCard.vue'
import type { Product } from 'src/models'
import { useProductStore } from 'src/stores/productStore'
import { computed, onMounted, ref } from 'vue'
interface ProductItem {
  id: number
  product: Product
  amount: number
}
const productStore = useProductStore()
onMounted(async () => {
  await productStore.getProducts()
})
let lastProductItemId = 1
const productItems = ref<ProductItem[]>([])
function select(product: Product) {
  console.log(product)
  productItems.value.push({ id: lastProductItemId++, product: product, amount: 1 })
}
const sumPrice = computed(() => {
  let sum = 0
  for (let i = 0; i < productItems.value.length; i++) {
    sum = sum + productItems.value[i]!.product.price
  }
  return sum
})
</script>
