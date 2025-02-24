<template>
  <q-card class="my-card">
    <q-img :src="'http://localhost:3000' + product.imageUrl" style="max-width: 50px;"></q-img>
    <q-card-actions>
      <q-btn flat @click="select">Select</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { type Product } from 'src/models'

const props = defineProps<{
  product: Product
}>()

const emit = defineEmits<{
  select: [product: Product]
}>()

function select() {
  emit('select', props.product)
}
</script>

<style lang="scss" scoped>
.my-card {
  width: 100%;
  max-width: 180px;
}
</style>
