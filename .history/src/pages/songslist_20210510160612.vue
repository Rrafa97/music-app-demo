<template>
  <div>
    <div v-for="(index, item) in songs" key="item">
            <van-card
              :desc="'艺术家：' + index.ar[0].name"
              :title="index.name"
              :thumb="index.al.picUrl"
              :centered="false"
              @click="getSong(index.id, index)"
              class="main-color"
              style="background: rgba(#000000, 0)"
            >
              <template #tags>
                <van-tag class="main-color" plain type="danger"
                  >专辑：{{ index.al.name }}</van-tag
                >
              </template>
            </van-card>
          </div>
  </div>
</template>

<script lang="ts">
export default {
  props: ['songs'],
  setup(props:any) {

  }
}
</script>

<style lang="less" scoped>
@import url('@/assets/com.less')
</style>