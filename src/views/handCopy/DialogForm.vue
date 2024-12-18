<script setup lang="ts">
import { ref, reactive, watch, onMounted, nextTick } from "vue";
import { getCategoriesApi, handAddApi, handUpdateApi } from "@/api/handCopy";
import ReUpload from "@/components/ReUpload/index.vue";
import { ElMessageBox } from "element-plus";
const dialogVisible = defineModel<boolean>();
interface Props {
  data: any;
}
const props = withDefaults(defineProps<Props>(), {
  data: {
    _id: "",
    number: "",
    title: "",
    month: "",
    festival: "",
    baiduLink: "",
    img: [],
    monthFestival: []
  }
});
const ruleForm = ref<{
  _id?: string;
  number?: string;
  starCoin: number;
  title: string;
  month: string;
  festival: string;
  baiduLink: string;
  img: any[];
  monthFestival?: string[];
}>({
  _id: "",
  starCoin: 0,
  title: "",
  month: "",
  festival: "",
  baiduLink: "",
  img: [],
  monthFestival: []
});
watch(
  () => dialogVisible.value,
  () => {
    nextTick(() => {
      ruleForm.value = {
        ...props.data,
        monthFestival: [props.data.month, props.data.festival].filter(
          item => item
        ),
        starCoin: Number(props.data.starCoin || 0),
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
  starCoin: [{ required: true, message: "不可以为空" }],
  title: [{ required: true, message: "不可以为空" }],
  baiduLink: [{ required: true, message: "不可以为空" }],
  monthFestival: [
    { required: true, message: "不可以为空", type: "array", trigger: "change" }
  ],
  img: [
    {
      type: "array",
      required: true,
      message: "不可以为空"
    }
  ]
});

const loadingSubmit = ref(false);
const ruleFormRef = ref();
async function handSubmit() {
  const is = await ruleFormRef.value.validate();
  if (!is) {
    return;
  }
  // ruleForm.value.fileList = [];
  // debugger;\
  loadingSubmit.value = true;
  const [month, festival] = ruleForm.value.monthFestival;

  const data = {
    ...ruleForm.value,
    monthFestival: undefined,
    month,
    festival,
    img: ruleForm.value.img
      ?.filter(item => {
        if (item.status == "success") {
          return true;
        }
        return false;
      })
      .map(item => {
        return item?.response?.file || item.url;
      })
  };
  const formData = new FormData();
  let isUploading = false;
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
  if (isUploading && (await confirmPromise())) {
    loadingSubmit.value = false;
    return;
  }

  // handAddApi(data);
  if (ruleForm.value?._id) {
    formData.append("id", ruleForm.value._id);
    handUpdateApi(formData)
      .then(() => {
        dialogVisible.value = false;
        emit("refresh");
      })
      .finally(() => {
        loadingSubmit.value = false;
      });
  } else {
    handAddApi(formData)
      .then(() => {
        dialogVisible.value = false;
        emit("refresh");
      })
      .finally(() => {
        loadingSubmit.value = false;
      });
  }
}
function confirmPromise(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    ElMessageBox.confirm("图片还没上传完呢", {
      cancelButtonText: "取消",
      confirmButtonText: "强上"
    })
      .then(() => {
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });
}
const options = ref<any>([]);

onMounted(() => {
  getCategoriesApi().then(res => {
    options.value = res.map(item => {
      return {
        value: item.month,
        label: item.month,
        children: item.festivals.map(({ festival }) => {
          return {
            value: festival,
            label: festival
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
    :title="`${props.data?._id ? '编辑' : '新增'}手抄报`"
    width="500"
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
      <el-form-item label="星币" prop="starCoin">
        <el-input-number
          v-model="ruleForm.starCoin"
          :min="0"
          placeholder="请输入"
        />
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input
          v-model="ruleForm.title"
          show-word-limit
          maxlength="200"
          placeholder="请输入"
        />
      </el-form-item>
      <el-form-item label="月分-节曰" prop="monthFestival">
        <el-cascader v-model="ruleForm.monthFestival" :options="options" />
      </el-form-item>
      <!-- <el-form-item label="月分" prop="month">
        <el-input v-model="ruleForm.month" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="节曰" prop="festival">
        <el-input v-model="ruleForm.festival" placeholder="请输入" />
      </el-form-item> -->
      <!-- <el-form-item label="分类" prop="festival">
        <el-cascader
          v-model="ruleForm.festival"
          :options="options"
          placeholder="请输入"
        />
      </el-form-item> -->
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
