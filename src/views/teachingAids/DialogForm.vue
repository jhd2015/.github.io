<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import PDupload from "@/components/ReUpload/PDupload.vue";
import ReUpload from "@/components/ReUpload/index.vue";
import { materialAddApi, materialUpdateApi } from "@/api/teachingAids";

const dialogVisible = defineModel<boolean>();

interface Props {
  data: any;
}
const props = withDefaults(defineProps<Props>(), {
  data: {
    _id: "",
    title: "",
    type1: "",
    type2: "",
    type3: "",
    baiduLink: "",
    img: [],
    starCoin: 0
  }
});
function handleClose() {
  dialogVisible.value = false;
}
const ruleForm = ref<{
  _id?: string;
  title: string;
  type1: string;
  type2: string;
  type3: string;
  baiduLink: string;
  img: any[];
  starCoin: number;
}>({
  title: "",
  type1: "",
  type2: "",
  type3: "",
  baiduLink: "",
  img: [],
  starCoin: 0
});
watch(
  () => dialogVisible.value,
  () => {
    ruleForm.value = {
      ...props.data,
      starCoin: Number(props.data.starCoin || 0),
      img: props.data.img?.map(item => {
        return {
          url: item,
          status: "success"
        };
      })
    };
  }
);
const emit = defineEmits(["refresh"]);
const rules = reactive({
  title: [{ required: true, message: "不可以为空" }],
  type1: [{ required: true, message: "不可以为空" }],
  type2: [{ required: true, message: "不可以为空" }],
  type3: [{ required: true, message: "不可以为空" }],
  img: [
    {
      required: true,
      message: "请上传文件",
      trigger: "change"
    }
  ],
  baiduLink: [{ required: true, message: "不可以为空" }]
});

const loadingSubmit = ref(false);
function handSubmit() {
  loadingSubmit.value = true;

  const data = {
    ...ruleForm.value,
    img: ruleForm.value.img.map(item => {
      return item?.response?.file || item.url;
    })
  };
  const formData = new FormData();
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      if (key == "img") {
        data[key].forEach((item: any, i: number) => {
          formData.append(`img[${i}]`, item);
        });
      } else {
        formData.append(key, data[key]);
      }
    }
  }
  if (ruleForm.value?._id) {
    formData.append("id", ruleForm.value._id);
    materialUpdateApi(formData)
      .then(() => {
        dialogVisible.value = false;
        emit("refresh");
      })
      .finally(() => {
        loadingSubmit.value = false;
      });
  } else {
    materialAddApi(formData)
      .then(() => {
        dialogVisible.value = false;
        emit("refresh");
      })
      .finally(() => {
        loadingSubmit.value = false;
      });
  }
}
function headPDupload(data: any) {
  ruleForm.value.title = data.name;
  ruleForm.value.img = data.list;
}
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="`${props.data?._id ? '编辑' : '新增'}辅材资料`"
    width="800"
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
      <!-- <el-form-item label="编号" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入" />
      </el-form-item> -->
      <el-form-item label="星币" prop="starCoin">
        <el-input-number
          v-model="ruleForm.starCoin"
          :min="0"
          placeholder="请输入"
        />
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="ruleForm.title" placeholder="请输入" />
      </el-form-item>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="年级" prop="type1">
            <el-input v-model="ruleForm.type1" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="学科" prop="type2">
            <el-input v-model="ruleForm.type2" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="类目" prop="type3">
            <el-input v-model="ruleForm.type3" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>

      <!-- <el-form-item label="分类" prop="name">
        <el-cascader
          v-model="ruleForm.cascader"
          :options="options"
          placeholder="请输入"
        />
      </el-form-item> -->
      <el-form-item label="上传文件">
        <PDupload @success="headPDupload" />
      </el-form-item>
      <el-form-item label="百度云链接" prop="baiduLink">
        <el-input
          v-model="ruleForm.baiduLink"
          maxlength="200"
          :autosize="{ minRows: 2, maxRows: 4 }"
          type="textarea"
          placeholder="请输入"
        />
      </el-form-item>
      <el-form-item prop="img">
        <template #label> 上传 </template>
        <ReUpload v-model="ruleForm.img" name="handCopy" />
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
