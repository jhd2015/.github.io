<script lang="ts" setup>
import { ref } from "vue";
import type { TabsPaneContext } from "element-plus";
import TabTable from "./tabs/TabTable.vue";
import { Search } from "@element-plus/icons-vue";
const activeName = ref("first");
const searchModel = ref("");

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
defineOptions({
  name: "lmitedTimeTabs"
});
</script>

<template>
  <div class="shell">
    <div class="searchBox">
      <el-input
        v-model="searchModel"
        :suffix-icon="Search"
        style="width: 240px; margin-right: 20px"
        placeholder="请输入"
      />
      <el-button type="primary">刷新</el-button>
    </div>

    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="手抄报" name="first">
        <TabTable type="1" />
      </el-tab-pane>
      <el-tab-pane label="教辅资料" name="second">
        <TabTable type="2" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="scss" scoped>
.shell {
  position: relative;
  flex: 1;
  height: 100%;
  background-color: #fff;

  .searchBox {
    position: absolute;
    top: 0;
    right: 0;
  }

  :deep(.el-tabs) {
    width: 100%;
    height: 100%;

    .el-tab-pane {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
