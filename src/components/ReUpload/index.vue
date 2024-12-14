<script setup lang="ts">
import { UploadFile } from "element-plus";
import EditDrawer from "@/components/ReUpload/EditDrawer.vue";
import { ref, nextTick } from "vue";
import { computed } from "vue";
import { debounce } from "@pureadmin/utils";
import { useUploadVertical } from "./useUpload";
import { handUploadApi } from "@/api/handCopy";
interface Props {
  name: string;
}
const props = withDefaults(defineProps<Props>(), {
  name: "1"
});
const { getFileReader, combineImages } = useUploadVertical();
const action = `${import.meta.env.VITE_APP_BASE_API}/upload`;
const fileList = defineModel<any[]>();
const fileListSrc = computed(() => {
  return fileList.value.map(item => {
    return item.url;
  });
});
const editVisible = ref(false);
const dialogImageUrl = ref("");
const initialIndex = ref(0);
const dialogVisible = ref(false);
const disabled = ref(false);
const uploadRef = ref();

const handleRemove = (file: UploadFile) => {
  console.log(file);
  uploadRef.value.handleRemove(file);
};

const handlePictureCardPreview = (index: number) => {
  initialIndex.value = index;
  // dialogImageUrl.value = file.url!;
  dialogVisible.value = true;
};
const checkIndex = ref(0);
const handlePictureCardSelect = (index: any) => {
  const file = fileList.value[index];
  // const check = !file.check;
  fileList.value.forEach(item => {
    item.check = false;
  });
  checkIndex.value = index;
  file.check = true;
};
function handEdit() {
  editVisible.value = true;
}

function handleChange(file, fileList) {
  debounceRealTimeCroppered();
}
const debounceRealTimeCroppered = debounce(mergeImagesVertical, 500);
// async function mergeImages() {
//   const list = [];
//   const combineList = [];
//   fileList.value.forEach(item => {
//     if (item.response || item.status == "success") {
//       list.push(item);
//     } else {
//       combineList.push(item);
//     }
//   });
//   const [file1, file2] = combineList;
//   file1.status = "uploading";
//   if (file2) {
//     file2.status = "uploading";
//   }

//   const src1 = await getFileReader(file1.raw);
//   const src2 = file2 ? await getFileReader(file2.raw) : false;
//   const file = await combineImages(src1, src2);

//   const formData = new FormData();
//   formData.append("file", file.raw);
//   await handUploadApi(formData)
//     .then(res => {
//       file.response = res;
//       file.status = "success";
//       list.push(file);
//       fileList.value = list;
//     })
//     .catch(err => {
//       console.log(err);
//       file.status = "fail";
//       list.push(file);
//       fileList.value = list;
//     });

//   // nextTick(() => {
//   //   debugger;
//   //   uploadRef.value.submit();
//   // });
// }
async function mergeImagesVertical() {
  fileList.value.forEach(item => {
    if (!["success", "uploading"].includes(item.status)) {
      item.status = "uploading";
      getFileReader(item.raw).then(async src => {
        try {
          const file = await combineImages(src);
          const formData = new FormData();
          formData.append("file", file.raw);
          const ret = await handUploadApi(formData);
          ret.file = `${import.meta.env.VITE_APP_BASE_IMG}${ret.file}`;
          item.response = ret;
          item.url = ret.file;
          item.status = "success";
        } catch (error) {
          console.log(error);
          item.status = "fail";
        }
      });
    }
  });
}
</script>

<template>
  <div class="uploadBox">
    <el-upload
      ref="uploadRef"
      v-model:file-list="fileList"
      list-type="picture-card"
      width="100px"
      multiple
      name="file"
      :action="action"
      :auto-upload="false"
      accept="image/*"
      @change="handleChange"
    >
      <!-- <div class="edit" @click.stop="handEdit">
        <el-icon>
          <Edit />
        </el-icon>
      </div> -->
      <el-icon>
        <Plus />
      </el-icon>
      <template #file="{ file, index }">
        <div :key="index" v-loading="file.status == 'uploading'">
          <template v-if="file.status == 'fail'">
            <el-icon><icon-picture /></el-icon>
          </template>
          <template v-else>
            <div class="el-upload-list__item-thumbnail">
              <img width="100%" height="100%" :src="file.url" alt="" />
            </div>
            <div
              v-if="(file as any).check"
              class="el-upload-list__item-status-label"
            >
              <el-icon color="#fff">
                <Check />
              </el-icon>
            </div>
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-actions-preview"
                :style="{
                  color: (file as any).check
                    ? 'var(--el-color-success)'
                    : '#fff'
                }"
                @click="handlePictureCardSelect(index)"
              >
                <el-icon><Select /></el-icon>
              </span>
              <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(index)"
              >
                <el-icon><zoom-in /></el-icon>
              </span>
              <span
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <el-icon>
                  <Delete />
                </el-icon>
              </span>
            </span>
          </template>
        </div>
      </template>
    </el-upload>
    <el-image-viewer
      v-if="dialogVisible"
      v-model="dialogVisible"
      :initial-index="initialIndex"
      :url-list="fileListSrc"
      style="z-index: 99999999999"
      z-index:="99999999999"
      :teleported="true"
      @close="dialogVisible = false"
    />
  </div>
  <!-- <EditDrawer v-model="editVisible" :name="props.name" /> -->
</template>
<style lang="scss" scoped>
.uploadBox {
  display: flex;
  flex-wrap: nowrap;
  gap: 8px;

  :deep(.el-upload--picture-card) {
    --el-upload-picture-card-size: 80px;

    position: relative;
  }

  :deep(.el-upload-list--picture-card) {
    --el-upload-list-picture-card-size: 80px;

    .el-upload-list__item-actions span + span {
      margin-left: 8px;
    }
  }
}

.imageBox {
  width: 100px;
  height: 100px;
}

:deep(.el-upload-list__item.is-success) {
  .el-upload-list__item-status-label {
    display: inline-flex !important;
    opacity: 1 !important;
  }
}

.edit {
  position: absolute;
  top: -25px;
  left: 0;
  z-index: 999;
  cursor: pointer;
}
</style>
