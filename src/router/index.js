import { createRouter, createWebHistory } from 'vue-router';
import addFile from  '@/components/addFile.vue'
import RegisterForm from "@/components/RegisterForm.vue";
import LoginForm from "@/components/LoginForm.vue";
import DocumentFile from "@/components/DocFiles.vue";
import FIlesByDoc from "@/components/FIlesByDoc.vue";
import RepFileByDoc from "@/components/RepFileByDoc.vue";
import MonitoringErrorRep from "@/components/MonitoringErrorRep.vue";

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
        path: '/docs',
        component: DocumentFile
    },
    {
        path: '/filesByDoc',
        component: FIlesByDoc
    },
    {
        path: '/repFilesByDoc',
        component: RepFileByDoc
    },
    {
      path: '/monitoring',
      component: MonitoringErrorRep
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