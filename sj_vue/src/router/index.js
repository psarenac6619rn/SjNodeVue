import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NewStolica from "@/views/NewStolica";
import Member from "@/views/Member";
import Login from "@/views/Login";
import Register from "@/views/Register";
import NewDrvo from "@/views/NewDrvo";
import EditDrvo from "@/views/EditDrvo";
import DeleteDrvo from "@/views/DeleteDrvo";
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/newStolica',
        name: 'NewStolica',
        component: NewStolica
    },
    {
        path: '/member/:id',
        name: 'Member',
        component: Member
    },
    {
        path: '/newDrvo',
        name: 'NewDrvo',
        component: NewDrvo
    },
    {
        path: '/editDrvo',
        name: 'EditDrvo',
        component: EditDrvo
    },
    {
    path: '/deleteDrvo',
    name: 'DeleteDrvo',
    component: DeleteDrvo
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
