<template>
  <q-psweet padding>
    <div class="row justify-end"><q-btn icon="add" flat @click="dialog = true"></q-btn></div>

    <q-dialog v-model="dialog" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">{{ id === 0 ? 'Add New Product' : 'Edit Product' }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form ref="form" class="q-gutter-md">
            <q-input
              filled
              v-model="name"
              label="Name *"
              hint="Bakery Name"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Please type something']"
            />
            <q-input
              filled
              v-model="price"
              label="Your price *"
              hint="price is required"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Please type something']"
            />
            <div class="q-gutter-sm">
              <q-radio v-model="category" val="drink" label="Drink" />
              <q-radio v-model="category" val="bakery" label="Bakery" />
            </div>
          </q-form>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" @click="reset" />
          <q-btn flat label="Submit" @click="save" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-table :columns="columns" :rows="productStore.products">
      <template v-slot:body-cell-operation="{ row }">
        <td class="q-td">
          <q-btn flat icon="edit" @click="edit(row)"></q-btn>
          <q-btn flat icon="delete" @click="remove(row)"></q-btn>
        </td>
      </template>
    </q-table>
  </q-psweet>
</template>

<script setup lang="ts">
import type { Product } from 'src/models'
import { onMounted, ref } from 'vue'
import { type QForm, type QTableColumn } from 'quasar'
import { useProductStore } from 'src/stores/productStore'
const dialog = ref(false)
const form = ref<QForm | null>(null)
const columns: QTableColumn[] = [
  {
    name: 'id',
    label: 'ID',
    field: 'id',
    align: 'center',
    sortable: true,
  },
  {
    name: 'name',
    label: 'Name',
    field: 'name',
    align: 'center',
  },
  {
    name: 'category',
    label: 'Category',
    field: 'category',
    align: 'center',
  },
  {
    name: 'price',
    label: 'Price',
    field: 'price',
    align: 'center',
  },
  {
    name: 'operation',
    label: '',
    field: 'operation',
    align: 'center',
  },
]

const productStore = useProductStore()
const id = ref(0)
const name = ref('')
const category = ref<'drink' | 'bakery'>('drink')
const price = ref<number>(10)
onMounted(async () => {
  await productStore.getProducts() // เรียกใช้งานเป็นฟังก์ชัน
})

function edit(row: Product) {
  id.value = row.id
  name.value = row.name
  category.value = row.category
  dialog.value = true
}
function save() {
  form.value?.validate().then(async (success) => {
    if (success) {
      if (id.value === 0) {
        await productStore.addProduct({
          id: id.value,
          name: name.value,
          category: category.value,
          price: price.value,
        })
      } else {
        await productStore.updateProduct({
          id: id.value,
          name: name.value,
          category: category.value,
          price: price.value,
        })
      }
      dialog.value = false
      onReset()
    }
  })
}
function reset() {
  form.value?.resetValidation()
  id.value = 0
  name.value = ''
  category.value = 'drink'
  price.value = 0
  dialog.value = false
}
function remove(row: Product) {
  productStore.delProduct(row)
}
function onReset() {
  id.value = 0
  name.value = ''
  category.value = 'drink'
  price.value = 0
  dialog.value = false
}
</script>
