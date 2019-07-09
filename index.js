import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import App from './views/app.vue';
import axios from 'axios';
import './common.css';
import newsObject from './data/products';
Vue.use(VueRouter);
Vue.use(Vuex);
var router=new VueRouter({
    model:'history',
    routes:[{
        path:'/products',
        component:resolve=>require(['./components/products.vue'],resolve)
    },{
        path:'/detail/:id',
        component:resolve=>require(['./components/detail.vue'],resolve)
    },{
        path:'*',
        redirect:'/products'
    }]
})

router.afterEach((to,from,next)=>{

})

var store=new Vuex.Store({
    state:{
        news:[],
        type:'top',
        backNews:[]
    },
    mutations:{
        getNewsList:function (state,response) {
          //  console.log("axios.get before"+JSON.stringify(newsObject.reason)); //product组件dispatch后执行的第二步
            state.news=newsObject.result.data;  //注意：这里不能写成this.state.news，直接用此函数传入的state即可
            //product组件dispatch后执行的第三步
            //console.log("axios.get after:"+state.news);  //product组件dispatch后执行的第四步
        },
        changeType:function (state,type) {
            state.type=type;
        }
    },
    getters:{
        getType:state=>{
            var type={
                'top':"头条",
                'keji':"科技",
                'yule':"娱乐",
                'shehui':"社会"
            }
            return type[state.type];
        },
        backNews:(state,getters)=>{
            state.news=state.news;
           return state.news.filter((i)=>{
               if(getters.getType===i.category){
                    return i;
                }
            });
        }
    },
    actions:{
       getNews:function (context) {
          return  axios.get('http://v.juhe.cn/toutiao/index?type=&key=b57d83c669f89cfd8bcebb2bff84fe28').then((response)=>{
                context.commit('getNewsList',response);
              //  console.log("axios请求成功:");
           }).catch(()=>{
             // console.log('axios出错了 before'); //product组件dispatch后执行的第一步
               context.commit('getNewsList');//product组件dispatch后执行完第一步后，调用mutations里的getNewsList函数
              // console.log("axios出错了 after"); //product组件dispatch后执行的第五步
          })
       }
    }
})

var app=new Vue({
    el:'#app',
    router:router,
    store:store,
    render:h=>h(App)
})