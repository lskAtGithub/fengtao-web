const content = `
<template>
  <div>
    <create-edit-module />
  </div>
</template>

<script>
import CreateEditModule from '../components/CreateEditModule'
export default {
  name: '这里需要对应router的name',
  components: { CreateEditModule }
}
</script>

<style scoped lang="scss"></style>

`

module.exports = { content }