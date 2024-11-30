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
    img: []
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
}>({
  title: "",
  type1: "",
  type2: "",
  type3: "",
  baiduLink: "",
  img: []
});
watch(
  () => dialogVisible.value,
  () => {
    ruleForm.value = {
      ...props.data,
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

function handSubmit() {
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
    materialUpdateApi(formData).then(() => {
      dialogVisible.value = false;
      emit("refresh");
    });
  } else {
    materialAddApi(formData).then(() => {
      dialogVisible.value = false;
      emit("refresh");
    });
  }
}
function headPDupload(data: any) {
  ruleForm.value.title = data.name;
  ruleForm.value.img = data.list;
}
</script>

<template>
  <el-dialog v-model="dialogVisible" title="新增手抄报" width="500">
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
        <el-button type="primary" @click="handSubmit"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
