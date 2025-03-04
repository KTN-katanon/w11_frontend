<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer">
          <template #default></template> </q-btn
        >/>

        <q-toolbar-title> Quasar App </q-toolbar-title>

        <div><q-btn icon="logout" @click="authStore.logout()"></q-btn></div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links {{ authStore.user }}</q-item-label>

        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import EssentialLink, { type EssentialLinkProps } from 'components/EssentialLink.vue'
import { useAuthStore } from 'src/stores/authStore'

const authStore = useAuthStore()
const linksList: EssentialLinkProps[] = [
  {
    title: 'First Page',
    caption: 'first page',
    icon: 'article',
    link: '/first-page',
  },
  {
    title: 'Pos',
    caption: 'Point Of Sale',
    icon: 'coffee',
    link: '/pos',
  },
  {
    title: 'User',
    caption: 'User Management',
    icon: 'account_circle',
    link: '/user-page',
  },
  {
    title: 'Temperature',
    caption: 'Temperature Page',
    icon: 'thermostat',
    link: '/temp-page',
  },
  {
    title: 'Product',
    caption: 'Product Page',
    icon: 'article',
    link: '/product-page',
  },
  {
    title: 'Order',
    caption: 'Order Page',
    icon: 'archive',
    link: '/order-page',
  },
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
