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
            <q-input filled v-model="login" label="Your login *" hint="Login with Email" lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Please type something']" />

            <q-input filled type="password" v-model="password" label="Your Password" lazy-rules
              :rules="[(val) => (val !== null && val !== '') || 'Please type your password']" />
            <q-input filled v-model.number="age" label="Your Age *" hint="Age" lazy-rules type="number"
              :rules="[(val) => val >= 10 || 'Please type age']" />
            <div class="q-gutter-sm">
              <q-radio v-model="gender" val="male" label="Male" />
              <q-radio v-model="gender" val="female" label="Female" />
            </div>
            <div class="q-gutter-sm">
              <q-checkbox v-for="role in roleStore.roles" :key="role.id ?? 0" v-model="roleId" :label="role.name"
                :val="role.id ?? 0" />
            </div>
            <q-file outlined v-model="file" accept="image/*" label="Upload Image">
              <template v-slot:prepend>
                <q-icon name="attach_file" />
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
    <q-table :columns="columns" :rows="userStore.users">
      <template v-slot:body-cell-operation="{ row }">
        <td class="q-td">
          <q-btn flat icon="edit" @click="edit(row)"></q-btn>
          <q-btn flat icon="delete" @click="remove(row)">
            <template #default></template>
          </q-btn>
        </td>
      </template>
      <template v-slot:body-cell-image-url="{ row }">
        <td class="q-td">
          <q-img :src="'http://localhost:3000' + row.imageUrl" style="max-width: 50px;"> </q-img>
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
import { useRoleStore } from 'src/stores/rolesStore'
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
const roleStore = useRoleStore()
const id = ref(0)
const roleId = ref<number[]>([1])
const login = ref('')
const password = ref('')
const gender = ref<'male' | 'female'>('male')
const age = ref<number>(10)
const file = ref<File | null>(null)
onMounted(async () => {
  await roleStore.getRoles()
  await userStore.getUserByEmail
})

function edit(row: User) {
  id.value = row.id
  login.value = row.login
  password.value = row.password
  gender.value = row.gender
  age.value = row.age
  roleId.value = row.roleIds ?? []
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
          gender: gender.value,
          age: age.value,
          roleIds: roleId.value
        }, file.value)
      } else {
        await userStore.updateUser({
          id: id.value,
          login: login.value,
          password: password.value,
          gender: gender.value,
          age: age.value,
          roleIds: roleId.value
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
