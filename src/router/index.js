import { createRouter, createWebHistory } from 'vue-router';
import addFile from  '@/components/addFile.vue'
import RegisterForm from "@/components/RegisterForm.vue";
import LoginForm from "@/components/LoginForm.vue";

const routes =
[
    {
    // path: '/',
    // component: HelloWorld
    },
    {
        path: '/add',
        component: addFile
    },
    {
        path: '/register',
        component: RegisterForm
    },
    {
        path: '/',
        component: LoginForm
    },
]
const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})
export default router;