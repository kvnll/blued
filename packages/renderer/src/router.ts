import { createRouter as createClientRouter, createWebHashHistory } from 'vue-router'
import routes from 'pages-generated'
export function createRouter() {
  const router = createClientRouter({
    history: createWebHashHistory(),
    routes,
  })
  return router
}
