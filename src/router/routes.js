export const routes = [
  {
    path: '/',
    redirect: 'layout'
  },
  {
    path: '/layout',
    name: 'layout',
    component: () => import('@/layout/index.vue')
  }
]
