<script setup lang="ts">
import { ref, reactive, nextTick, watch } from "vue";
import { uesTabTable } from "./uesTabTable";
import { useModel } from "vue";
import dayjs from "dayjs";
import { userAddApi, userUpdateApi, userCoinAddApi } from "@/api/user";
const dialogVisible = defineModel<boolean>();
interface Props {
  data: any;
}
const props = withDefaults(defineProps<Props>(), {
  data: {
    _id: "",
    name: ""
  }
});
function handleClose() {
  dialogVisible.value = false;
}

const today = dayjs();
const ruleForm = ref({
  id: "",
  name: "",
  coin: 0
  // textarea: "",
  // switch: false,
  // num: 0,
  // date: [
  //   today.startOf("day").format("yyyy-MM-dd"),
  //   today.add(1, "year").startOf("day").format("yyyy-MM-dd")
  // ]
});
watch(
  () => dialogVisible.value,
  () => {
    nextTick(() => {
      ruleForm.value = {
        ...props.data,
        name: props.data.phone_info.phoneNumber,
        id: props.data._id,
        coin: 0
      };
      ruleFormRef.value.resetFields();
    });
  }
);

const rules = reactive({});
const emit = defineEmits(["refresh"]);
const loadingSubmit = ref(false);
const ruleFormRef = ref();
async function handSubmit() {
  // const is = await ruleFormRef.value.validate();
  // if (is) {
  //   return;
  // }
  loadingSubmit.value = true;

  const data = {
    ...ruleForm.value
  };
  const formData = new FormData();
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      formData.append(key, data[key]);
    }
  }
  userCoinAddApi(formData)
    .then(() => {
      dialogVisible.value = false;
      emit("refresh");
    })
    .finally(() => {
      loadingSubmit.value = false;
    });
  // if (ruleForm.value?._id) {
  //   formData.append("id", ruleForm.value._id);
  //   userUpdateApi(formData)
  //     .then(() => {
  //       dialogVisible.value = false;
  //       emit("refresh");
  //     })
  //     .finally(() => {
  //       loadingSubmit.value = false;
  //     });
  // } else {
  //   userAddApi(formData)
  //     .then(() => {
  //       dialogVisible.value = false;
  //       emit("refresh");
  //     })
  //     .finally(() => {
  //       loadingSubmit.value = false;
  //     });
  // }
}
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    title="添加星币"
    width="500"
    :before-close="handleClose"
  >
    <el-form
      ref="ruleFormRef"
      label-position="top"
      :model="ruleForm"
      :rules="rules"
      label-width="auto"
      class="demo-ruleForm"
      status-icon
    >
      <el-form-item label="昵称" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入" />
      </el-form-item>

      <!-- <el-form-item label="是否开会员" prop="switch">
        <el-switch v-model="ruleForm.switch" />
      </el-form-item>
      <el-form-item v-if="ruleForm.switch" label="会员时间" prop="switch">
        <el-date-picker
          v-model="ruleForm.date"
          type="daterange"
          range-separator="至"
          start-placeholder="Start date"
          end-placeholder="End date"
        />
      </el-form-item> -->
      <el-form-item label="星币" prop="coin">
        <el-input-number
          v-model="ruleForm.coin"
          :min="0"
          controls-position="right"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="loadingSubmit" @click="handSubmit">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
