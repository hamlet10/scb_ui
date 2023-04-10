import Vue from 'vue'
import VueRouter from 'vue-router'
import LogIn from '../modules/auth/LogIn.vue'

Vue.use(VueRouter)



const routes = [
  {
    path: '/',
    redirect: '/appointments'
  },
  {
    path: '/appointments',
    component: ()=> import(/* webpackChunkName: 'appointments' */'../views/Appointments.vue'),
    name:'appointments',
    children:[
      {
        path: '',
        component: () => import(/* webpackChunkName: 'appointmentsCreate' */'@/modules/appointments/components/AppointmentCreate')

      },
      {
        path: 'create',
        component: () => import(/* webpackChunkName: 'appointmentsCreate' */'@/modules/appointments/components/AppointmentCreate')

      },
      {
        path: 'list',
        component: () => import(/* webpackChunkName: 'appointmentsList' */'@/modules/appointments/components/AppointmentList')
      },
    ],
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/login',
    name:'Login',
    component: LogIn
  }
]

const router = new VueRouter({
  mode: "history",
  routes
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.isAuthenticated) {
      next({
        name: 'Login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
