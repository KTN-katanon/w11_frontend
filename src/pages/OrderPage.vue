<template>
  <q-page padding>
    <q-table :columns="columns" :rows="orderStore.orders">
    </q-table>
  </q-page>
</template>

<script setup lang="ts">

import { onMounted } from 'vue'
import { type QTableColumn } from 'quasar'
import { useOrderStore } from 'src/stores/orderStore'
const columns: QTableColumn[] = [
  {
    name: 'id',
    label: 'ID',
    field: 'id',
    align: 'center',
    sortable: true,
  },
  {
    name: 'total',
    label: 'Total',
    field: 'total',
    align: 'center',
  },
  {
    name: 'qty',
    label: 'Quantity',
    field: 'qty',
    align: 'center',
  },
  {
    name: 'user',
    label: 'User',
    field: 'user',
    align: 'center',
  },
]

const orderStore = useOrderStore()
onMounted(async () => {
  await orderStore.getOrder()
})
</script>
