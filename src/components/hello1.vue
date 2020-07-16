<!--
 * @Author: your name
 * @Date: 2020-07-14 20:57:34
 * @LastEditTime: 2020-07-14 21:43:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-ssr\src\components\Hello.vue
-->
<!--  -->
<template>
    <div>
        hello world{{item}}
    </div>
</template>

<script>
    // 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    // 例如：import 《组件名称》 from '《组件路径》';

    export default {
        name: 'hello1',
        asyncData: ({store}) => {
            return store.dispatch('getDataAction')
        },
        computed: {
            item () {
                return this.$store.state.lists;
            }
        }
    }
</script>
<style lang='scss' scoped>
    // @import url(); 引入公共css类

</style>

