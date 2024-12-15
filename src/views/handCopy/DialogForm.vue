<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import { handAddApi, handUpdateApi } from "@/api/handCopy";
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
    img: []
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
}>({
  _id: "",
  starCoin: 0,
  title: "",
  month: "",
  festival: "",
  baiduLink: "",
  img: []
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

const rules = reactive<any>({
  starCoin: [{ required: true, message: "不可以为空" }],
  title: [{ required: true, message: "不可以为空" }],
  baiduLink: [{ required: true, message: "不可以为空" }],
  month: [{ required: true, message: "不可以为空" }],
  img: [
    {
      type: "array",
      required: true,
      message: "不可以为空"
    }
  ],
  festival: [{ required: true, message: "不可以为空" }]
});

const options = [
  {
    value: "guide",
    label: "Guide",
    children: [
      {
        value: "disciplines",
        label: "Disciplines",
        children: [
          {
            value: "consistency",
            label: "Consistency"
          },
          {
            value: "feedback",
            label: "Feedback"
          },
          {
            value: "efficiency",
            label: "Efficiency"
          },
          {
            value: "controllability",
            label: "Controllability"
          }
        ]
      },
      {
        value: "navigation",
        label: "Navigation",
        children: [
          {
            value: "side nav",
            label: "Side Navigation"
          },
          {
            value: "top nav",
            label: "Top Navigation"
          }
        ]
      }
    ]
  },
  {
    value: "component",
    label: "Component",
    children: [
      {
        value: "basic",
        label: "Basic",
        children: [
          {
            value: "layout",
            label: "Layout"
          },
          {
            value: "color",
            label: "Color"
          },
          {
            value: "typography",
            label: "Typography"
          },
          {
            value: "icon",
            label: "Icon"
          },
          {
            value: "button",
            label: "Button"
          }
        ]
      },
      {
        value: "form",
        label: "Form",
        children: [
          {
            value: "radio",
            label: "Radio"
          },
          {
            value: "checkbox",
            label: "Checkbox"
          },
          {
            value: "input",
            label: "Input"
          },
          {
            value: "input-number",
            label: "InputNumber"
          },
          {
            value: "select",
            label: "Select"
          },
          {
            value: "cascader",
            label: "Cascader"
          },
          {
            value: "switch",
            label: "Switch"
          },
          {
            value: "slider",
            label: "Slider"
          },
          {
            value: "time-picker",
            label: "TimePicker"
          },
          {
            value: "date-picker",
            label: "DatePicker"
          },
          {
            value: "datetime-picker",
            label: "DateTimePicker"
          },
          {
            value: "upload",
            label: "Upload"
          },
          {
            value: "rate",
            label: "Rate"
          },
          {
            value: "form",
            label: "Form"
          }
        ]
      },
      {
        value: "data",
        label: "Data",
        children: [
          {
            value: "table",
            label: "Table"
          },
          {
            value: "tag",
            label: "Tag"
          },
          {
            value: "progress",
            label: "Progress"
          },
          {
            value: "tree",
            label: "Tree"
          },
          {
            value: "pagination",
            label: "Pagination"
          },
          {
            value: "badge",
            label: "Badge"
          }
        ]
      },
      {
        value: "notice",
        label: "Notice",
        children: [
          {
            value: "alert",
            label: "Alert"
          },
          {
            value: "loading",
            label: "Loading"
          },
          {
            value: "message",
            label: "Message"
          },
          {
            value: "message-box",
            label: "MessageBox"
          },
          {
            value: "notification",
            label: "Notification"
          }
        ]
      },
      {
        value: "navigation",
        label: "Navigation",
        children: [
          {
            value: "menu",
            label: "Menu"
          },
          {
            value: "tabs",
            label: "Tabs"
          },
          {
            value: "breadcrumb",
            label: "Breadcrumb"
          },
          {
            value: "dropdown",
            label: "Dropdown"
          },
          {
            value: "steps",
            label: "Steps"
          }
        ]
      },
      {
        value: "others",
        label: "Others",
        children: [
          {
            value: "dialog",
            label: "Dialog"
          },
          {
            value: "tooltip",
            label: "Tooltip"
          },
          {
            value: "popover",
            label: "Popover"
          },
          {
            value: "card",
            label: "Card"
          },
          {
            value: "carousel",
            label: "Carousel"
          },
          {
            value: "collapse",
            label: "Collapse"
          }
        ]
      }
    ]
  },
  {
    value: "resource",
    label: "Resource",
    children: [
      {
        value: "axure",
        label: "Axure Components"
      },
      {
        value: "sketch",
        label: "Sketch Templates"
      },
      {
        value: "docs",
        label: "Design Documentation"
      }
    ]
  }
];
const loadingSubmit = ref(false);
async function handSubmit() {
  // ruleForm.value.fileList = [];
  // debugger;\
  loadingSubmit.value = true;
  const data = {
    ...ruleForm.value,
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
      <el-form-item label="月分" prop="month">
        <el-input v-model="ruleForm.month" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="节曰" prop="festival">
        <el-input v-model="ruleForm.festival" placeholder="请输入" />
      </el-form-item>
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
