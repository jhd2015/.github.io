<script setup lang="ts">
import { useColumns } from "./columns";

const { columns, dataList } = useColumns();
</script>

<template>
  <div class="flex">
    <pure-table row-key="id" :data="dataList" :columns="columns" />
  </div>
</template>
