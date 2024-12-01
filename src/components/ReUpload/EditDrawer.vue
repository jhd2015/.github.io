<template>
  <el-drawer
    v-model="visible"
    title="图片设置"
    direction="rtl"
    :before-close="handleClose"
  >
    <el-form
      :model="form"
      label-width="auto"
      label-position="top"
      style="max-width: 600px"
    >
      <el-form-item label="设置开关">
        <el-switch v-model="form.switch" />
      </el-form-item>
      <el-form-item label="图片比例">
        <div class="proportion">
          <el-input-number
            v-model="form.proportion[0]"
            :min="1"
            :max="999"
            controls-position="right"
          />
          <div class="ml-5 mr-5">:</div>
          <el-input-number
            v-model="form.proportion[1]"
            :min="1"
            :max="999"
            controls-position="right"
          />
        </div>
      </el-form-item>
      <el-form-item label="旋转图片">
        <el-input-number
          v-model="form.rotate"
          :min="0"
          :max="360"
          controls-position="right"
        />
      </el-form-item>
      <el-form-item label="示例图">
        <el-upload
          ref="uploadRef"
          v-model:file-list="fileList"
          list-type="picture-card"
          :limit="1"
          :beforeUpload="beforeUpload"
          :on-change="handChange"
          :http-request="httpRequest"
        >
          <el-icon>
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <img :src="imgsrc" />
  </el-drawer>
  <!-- <el-form-item label="水映图">
        <el-switch v-model="form.water" />
      </el-form-item> -->
</template>

<script lang="ts" setup>
import { nextTick } from "vue";
import { reactive, ref } from "vue";
interface Props {
  name: string;
}
const props = withDefaults(defineProps<Props>(), {
  name: "1"
});
const visible = defineModel<boolean>();
const fileList = ref<any[]>([]);

const form = reactive({
  switch: false,
  rotate: 0,
  water: "",
  proportion: [1, 1]
});
function handleClose() {
  visible.value = false;
}
function handChange(uploadFile) {
  console.log(uploadFile, "uploadFile");
}
async function httpRequest(file: any) {
  console.log(file, "httpRequest");
  await nextTick();
  // file.webkitRelativePath;
  // blobToDataUrl(blob).then(dataUrl => {
  //   // dataUrl 是转换后的 Data URL，可以直接用于 <img> 标签的 src 属性
  //   console.log(dataUrl);
  // }).catch(error => {
  //   console.error('转换 Blob 为 Data URL 失败:', error);
  // });
  file.onSuccess(imgsrc.value);
  return imgsrc.value;
}
async function beforeUpload(file: File): Promise<Blob | boolean> {
  return new Promise((resolve, reject) => {
    editImg(file)
      .then((blob: Blob) => {
        // 假设您想要上传编辑后的图片，您可以在这里处理 blob
        // 例如，您可以创建一个新的 File 对象并添加到 fileList 中
        // const newFile: any = new File([blob], file.name, { type: file.type });xs
        //fileList.value = [newFile]; // 更新文件列表
        console.log("编辑后的图片:", blob);
        resolve(blob); // 允许上传
      })
      .catch(error => {
        console.error("编辑图片失败:", error);
        resolve(false); // 阻止上传
      });
  });
}
const imgsrc = ref<any>("");
function editImg(file) {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = (e: any) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("无法获取 canvas 2D 上下文"));
          return;
        }

        // 假设 form.proportion 是一个宽高比，例如 "4:3"
        const [ratioWidth, ratioHeight] = form.proportion.map(Number);
        const imgRatio = img.width / img.height;
        let newWidth, newHeight;

        // 根据比例缩放图片
        if (imgRatio > ratioWidth / ratioHeight) {
          // 图片更宽，以高度为基准缩放
          newHeight = img.height;
          newWidth = newHeight * (ratioWidth / ratioHeight);
        } else {
          // 图片更高，以宽度为基准缩放
          newWidth = img.width;
          newHeight = newWidth / (ratioWidth / ratioHeight);
        }

        // 计算裁切区域
        const cropX = (img.width - newWidth) / 2;
        const cropY = (img.height - newHeight) / 2;

        // 设置画布大小为裁切后的尺寸
        canvas.width = newWidth;
        canvas.height = newHeight;

        // 如果需要旋转，先进行裁切，然后旋转
        if (form.rotate) {
          // 旋转前先保存当前状态
          ctx.save();
          // 移动画布原点到图片中心
          ctx.translate(newWidth / 2, newHeight / 2);
          // 旋转画布
          ctx.rotate((form.rotate * Math.PI) / 180);
          // 绘制裁切后的图片
          ctx.drawImage(
            img,
            cropX,
            cropY,
            newWidth,
            newHeight,
            -newWidth / 2,
            -newHeight / 2,
            newWidth,
            newHeight
          );
          // 恢复画布状态
          ctx.restore();
        } else {
          // 不需要旋转，直接绘制裁切后的图片
          ctx.drawImage(
            img,
            cropX,
            cropY,
            newWidth,
            newHeight,
            0,
            0,
            newWidth,
            newHeight
          );
        }
        const dataUrl = canvas.toDataURL(file.type);
        imgsrc.value = dataUrl;

        // 将画布内容转换为 Blob
        canvas.toBlob(blob => {
          resolve(blob);
        }, file.type);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}
</script>

<style lang="scss" scoped>
.proportion {
  display: flex;
  align-items: center;
}
</style>
