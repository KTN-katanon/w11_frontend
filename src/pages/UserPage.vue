<template>
  <q-page padding>
    <div class="row justify-end"><q-btn icon="add" flat @click="dialog = true"></q-btn></div>

    <q-dialog v-model="dialog" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">{{ id === 0 ? 'Add New User' : 'Edit User' }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form ref="form" class="q-gutter-md">
            <q-input
              filled
              v-model="login"
              label="Your login *"
              hint="Login with Email"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Please type something']"
            />

            <q-input
              filled
              type="password"
              v-model="password"
              label="Your Password"
              lazy-rules
              :rules="[(val) => (val !== null && val !== '') || 'Please type your password']"
            />
            <q-input
              filled
              v-model.number="age"
              label="Your Age *"
              hint="Age"
              lazy-rules
              type="number"
              :rules="[(val) => val >= 10 || 'Please type age']"
            />
            <div class="q-gutter-sm">
              <q-checkbox v-model="roles" label="Admin" color="teal" val="admin" />
              <q-checkbox v-model="roles" label="User" color="orange" val="user" />
            </div>
            <div class="q-gutter-sm">
              <q-radio v-model="gender" val="male" label="Male" />
              <q-radio v-model="gender" val="female" label="Female" />
            </div>
          </q-form>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" @click="reset" />
          <q-btn flat label="Submit" @click="save" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-table :columns="columns" :rows="userStore.users">
      <template v-slot:body-cell-operation="{ row }">
        <td class="q-td">
          <q-btn flat icon="edit" @click="edit(row)"></q-btn>
          <q-btn flat icon="delete" @click="remove(row)">
            <template #default></template>
          </q-btn>
        </td>
      </template>
    </q-table>
  </q-page>
</template>

<script setup lang="ts">
import type { User } from 'src/models'
import { onMounted, ref } from 'vue'
import { type QForm, type QTableColumn } from 'quasar'
import { useUserStore } from 'src/stores/userStore'
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
    name: 'login',
    label: 'Login',
    field: 'login',
    align: 'center',
  },
  {
    name: 'password',
    label: 'Password',
    field: 'password',
    align: 'center',
  },
  {
    name: 'operation',
    label: '',
    field: 'operation',
    align: 'center',
  },
]

const userStore = useUserStore()
const id = ref(0)
const login = ref('')
const password = ref('')
const roles = ref<('admin' | 'user')[]>(['user'])
const gender = ref<'male' | 'female'>('male')
const age = ref<number>(10)
onMounted(async () => {
  await userStore.getUserByEmail
})

function edit(row: User) {
  id.value = row.id
  login.value = row.login
  password.value = row.password
  dialog.value = true
}

function save() {
  form.value?.validate().then(async (success) => {
    if (success) {
      if (id.value === 0) {
        await userStore.addUser({
          id: id.value,
          login: login.value,
          password: password.value,
          roles: roles.value,
          gender: gender.value,
          age: age.value,
        })
      } else {
        await userStore.updateUser({
          id: id.value,
          login: login.value,
          password: password.value,
          roles: roles.value,
          gender: gender.value,
          age: age.value,
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
  login.value = ''
  password.value = ''
  dialog.value = false
}
function remove(row: User) {
  userStore.delUser(row)
}
function onReset() {
  id.value = 0
  login.value = ''
  password.value = ''
  dialog.value = false
}
</script>
