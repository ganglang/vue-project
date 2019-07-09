<template>
    <div>
       <div class="sort-menu">
           <div class="menu-column">
               <a :class="type=='top'?'active':'normal'" type="top" @click="changeType('top')">头条</a>
               <a :class="type=='keji'?'active':'normal'" type="keji" @click="changeType('keji')">科技</a>
               <a :class="type=='yule'?'active':'normal'" type="yule" @click="changeType('yule')">娱乐</a>
               <a :class="type=='shehui'?'active':'normal'" type="shehui" @click="changeType('shehui')">社会</a>
           </div>
       </div>
        <div class="news-wrap">
            <ul>
                <li v-for="news in newsList" :key="news.uniquekey">
                    <span class="icon">{{news.category}}</span>
                    <a :href="news.url">
                        <div class="news_img">
                            <img :src="news.thumbnail_pic_s" alt="">
                        </div>
                        <div class="news_content">
                            <p class="news_title">{{news.title}}</p>
                            <span class="news_date">{{news.date}}</span>
                        </div>
                        <div class="clear_both"></div>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        data:function () {
            return {
                newsList:[],
                type:'top'
            }
        },
        methods:{
            getNews:function () {
                this.$store.dispatch('getNews').then(()=>{
                    this.newsList=this.$store.state.news; //注意:vue组件设置本组件的state的写法要注意,要设置state里的newslist属性，直接this.newslist即可
                }).catch(()=>{
                    console.log("error啦!");
                });
            },
           /* getType:function(string){
                var type={
                    'top':"头条",
                    'keji':"科技",
                    'yule':"娱乐",
                    'shehui':"社会"
                }
                return type[string];
            },
            sortNews:function (type) {
                this.type=type;
                this.newsList=this.$store.state.news;
                 this.newsList=this.newsList.filter((i)=>{
                    if(this.getType(this.type)===i.category){
                      return i;
                    }
                });
            },*/
            changeType:function(type){
                this.$store.commit('changeType',type);
                this.type=this.$store.state.type;
                this.newsList=this.$store.getters.backNews;
            }
        },
        created() {
            this.$store.dispatch('getNews').then(()=>{
                this.newsList=this.$store.getters.backNews;
            })
        }
    }
</script>
<style scoped>
    .sort-menu{
        margin-bottom: 10px;
    }
    .sort-menu .menu-column a{
        display: inline-block;
        margin-right: 6px;
        height: 24px;
        line-height: 24px;
        border-radius: 2px;
        padding: 0 8px;
    }
    .sort-menu .menu-column a.normal{
        background: #dddddd;
        color: #ffffff;
    }
    .sort-menu .menu-column a.active{
        background: orange;
        color: #ffffff;
    }
    .news-wrap ul li{
        position: relative;
    }
    .news-wrap ul li .icon{
        display: block;
        width: auto;
        font-size: 10px;
        line-height: 14px;
        height: 14px;
        background: red;
        color: #ffffff;
        position: absolute;
        border-radius: 4px;
        top: 0;
        left: 0;
    }
    .news-wrap ul li .news_img{
        width: 45%;
        float: left;
    }
    .news-wrap ul li .news_content{
        width: 55%;
        float: right;
        padding-left:8px;
    }
    .news-wrap ul li .news_content .news_title{
        font-size: 14px;
        line-height: 18px;
        max-height: 60px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        color: #000;
        margin-bottom: 2px;
    }
    .news-wrap ul li .news_content .news_title:hover{
        color: skyblue;
    }
    .news-wrap ul li .news_content .news_date{
        font-size: 12px;
        color: #000;
    }
</style>