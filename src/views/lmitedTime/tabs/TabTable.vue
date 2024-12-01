<script setup lang="ts">
import { ref, unref } from "vue";
import { uesTabTable } from "../columns/uesTabTable";

interface Props {
  type: "1" | "2";
}
const props = withDefaults(defineProps<Props>(), {
  type: "1"
});

const { columns, dataList, options } = uesTabTable(props);

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
</script>

<template>
  <div class="flex">
    <pure-table row-key="id" :data="dataList" :columns="columns">
      <template #jointLevel1>
        <div ref="buttonRef" v-click-outside="onClickOutside">一级分类</div>
      </template>
      <template #jointLevel2>
        <div v-click-outside="onClickOutside">二级分类</div>
      </template>
      <template #jointLevel3>
        <div v-click-outside="onClickOutside">三级分类</div>
      </template>
      <template #operation="data">
        <el-icon @click="getData(data)">
          <Link />
        </el-icon>
        <el-icon>
          <Remove />
        </el-icon>
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
</template>
../columns/uesTabTable
