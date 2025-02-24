<template>
  <q-page padding style="width: 600px">
    <div>Pos Page</div>
    <div class="row full-width">
      <div class="col-6">
        <q-scroll-area style="height: 100%; max-width: 600px">
          <div class="row">
            <div v-for="p in posStore.products" :key="p.id ?? 0" class="col-4">
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
              <tr v-for="(item, index) in posStore.productItems" :key="index">
                <td>{{ index + 1 }}</td>
                <td class="text-center">{{ item.product.name }}</td>
                <td class="text-center">{{ item.product.price }}</td>
                <td class="text-center">{{ item.amount }}</td>
              </tr>
            </tbody>
          </table>
        </q-scroll-area>
        <div class="text-h1">{{ posStore.sumPrice }}</div>
        <q-btn @click="posStore.addOrder()">Create Order</q-btn>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import ProductCard from 'src/components/ProductCard.vue'
import type { Product } from 'src/models'
import { usePosStore } from 'src/stores/posStore'
import { onMounted } from 'vue'
const posStore = usePosStore()
onMounted(async () => {
  await posStore.getProducts()
})
function select(product: Product) {
  console.log(product)
  posStore.addItem(product)
}

</script>
