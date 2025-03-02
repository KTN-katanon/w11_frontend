<template>
  <q-page padding>
    <div>First Page</div>
    <div v-for="u in userStore.users" :key="u.id ?? 0">{{ u.login }}</div>
    <div v-for="p in products" :key="p.id ?? 0">
      <ProductCard :product="p" @select="select"></ProductCard>
    </div>
    <CounterComponent
      :num="2"
      @update="
        (num: number) => {
          console.log('Update counter 1: ' + num)
        }
      "
    ></CounterComponent>
    <CounterComponent :num="4" @update="update2"></CounterComponent>
    <button
      @click="
        router.push({
          name: 'RoutePage',
          params: { id: 10, name: 'Hello' },
          query: { size: 10 },
          hash: '#abc',
        })
      "
    >
      Goto Route Page with name
    </button>
  </q-page>
</template>

<script setup lang="ts">
import CounterComponent from 'src/components/CounterComponent.vue'
import ProductCard from 'src/components/ProductCard.vue'
import type { Product } from 'src/models'
import { useUserStore } from 'src/stores/userStore'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const userStore = useUserStore()
const products = ref<Product[]>([])

function update2(num: number) {
  console.log('Update counter 2: ' + num)
}
function select(product: Product) {
  console.log(product)
}
</script>
