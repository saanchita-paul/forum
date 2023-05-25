import {createRouter, createWebHistory} from "vue-router";
import HelloWorld from "../components/HelloWorld.vue"
import Login from "../components/Login.vue";
import DashBoard from "../components/DashBoard.vue";
import {checkRouteAuthentication} from "../services/AuthService.js";
import Register from "../components/Register.vue";
import ForumList from "../components/ForumList.vue";
import CreateForum from "../components/CreateForum.vue";
import ForumDetails from "../components/ForumDetails.vue";

const routes = [
    {
        path: '/',
        name: 'HelloWorld',
        component: HelloWorld,
        meta: {
            isProtected: false
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: {
            isProtected: false
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            isProtected: false
        }
    },
    {
        path: '/dashboard',
        name: 'DashBoard',
        component: DashBoard,
        meta: {
            isProtected: true
        },
        children: [
            {
                path: 'forum-list',
                name: 'ForumList',
                component: ForumList,
                meta: {
                    isProtected: true,
                }
            },
            {
                path: 'forum-add',
                name: 'CreateForum',
                component: CreateForum,
                meta: {
                    isProtected: true,
                }
            },
            {
                path: 'forum/:id',
                name: 'ForumDetails',
                component: ForumDetails,
                meta: {
                    isProtected: true,
                }
            },
        ],
    },
]



const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(checkRouteAuthentication)


export default router