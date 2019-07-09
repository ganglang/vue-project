<template>
    <div>
        <div class="content_container">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
     export default {
        data:function () {
          return {
              message:'我是App组件'
          }
        }
    }
</script>
<style scoped></style>