<script setup lang="ts">
import { ref, reactive, watch, nextTick } from "vue";
import PDupload from "@/components/ReUpload/PDupload.vue";
import ReUpload from "@/components/ReUpload/index.vue";
import {
  getCategoriesApi,
  materialAddApi,
  materialUpdateApi
} from "@/api/teachingAids";
import { onMounted } from "vue";

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
    starCoin: 0,
    typeList: []
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
  typeList?: string[];
}>({
  title: "",
  type1: "",
  type2: "",
  type3: "",
  baiduLink: "",
  img: [],
  starCoin: 0,
  typeList: []
});
watch(
  () => dialogVisible.value,
  () => {
    nextTick(() => {
      ruleForm.value = {
        ...props.data,
        starCoin: Number(props.data.starCoin || 0),
        typeList: [props.data.type1, props.data.type2, props.data.type3].filter(
          item => item
        ),
        img: props.data.img?.map(item => {
          return {
            url: item,
            status: "success"
          };
        })
      };
      ruleFormRef.value.resetFields();
    });
  }
);
const emit = defineEmits(["refresh"]);
const rules = reactive<any>({
  title: [{ required: true, message: "不可以为空" }],
  typeList: [
    {
      required: true,
      message: "不可以为空",
      trigger: "change",
      type: "array"
    }
  ],
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
const ruleFormRef = ref();
async function handSubmit() {
  const is = await ruleFormRef.value.validate();
  if (!is) {
    return;
  }
  loadingSubmit.value = true;
  const [type1, type2, type3] = ruleForm.value.typeList;
  const data = {
    ...ruleForm.value,
    type1,
    type2,
    type3,
    img: ruleForm.value?.img.map(item => {
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
const options = ref<any>([]);
onMounted(() => {
  getCategoriesApi().then(res => {
    options.value = res.map(item => {
      return {
        value: item.type1,
        label: item.type1,
        children: item.type2.map(item => {
          return {
            value: item.type2,
            label: item.type2,
            children: item.type3.map(item => {
              return {
                value: item.type3,
                label: item.type3
              };
            })
          };
        })
      };
    });
  });
});
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
      <el-form-item label="年级-学科-类目" prop="typeList">
        <el-cascader
          v-model="ruleForm.typeList"
          style="width: 100%"
          :options="options"
        />
      </el-form-item>

      <!-- <el-row :gutter="20">
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
      </el-row> -->

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
