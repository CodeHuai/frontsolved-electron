export const routes = [
  {
    path: '/',
    redirect: 'layout',
    component: () => import('@/layout/index.vue'),
  }
]
