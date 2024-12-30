import shuiYing from "@/assets/shuiYing.png";
import background from "@/assets/heCheng/background.png";
import background2 from "@/assets/heCheng/background2.png";
import hand from "@/assets/heCheng/hand.png";
import hand2 from "@/assets/heCheng/hand2.png";

const compressNn = 1.5;
export function useUpload() {
  async function combineImages(img1, img2): Promise<any> {
    const canvas = document.createElement("canvas");
    const padding = 50; // 白色边框的大小
    const rotateAngle = (-20 * Math.PI) / 180; // 将角度转换为弧度
    const img1Width = img1.width;
    const img1Height = img1.height;
    const img2Width = img2?.width || 0;
    const img2Height = img2?.height || 0;

    // 设置 canvas 的宽度和高度，考虑到旋转后的图片尺寸变化
    canvas.width = Math.max(img1Width, img2Width) + 2 * padding;
    canvas.height = Math.max(img1Width, img2Width) + 3 * padding;

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "red"; // 设置背景色为红色
    ctx.fillRect(0, 0, canvas.width, canvas.height); // 填充背景

    // 绘制第一张图片
    const img1X = (canvas.width - img1Width) / 2;
    const img1Y = img2 ? padding + 50 : padding; // 居中后向下偏移 50px
    ctx.drawImage(img1, img1X, img1Y, img1Width, img1Height);

    // 绘制第二张图片
    // 旋转前需要先平移到正确的位置
    ctx.save();
    if (img2) {
      const img2X = (canvas.width - img2Width) / 2;
      const img2Y = padding; // 在第一张图片下方
      ctx.translate(img2X + img2Width / 2, img2Y + img2Height / 2);
      ctx.rotate(rotateAngle);
      // 因为旋转了，所以需要将图片平移回原位置
      ctx.drawImage(
        img2,
        -img2Width / 2,
        -img2Height / 2,
        img2Width,
        img2Height
      );
      ctx.restore();
    }

    // 水印
    const img = await ImageLoadimg(shuiYing);
    watermark(img, {
      ctx,
      canvasWidth: canvas.width,
      canvasHeight: canvas.height
    });

    // 将画布内容转换为 Blob
    return new Promise(resolve => {
      canvas.toBlob(blob => {
        const newFile = new File([blob], "merged-image.png", {
          type: "image/png",
          lastModified: Date.now()
        });
        canvas.remove();
        resolve({ raw: newFile, url: URL.createObjectURL(blob) });
      });
    });
  }

  function getFileReader(file): Promise<HTMLImageElement> {
    const reader = new FileReader();
    return new Promise(resolve => {
      reader.onload = async (e: any) => {
        const img = await ImageLoadimg(e.target.result as string);
        resolve(img);
      };
      reader.readAsDataURL(file);
    });
  }

  return {
    combineImages,
    getFileReader,
    ImageLoadimg,
    watermark
  };
}
export function useUploadVertical() {
  async function combineImages(
    img: HTMLImageElement,
    compress = compressNn
  ): Promise<any> {
    const canvas = document.createElement("canvas");

    let backgroundRec: HTMLImageElement;
    let rotateAngle = (-11.7 * Math.PI) / 180; // 将角度转换为弧度
    let handRec: HTMLImageElement;
    let handRecY = 0,
      handRecX = 0,
      isX = img.width > img.height;

    if (img.width > img.height) {
      // 横屏图片
      backgroundRec = await ImageLoadimg(background2);
      handRec = await ImageLoadimg(hand2);
      rotateAngle = (-9.7 * Math.PI) / 180; // 将角度转换为弧度
    } else {
      // 竖屏图片
      backgroundRec = await ImageLoadimg(background);
      handRec = await ImageLoadimg(hand);
    }

    const img1Width = backgroundRec.width / compress;
    const img1Height = backgroundRec.height / compress;

    canvas.width = img1Width;
    canvas.height = img1Height;
    handRecY = canvas.height - handRec.height / compress;
    if (isX) {
      handRecY -= 80;
    }

    const ctx = canvas.getContext("2d");

    // 绘制背景
    ctx.drawImage(backgroundRec, 0, 0, img1Width, img1Height);

    // 绘制第二张图片
    // 旋转前需要先平移到正确的位置
    if (isX) {
      ctx.save();
      const imgWidth = 983.05 / compress;
      const imgHeight = 695 / compress;
      const img2X = (canvas.width - imgWidth) / 2;
      const img2Y = (canvas.height - imgHeight) / 2 - 80;
      ctx.translate(img2X + imgWidth / 2, img2Y + imgHeight / 2);
      ctx.rotate(rotateAngle);
      // 因为旋转了，所以需要将图片平移回原位置
      ctx.drawImage(
        img,
        -imgWidth / 2 + 12 / compress,
        -imgHeight / 2 + 200 / compress,
        imgWidth,
        imgHeight
      );
      ctx.restore();
    } else {
      ctx.save();
      const imgWidth = 795 / compress;
      const imgHeight = 1123.14 / compress;
      const img2X = (canvas.width - imgWidth) / 2;
      const img2Y = (canvas.height - imgHeight) / 2;
      ctx.translate(img2X + imgWidth / 2, img2Y + imgHeight / 2);
      ctx.rotate(rotateAngle);
      // 因为旋转了，所以需要将图片平移回原位置
      ctx.drawImage(
        img,
        -imgWidth / 2 - 3 / compress,
        -imgHeight / 2 + 55 / compress,
        imgWidth,
        imgHeight
      );
      ctx.restore();
    }

    ctx.drawImage(
      handRec,
      handRecX,
      handRecY,
      handRec.width / compress,
      handRec.height / compress
    );

    // 水印
    const shuiYingSrc = await ImageLoadimg(shuiYing);
    watermark(shuiYingSrc, {
      ctx,
      canvasWidth: canvas.width,
      canvasHeight: canvas.height
    });

    // canvas.width = img1Width / 2;
    // canvas.height = img1Height / 2;
    // 将画布内容转换为 Blob
    return new Promise(resolve => {
      canvas.toBlob(async blob => {
        const maxSize = (1 * 1024 * 1024) / 2;

        let newFile = new File([blob], Date.now() + ".png", {
          type: "image/png",
          lastModified: Date.now()
        });
        if (newFile.size > maxSize) {
          newFile = await compressNnImageTo1MB(newFile, maxSize);
        }
        canvas.remove();
        resolve({ raw: newFile, url: URL.createObjectURL(blob) });
      });
    });
  }

  function getFileReader(file): Promise<HTMLImageElement> {
    const reader = new FileReader();
    return new Promise(resolve => {
      reader.onload = async (e: any) => {
        const img = await ImageLoadimg(e.target.result as string);
        resolve(img);
      };
      reader.readAsDataURL(file);
    });
  }

  return {
    combineImages,
    getFileReader,
    ImageLoadimg,
    watermark
  };
}

