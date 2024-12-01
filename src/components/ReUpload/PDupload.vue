<template>
  <div v-loading="loading">
    <el-upload
      v-model:file-list="fileList"
      class="upload-demo"
      drag
      action="#"
      :auto-upload="false"
      :on-change="handleFileChange"
      accept="application/pdf"
      :howFileList="false"
    >
      <el-icon style="font-size: 30px"><UploadFilled /></el-icon>
      <div class="el-upload__text">将 PDF 文件拖拽到此处，或者点击上传</div>
    </el-upload>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as pdfjsLib from "pdfjs-dist";
import shuiYing from "@/assets/shuiYing.png";
import { watermark, ImageLoadimg } from "./useUpload";
import { ElMessage } from "element-plus";
import { handUploadApi } from "@/api/handCopy";

// 配置 Web Worker 路径
onMounted(() => {
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://unpkg.com/pdfjs-dist@4.8.69/build/pdf.worker.min.mjs";
});
const emit = defineEmits(["success"]);
const fileList = ref([]);
const loading = ref(false);

// 文件改变时的处理方法
const handleFileChange = file => {
  const fileReader = new FileReader();
  loading.value = true;
  fileReader.onload = async () => {
    const pdfData = new Uint8Array(fileReader.result);
    try {
      // 使用 pdfjs 加载 PDF
      const pdf = await pdfjsLib.getDocument(pdfData).promise;

      // 清空之前的缩略图
      const thumbnails = [];

      // 获取前 3 页
      for (let pageNum = 1; pageNum <= Math.min(3, pdf.numPages); pageNum++) {
        const ref = await renderPageAsImage(pdf, pageNum);
        thumbnails.push(ref);
      }
      emit("success", { list: thumbnails, name: file.name.split(".")[0] });
    } catch (error) {
      console.error("PDF 加载失败:", error);
    } finally {
      // 释放 PDF 资源
      // pdf.destroy();
      fileList.value = [];
      loading.value = false;
    }
  };

  // 读取文件
  fileReader.readAsArrayBuffer(file.raw);
};

// 渲染页面为图片
const renderPageAsImage = async (pdf, pageNum) => {
  try {
    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale: 1.5 });
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // 设置 canvas 尺寸
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    // 渲染 PDF 页面到 canvas
    await page.render({
      canvasContext: ctx,
      viewport: viewport
    }).promise;
    const img = await ImageLoadimg(shuiYing);
    watermark(img, {
      ctx,
      canvasWidth: canvas.width,
      canvasHeight: canvas.height
    });

    // 将 canvas 转换为图片 URL
    // return canvas.toDataURL()
    return new Promise((resolve, readdir) => {
      canvas.toBlob(blob => {
        const newFile = new File([blob], Date.now() + "feima.png", {
          type: "image/png",
          lastModified: Date.now()
        });

        canvas.remove();
        const formData = new FormData();
        formData.append("file", newFile);
        handUploadApi(formData)
          .then(res => {
            resolve({
              response: res,
              status: "success",
              url: canvas.toDataURL()
            });
          })
          .catch(err => {
            ElMessage.error(err);
            readdir(err);
          });
      });
    });
  } catch (error) {
    console.error(`渲染第 ${pageNum} 页失败:`, error);
  }
};
</script>

<style scoped>
.thumbnails {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.thumbnail img {
  max-width: 100px;
  max-height: 150px;
  object-fit: cover;
}
</style>
