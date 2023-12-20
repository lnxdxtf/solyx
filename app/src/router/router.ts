import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import routes from './routes.json'

function lazy_load_page(page_path: string) {
    return () => import(`../pages/${page_path}.vue`)
}

const dynamic_routes: RouteRecordRaw[] = routes.map(r => {
    return {
        path: r.dynamic ? `${r.path}/:id` : r.path,
        name: r.name,
        component: lazy_load_page(r.component),
        meta: r.meta,
        beforeEnter: (to: any, from: any, next: any) => {
            if (r.auth) {
                next()
            } else {
                next()
            }
        }
    }
}) as RouteRecordRaw[]

export default createRouter({
    history: createWebHistory(),
    routes: [...dynamic_routes, { path: '/:pathMatch(.*)*', redirect: "/", }]
})