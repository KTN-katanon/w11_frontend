<template>
  <q-psweet padding>
    <div class="row justify-end"><q-btn icon="add" flat @click="dialog = true"></q-btn></div>

    <q-dialog v-model="dialog" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">{{ id === 0 ? 'Add New Type' : 'Edit Type' }}</div>
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
          </q-form>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" @click="reset" />
          <q-btn flat label="Submit" @click="save" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-table :columns="columns" :rows="typeStore.types">
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
import type { Type } from 'src/models'
import { onMounted, ref } from 'vue'
import { type QForm, type QTableColumn } from 'quasar'
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
    name: 'name',
    label: 'Name',
    field: 'name',
    align: 'center',
  },
  {
    name: 'operation',
    label: '',
    field: 'operation',
    align: 'center',
  },
]

const typeStore = useTypeStore()
const id = ref(0)
const name = ref('')
onMounted(async () => {
  await typeStore.getTypes() // เรียกใช้งานเป็นฟังก์ชัน
})

function edit(row: Type) {
  id.value = row.id ?? 0
  name.value = row.name
  dialog.value = true
}
function save() {
  form.value?.validate().then(async (success) => {
    if (success) {
      if (id.value === 0) {
        await typeStore.addType({
          name: name.value,
        })
      } else {
        await typeStore.updateType({
          name: name.value,
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
  dialog.value = false
}
function remove(row: Type) {
  typeStore.delType(row)
}
function onReset() {
  id.value = 0
  name.value = ''
  dialog.value = false
}
</script>
