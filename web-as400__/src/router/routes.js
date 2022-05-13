import { LocalStorage } from 'quasar'

const routes = [{
        path: "/",
        component: () =>
            import ("layouts/MainLayout.vue"),
        children: [{
                path: "",
                component: () =>
                    import ("pages/Index.vue"),
            },
            {
                path: "prove",
                component: () =>
                    import ("pages/prove.vue"),
            },
            {
                path: "home",
                component: () =>
                    import ("pages/Index.vue"),
            },
            {
                path: "query",
                component: () =>
                    import ("pages/Query.vue"),
            },
            {
                path: "preference",
                component: () =>
                    import ("pages/Preference.vue"),
                meta: {
                    isAuth: LocalStorage.getItem("currentUser")
                }
            },
        ],
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: "/:catchAll(.*)*",
        component: () =>
            import ("pages/Error404.vue"),
    },
];


export default routes;