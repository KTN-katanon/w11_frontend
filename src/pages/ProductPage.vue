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
            <q-input filled v-model="name" label="Name *" hint="Bakery Name" lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Please type something']" />
            <q-input filled v-model.number="price" label="Your price *" hint="price is required" lazy-rules
              :rules="[(val) => (typeof val === 'number' && !isNaN(val) && val > 0) || 'Please enter & valid price']" />
            <div class="q-gutter-sm">
              <q-radio v-model="typeId" v-for="t in typeStore.types" :key="t.id ?? 0" :val="t.id ?? 0" :label='t.name' />
            </div>
            <q-file outlined v-model="file" accept="image/*" label="Upload Image">
              <template v-slot:prepend>
                <q-icon name="attach-file"></q-icon>
              </template>
            </q-file>
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
      <template v-slot:body-cell-image-url="{ row }">
        <td class="q-td">
          <q-img :src="'http://localhost:3000' + row.imageUrl" style="max-width: 50px;"></q-img>
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
import { useTypeStore } from 'src/stores/typeStore'
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
    name: 'image-url',
    label: 'Image',
    field: 'imageUrl',
    align: 'center',
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
const typeStore = useTypeStore()
const id = ref(0)
const name = ref('')
const typeId = ref(1)
const price = ref<number>(10)
const file = ref<File | null>(null)
onMounted(async () => {
  await typeStore.getTypes()
  await productStore.getProducts() // เรียกใช้งานเป็นฟังก์ชัน
})

function edit(row: Product) {
  id.value = row.id ?? 0
  name.value = row.name
  price.value = row.price
  typeId.value = row.typeId
  dialog.value = true
}
function save() {
  form.value?.validate().then(async (success) => {
    if (success) {
      if (id.value === 0) {
        await productStore.addProduct({
          id: id.value,
          name: name.value,
          typeId: typeId.value,
          price: price.value,
        }, file.value)
      } else {
        await productStore.updateProduct({
          id: id.value,
          name: name.value,
          typeId: typeId.value,
          price: price.value,
        }, file.value)
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
  typeId.value = 1
  price.value = 0
  dialog.value = false
}
function remove(row: Product) {
  productStore.delProduct(row)
}
function onReset() {
  id.value = 0
  name.value = ''
  typeId.value = 1
  price.value = 0
  dialog.value = false
}
</script>
