const content = `
<template>
  <div>
    新增和编辑的通用组件
  </div>
</template>

<script>
export default {
  name: 'CreateEditModule',
  props: {
    isEdit: {
      type: Boolean,
      default: () => false
    }
  }
}
</script>

<style scoped lang="scss"></style>

`

module.exports = { content }