export function ImageLoadimg(src): Promise<HTMLImageElement> {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => {
      resolve(img);
    };
    img.src = src;
  });
}
// 水印方法
export function watermark(watermarkImg, { ctx, canvasWidth, canvasHeight }) {
  const spacingX = 100 / compressNn; // 水印在 X 轴上的间隔
  const spacingY = 100 / compressNn; // 水印在 Y 轴上的间隔
  const watermarkWidth = watermarkImg.width / compressNn;
  const watermarkHeight = watermarkImg.height / compressNn;

  // 计算水印的数量
  const numWatermarksX = Math.ceil(canvasWidth / (watermarkWidth + spacingX));
  const numWatermarksY = Math.ceil(canvasHeight / (watermarkHeight + spacingY));

  // 循环绘制多个水印
  for (let i = 0; i < numWatermarksX; i++) {
    for (let j = 0; j < numWatermarksY; j++) {
      const x = i * (watermarkWidth + spacingX);
      const y = j * (watermarkHeight + spacingY);
      // ctx.globalAlpha = 0.5; // 设置水印透明度
      ctx.drawImage(watermarkImg, x, y, watermarkWidth, watermarkHeight);
      // ctx.globalAlpha = 1.0; // 恢复默认透明度
    }
  }
}
export function compressNnImageTo1MB(file, maxSize): Promise<File> {
  return new Promise(resolve => {
    imgBox(file).then(img => {
      compressImage(img, file, maxSize, resolve);
    });
  });
}
function compressImage(img, file, maxSize, callback, n = 10) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // 设置压缩后的宽度和高度
  let width = img.width - n;
  let height = img.height - n;
  console.log(width, height);
  canvas.width = width;
  canvas.height = height;
  img.width = width;
  img.height = height;

  // 绘制压缩后的图片
  ctx.drawImage(img, 0, 0, width, height);

  // 转换为Blob并检查大小
  canvas.toBlob(
    blob => {
      if (blob.size > maxSize) {
        // 如果压缩后仍然超过大小限制，可以进一步降低质量
        compressImage(img, file, maxSize, callback, n + 10);
      } else {
        // 创建一个新的File对象
        let compressedFile = new File([blob], file.name + ".png", {
          type: file.type,
          lastModified: Date.now()
        });
        callback(compressedFile);
      }
    },
    file.type,
    1
  ); // 图片质量为80%
}
function imgBox(file) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onerror = error => {
      console.error("Error reading file:", error);
    };
    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        resolve(img);
      };
      img.src = e.target.result as any;
    };
    reader.readAsDataURL(file);
  });
}
