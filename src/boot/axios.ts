import { defineBoot } from '#q-app/wrappers';
import axios, { type AxiosInstance } from 'axios';


declare module 'vue' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: 'http://localhost:3000' });
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve,ms))
}
api.interceptors.request.use((config) => {
  console.log('Request was sent')
  return config
})
api.interceptors.response.use(async (response) => {
  await sleep(2000)
  console.log('Request was received')
  return response
})
export default defineBoot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
