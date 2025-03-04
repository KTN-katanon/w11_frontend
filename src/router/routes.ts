import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', name: 'RootPage', component: () => import('pages/IndexPage.vue') }],
    meta: { requiresAuth: false },
  },
  {
    path: '/first-page',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', name: 'FirstPage', component: () => import('pages/FirstPage.vue') }],
    meta: { requiresAuth: false },
  },
  {
    path: '/pos',
    component: () => import('layouts/FullScreen.vue'),
    children: [{ path: '', name: 'PosPage', component: () => import('pages/POSPage.vue') }],
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    component: () => import('layouts/FullScreen.vue'),
    children: [{ path: '', name: 'LoginPage', component: () => import('pages/LoginPage.vue') }],
    meta: { requiresAuth: false },
  },
  {
    path: '/user-page',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', name: 'UserPage', component: () => import('pages/UserPage.vue') }],
    meta: { requiresAuth: true },
  },
  {
    path: '/route-page/:id/:name',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', name: 'RoutePage', component: () => import('pages/RoutePage.vue') }],
    meta: { requiresAuth: false },
  },
  {
    path: '/temp-page',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', name: 'TempPage', component: () => import('pages/TempPage.vue') }],
    meta: { requiresAuth: false },
  },
  {
    path: '/product-page',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', name: 'ProductPage', component: () => import('pages/ProductPage.vue') }],
    meta: { requiresAuth: false },
  },
  {
    path: '/type-page',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', name: 'TypePage', component: () => import('pages/TypePage.vue') }],
    meta: { requiresAuth: false },
  },
  {
    path: '/role-page',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', name: 'RolePage', component: () => import('pages/RolePage.vue') }],
    meta: { requiresAuth: false },
  },
  {
    path: '/order-page',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', name: 'OrderPage', component: () => import('pages/OrderPage.vue') }],
    meta: { requiresAuth: false },
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
