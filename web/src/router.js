import {createRouter, createWebHistory} from "vue-router";
import {auth0, checkPermissions, hasAccessToken} from "@/action/auth0";
import {ref} from "vue";

const routes = [
    {
        name: 'home',
        path: '/',
        redirect: '/chat',
        meta: { title: '首页', requiresAuth: true },
        component: () => import('@/views/Home.vue'),
        children: [
            {
                name: 'chat',
                path: '/chat',
                meta: {title: '创作中心'},
                component: () => import('@/views/ChatPlus.vue'),
            },
            {
                name: 'image-mj',
                path: '/mj',
                meta: {title: 'MidJourney 绘画中心'},
                component: () => import('@/views/ImageMj.vue'),
            },
            {
                name: 'image-sd',
                path: '/sd/',
                meta: {title: 'Stable Diffusion 绘画中心'},
                component: () => import('@/views/ImageSd.vue'),
            },
            {
                name: 'member',
                path: '/member',
                meta: {title: '会员充值中心'},
                component: () => import('@/views/Member.vue'),
            },
            {
                name: 'chat-role',
                path: '/apps',
                meta: {title: '应用中心'},
                component: () => import('@/views/ChatApps.vue'),
            },
            {
                name: 'images',
                path: '/images-wall',
                meta: {title: '作品展示'},
                component: () => import('@/views/ImagesWall.vue'),
            },
            {
                name: 'user-invitation',
                path: '/invite',
                meta: {title: '推广计划'},
                component: () => import('@/views/Invitation.vue'),
            },
            {
                name: 'knowledge',
                path: '/knowledge',
                meta: {title: '我的知识库'},
                component: () => import('@/views/Knowledge.vue'),
            },
        ]
    },
    {
        name: 'chat-export',
        path: '/chat/export',
        meta: { title: '导出会话记录', requiresAuth: true },
        component: () => import('@/views/ChatExport.vue'),
    },
    {
        name: 'login',
        path: '/login',
        meta: { title: '用户登录', requiresAuth: false },
        component: () => import('@/views/Login.vue'),
    },
    {
        name: 'register',
        path: '/register',
        meta: { title: '用户注册', requiresAuth: false },
        component: () => import('@/views/Register.vue'),
    },
    {
        path: '/admin/login',
        name: 'admin-login',
        meta: { title: 'Chat-Plus 控制台登录', requiresAuth: false },
        component: () => import('@/views/admin/Login.vue'),
    },
    {
        name: 'admin',
        path: '/admin',
        redirect: '/admin/dashboard',
        component: () => import("@/views/admin/Home.vue"),
        meta: { title: 'ChatGPT-Plus 管理后台', requiresAuth: true },
        children: [
            {
                path: '/admin/dashboard',
                name: 'admin-dashboard',
                meta: {title: '仪表盘'},
                component: () => import('@/views/admin/Dashboard.vue'),
            },
            {
                path: '/admin/system',
                name: 'admin-system',
                meta: {title: '系统设置'},
                component: () => import('@/views/admin/SysConfig.vue'),
            },
            {
                path: '/admin/user',
                name: 'admin-user',
                meta: {title: '用户管理'},
                component: () => import('@/views/admin/UserList.vue'),
            },
            {
                path: '/admin/role',
                name: 'admin-role',
                meta: {title: '角色管理'},
                component: () => import('@/views/admin/RoleList.vue'),
            },
            {
                path: '/admin/apikey',
                name: 'admin-apikey',
                meta: {title: 'API-KEY 管理'},
                component: () => import('@/views/admin/ApiKey.vue'),
            },
            {
                path: '/admin/chat/model',
                name: 'admin-chat-model',
                meta: {title: '语言模型'},
                component: () => import('@/views/admin/ChatModel.vue'),
            },
            {
                path: '/admin/product',
                name: 'admin-product',
                meta: {title: '充值产品'},
                component: () => import('@/views/admin/Product.vue'),
            },
            {
                path: '/admin/order',
                name: 'admin-order',
                meta: {title: '充值订单'},
                component: () => import('@/views/admin/Order.vue'),
            },
            {
                path: '/admin/reward',
                name: 'admin-reward',
                meta: {title: '众筹管理'},
                component: () => import('@/views/admin/RewardList.vue'),
            },
            {
                path: '/admin/loginLog',
                name: 'admin-loginLog',
                meta: {title: '登录日志'},
                component: () => import('@/views/admin/LoginLog.vue'),
            },
            {
                path: '/admin/demo/form',
                name: 'admin-form',
                meta: {title: '表单页面'},
                component: () => import('@/views/admin/demo/Form.vue'),
            },
            {
                path: '/admin/demo/table',
                name: 'admin-table',
                meta: {title: '数据列表'},
                component: () => import('@/views/admin/demo/Table.vue'),
            },
            {
                path: '/admin/demo/import',
                name: 'admin-import',
                meta: {title: '导入数据'},
                component: () => import('@/views/admin/demo/Import.vue'),
            },
            {
                path: '/admin/demo/editor',
                name: 'admin-editor',
                meta: {title: '富文本编辑器'},
                component: () => import('@/views/admin/demo/Editor.vue'),
            },
        ]
    },
    {
        path: '/mobile/chat/session',
        name: 'mobile-chat-session',
        component: () => import('@/views/mobile/ChatSession.vue'),
    },
    {
        name: 'mobile',
        path: '/mobile',
        meta: { title: 'ChatGPT-智能助手V3', requiresAuth: true },
        component: () => import('@/views/mobile/Home.vue'),
        redirect: '/mobile/chat/list',
        children: [
            {
                path: '/mobile/chat/list',
                name: 'mobile-chat-list',
                component: () => import('@/views/mobile/ChatList.vue'),
            },
            {
                path: '/mobile/setting',
                name: 'mobile-setting',
                component: () => import('@/views/mobile/Setting.vue'),
            },
            {
                path: '/mobile/profile',
                name: 'mobile-profile',
                component: () => import('@/views/mobile/Profile.vue'),
            },
        ]
    },
    {
        name: 'test',
        path: '/test',
        meta: { title: '测试页面', requiresAuth: false },
        component: () => import('@/views/Test.vue'),
    },
    {
        name: 'NotFound',
        path: '/:all(.*)',
        meta: { title: '页面没有找到', requiresAuth: false },
        component: () => import('@/views/404.vue'),
    },
]

