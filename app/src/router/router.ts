import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
// @ts-ignore
import routes from './routes.json'
import store from '../store/store'
// @ts-ignore
import { useToast } from "vue-toastification"

function lazy_load_page(page_path: string) {
    return () => import(`../pages/${page_path}.vue`)
}

const dynamic_routes: RouteRecordRaw[] = routes.map((r: any) => {
    return {
        path: r.dynamic ? `${r.path}/:id` : r.path,
        name: r.name,
        component: lazy_load_page(r.component),
        meta: r.meta,
        beforeEnter: (_to: any, _from: any, next: any) => {
            if (r.auth) {
                if (store.state.walletStore.connected && store.state.solyxStore.connected ) {
                    next()
                    return
                }
                useToast().warning("You must be connected to a wallet to view this page.")
                next({ name: "Home" })
                return
            }

            next()
            return
        }
    }
}) as RouteRecordRaw[]

export default createRouter({
    history: createWebHistory(),
    routes: [...dynamic_routes, { path: '/:pathMatch(.*)*', redirect: "/", }]
})
