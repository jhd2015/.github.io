<script setup lang="ts">
import { ref, unref, onMounted } from "vue";
import { uesTabTable } from "./uesTabTable";
import { copyTextToClipboard } from "@/utils";
import { Search } from "@element-plus/icons-vue";
import DialogForm from "./DialogForm.vue";
interface Props {
  isStarCoin: any;
}
const props = withDefaults(defineProps<Props>(), {
  isStarCoin: false
});
const {
  columns,
  options,
  handleSelectionChange,
  handDelete,
  tableData,
  loadData,
  headOperationAll,
  searchModel,
  handUpper,
  handLower,
  pagination,
  onSizeChange,
  onCurrentChange
} = uesTabTable(props);

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

const dialogVisible = ref(false);
const dialogDtata = ref({});
function handEdit(data) {
  dialogVisible.value = true;
  dialogDtata.value = data;
}
function handAdd() {
  dialogDtata.value = {};
  dialogVisible.value = true;
}
onMounted(() => {
  loadData();
});
defineOptions({
  name: "teachingAidsList"
});
</script>

<template>
  <div class="flex">
    <div class="head">
      <div>教辅资料</div>
      <div>
        <el-input
          v-model="searchModel.title"
          :suffix-icon="Search"
          style="width: 240px; margin-right: 20px"
          placeholder="请输入名称"
          @keyup.enter="loadData"
        />
        <el-button @click="headOperationAll('upper')">批量上架</el-button>
        <el-button @click="headOperationAll('lower')">批量下架</el-button>
        <el-button @click="headOperationAll('delete')">批量删除</el-button>
        <el-button
          v-if="!props.isStarCoin"
          type="primary"
          @click="headOperationAll('free')"
        >
          设置免费
        </el-button>
        <el-button type="primary" @click="handAdd">新增</el-button>
      </div>
    </div>
    <pure-table
      row-key="id"
      :columns="columns"
      :data="tableData.list"
      :loading="tableData.isLoading"
      adaptive
      :pagination="pagination"
      @selection-change="handleSelectionChange"
      @page-size-change="onSizeChange"
      @page-current-change="onCurrentChange"
    >
      <template #img="{ row }">
        <div v-if="row?.img" class="imgBox">
          <el-image
            :preview-teleported="true"
            :src="row.img[0]"
            fit="fill"
            :preview-src-list="row.img"
          />
        </div>
      </template>
      <template #jointLevel1>
        <div ref="buttonRef" v-click-outside="onClickOutside">一级分类</div>
      </template>
      <template #jointLevel2>
        <div v-click-outside="onClickOutside">二级分类</div>
      </template>
      <template #jointLevel3>
        <div v-click-outside="onClickOutside">三级分类</div>
      </template>
      <template #state>
        <el-tag type="primary">状态</el-tag>
        <!-- <el-tag type="success">Tag 2</el-tag>
        <el-tag type="info">Tag 3</el-tag>
        <el-tag type="warning">Tag 4</el-tag>
        <el-tag type="danger">Tag 5</el-tag> -->
      </template>
      <template #operation="{ row }">
        <div class="table_operation">
          <el-icon @click="copyTextToClipboard(row.baiduLink)">
            <Link />
          </el-icon>
          <el-icon @click="handDelete(row._id)">
            <Remove />
          </el-icon>
          <el-icon @click="handUpper(row._id)">
            <Top />
          </el-icon>
          <el-icon @click="handLower(row._id)">
            <Bottom />
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
  <DialogForm v-model="dialogVisible" :data="dialogDtata" @refresh="loadData" />
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

.imgBox {
  display: flex;
  gap: 10px;

  :deep(.el-image) {
    width: 50px;
    height: 50px;
  }
}
</style>