// console.log(MY_VARIABLE)
const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})
const isLoading = ref(false);

let prevRoute = null
// dynamic change the title when router change
router.beforeEach(async (to, from, next) => {
    isLoading.value = true;
    console.info(`beforeEach, to:${to.fullPath}`);
    const requiresAuth = to.meta.requiresAuth;
    if(to.path.startsWith('/error/') || !requiresAuth) {
        next();
        return;
    }
    if (requiresAuth && !(await hasAccessToken())) {
        if (to.query.code && to.query.state) {
            // 处理认证响应
            await auth0.handleRedirectCallback();
            next(to.query.state || '/');
        } else {
            // 该路由需要认证，但用户未登录，重定向到登录页面
            await auth0.loginWithRedirect({appState: {targetUrl: to.fullPath}});
        }
    } else {
        const permission = 'view:chat';
        const hasPermission = await checkPermissions(permission);
        console.info(`beforeEach, hasPermission:permission=>${hasPermission}`);
        if(hasPermission) {
            if (to.meta.title) {
                document.title = `${to.meta.title} | ${process.env.VUE_APP_TITLE}`
            }
            prevRoute = from
            next();
        } else {
            prevRoute = from
            next('/error/404');
        }

    }
})

router.afterEach(() => {
    isLoading.value = false;
});

export {router, prevRoute, isLoading};