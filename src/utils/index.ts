import { ElMessage } from "element-plus";

export function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    // 如果浏览器不支持 navigator.clipboard API，则使用传统的 document.execCommand 方法
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(
    function () {
      ElMessage.success("复制成功！");
    },
    function () {
      ElMessage.error("复制失败，请手动复制！");
    }
  );
}

function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand("copy");
    if (successful) {
      ElMessage.success("复制成功！");
    }
  } catch {
    ElMessage.error("复制失败，请手动复制！");
  }

  document.body.removeChild(textArea);
}
