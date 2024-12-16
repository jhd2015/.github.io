<script setup lang="ts">
import { ref, unref } from "vue";
import { uesTabTable } from "./uesTabTable";
import { Search } from "@element-plus/icons-vue";
import DialogForm from "./DialogForm.vue";
import { onMounted } from "vue";

const {
  columns,
  tableData,
  handDelete,
  loadData,
  options,
  handleSelectionChange
} = uesTabTable();

function getData(data) {
  console.log(data, data.row);
}
const propsData = { multiple: true };

const cascaderValue = ref([]);
const buttonRef = ref();
const popoverRef = ref();
const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.();
};
onMounted(() => {
  loadData();
});
const searchModel = ref("");
const dialogVisible = ref(false);
const dialogDtata = ref({});
function handEdit(data) {
  dialogVisible.value = true;
  dialogDtata.value = data;
}
</script>

<template>
  <div class="flex">
    <div class="head">
      <div>用户列表</div>
      <div>
        <el-input
          v-model="searchModel"
          :suffix-icon="Search"
          style="width: 240px; margin-right: 20px"
          placeholder="请输入"
        />

        <!-- <el-button type="primary" @click="dialogVisible = true">新增</el-button> -->
      </div>
    </div>
    <pure-table
      row-key="id"
      :data="tableData.list"
      :loading="tableData.isLoading"
      :columns="columns"
      @selection-change="handleSelectionChange"
    >
      <template #state>
        <el-tag type="primary">状态</el-tag>
        <!-- <el-tag type="success">Tag 2</el-tag>
        <el-tag type="info">Tag 3</el-tag>
        <el-tag type="warning">Tag 4</el-tag>
        <el-tag type="danger">Tag 5</el-tag> -->
      </template>
      <template #operation="{ row }">
        <div class="table_operation">
          <el-icon @click="handDelete(row._id)">
            <Remove />
          </el-icon>

          <el-icon @click="handEdit(row)">
            <Edit />
          </el-icon>
        </div>
      </template>
    </pure-table>
    <el-popover
      ref="popoverRef"
      :virtual-ref="buttonRef"
      width="400px"
      trigger="click"
      virtual-triggering
      placement="bottom-start"
    >
      <div>
        <el-cascader-panel
          v-model="cascaderValue"
          :props="{ multiple: true }"
          :options="options"
        />
      </div>
    </el-popover>
  </div>
  <DialogForm v-model="dialogVisible" :data="dialogDtata" />
</template>
<style lang="scss" scoped>
.flex {
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.head {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
</style>
