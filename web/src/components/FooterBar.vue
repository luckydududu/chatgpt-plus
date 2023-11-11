<template>
    <div class="container">
      <div class="footer">
        &copy; 2023 <el-link type="primary" href="/" target="_blank">{{title}}</el-link> 版权所有
      </div>
    </div>
</template>
<script setup>

import {ref} from "vue";
const title = ref(process.env.VUE_APP_TITLE);

</script>

<style scoped lang="stylus">
.container {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  display flex;
  justify-content center
  .footer {
    max-width 400px;
    text-align center;
    font-size 14px;
    padding 20px;
    width 100%
  }
}

</style>