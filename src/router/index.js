//导入vuerouter
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
export default new VueRouter({
    scrollBehavior(to, from, savePosition) { // 在点击浏览器的“前进/后退”，或者切换导航的时候触发。
    if (savePosition) {
        return savePosition;
    } else {
        var top;
        if (window.innerWidth >= 700) {
             top = 676
        } else {
             top = 267
        }
        return {
            x: 0,
            y: top
        }
    }
},

    // 配置路由规则
    routes: [
        {
            path : '/',
            name:'index',
            component:()=>import('../pages/index.vue'),

        },
        {
            path : '/add',
            name : 'add',
            component:()=>import('../pages/add.vue')
        },
        {
            path : '/likes',
            name : 'likes',
            component:()=>import('../pages/likes.vue')
        },
        {
            path : '/visit',
            name : 'visit',
            component:()=>import('../pages/visit.vue')
        },
        {
            path : '/funs',
            name:'funs',
            component:()=>import('../pages/funs.vue'),
        },
        {
            path : '/person',
            name:'person',
            component:()=>import('../pages/person.vue'),
        },
        {
            path : '/content',
            name:'content',
            component:()=>import('../components/m_content.vue'),
        },
        {
            path : '/item',
            name:'item',
            component:()=>import('../components/m_item.vue'),
        },
        {
            path : '/sign',
            name:'sign',
            component:()=>import('../components/sign.vue'),
        },
        {
            path : '/point',
            name:'point',
            component:()=>import('../components/points.vue'),
        },
        {
            path : '/personal',
            name:'personal',
            component:()=>import('../components/personal.vue'),
        },
        {
            path : '/personalleft',
            name:'personalleft',
            component:()=>import('../components/personalleft.vue'),
        },

        {
            path : '/login',
            name : 'login',
            component:()=>import('../pages/login.vue')
        },
        {
            path : '/reg',
            name : 'reg',
            component:()=>import('../pages/reg.vue')
        },
        {
            path : '/test',
            name : 'test',
            component:()=>import('../pages/test.vue')
        },
        {
            path : '/post',
            name : 'post',
            component:()=>import('../pages/post.vue')
        },
        {
            path : '/feedback',
            name : 'feedback',
            component:()=>import('../pages/feedback.vue')
        },
        {
            path : '/search',
            name : 'search',
            component:()=>import('../pages/search.vue')
        },
        {
            path : '/collection',
            name : 'collection',
            component:()=>import('../pages/collection.vue')
        },
        {
            path : '/daily',
            name : 'daily',
            component:()=>import('../pages/daily.vue')
        },



    ]


})
