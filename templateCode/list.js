const content = `
<template>
  <div>
    <list-table
      :columns="columns"
      :data="dataSource"
      :pagination="queryParams"
      @pagingChange="handlePagingChange"
    >
      <template #operation="{ row }">
        <operation-btn
          :btn-groups="btnGroups"
          @command="handleCommand($event, row)"
        />
      </template>
    </list-table>
    <dialog-theme
      title="提示"
      :visible.sync="removeDialog"
      @onConfirmEvent="handleConfirm"
    >
      <div>
        是否删除？
      </div>
    </dialog-theme>
  </div>
</template>

<script>
import ListTable from '@/components/ListTable'
import OperationBtn from '@/components/OperationButton'
import DialogTheme from '@/components/DialogTheme'

export default {
  name: '这里需要对应router的name',
  components: { ListTable, OperationBtn, DialogTheme },
  data() {
    return {
      removeDialog: false,
      dataSource: [],
      currentRow: {},
      btnGroups: [
        { btnName: '详情', command: 'detail' },
        { btnName: '编辑', command: 'edit' },
        { btnName: '删除', command: 'remove' }
      ],
      queryParams: {
        keyword: '',
        currentPage: 1,
        sizeNum: 20,
        total: 0
      },
      columns: [
        { label: '示例', prop: 'test' },
        { label: '操作', slotName: 'operation', width: 180 }
      ]
    }
  },
  methods: {
    handlePagingChange(e) {
      console.log(e)
    },
    handleCommand(e, row) {
      this.currentRow = row
      switch (e.command) {
        case 'detail':
          this.$router.push('path')
          break
        case 'remove':
          this.removeDialog = true
          break
        default:
          break
      }
    },
    handleConfirm() {
      this.removeDialog = false
    }
  }
}
</script>

<style scoped lang="scss"></style>

`

module.exports = { content }
