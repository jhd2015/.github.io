// import pdfjs from "pdfjs-dist";
// import mammoth from 'mammoth';
// import htmlToImage from 'html-to-image';

// export function pdfToPng(file, callback) {
//   const reader = new FileReader();
//   reader.onload = function (event) {
//     const typedarray = new Uint8Array(event.target.result as any);
//     pdfjs.getDocument(typedarray).promise.then(pdf => {
//       const pages = [];
//       for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
//         pdf.getPage(pageNum).then(page => {
//           const viewport = page.getViewport({ scale: 1.5 });
//           const canvas = document.createElement("canvas");
//           const canvasContext = canvas.getContext("2d");
//           canvas.height = viewport.height;
//           canvas.width = viewport.width;
//           page.render({ canvasContext, viewport }).promise.then(() => {
//             pages.push(canvas.toDataURL());
//             if (pages.length === 3) {
//               // 只取前三页
//               callback(pages);
//             }
//           });
//         });
//       }
//     });
//   };
//   reader.readAsArrayBuffer(file);
// }

// export function docxToPng(file, callback) {
//   const reader = new FileReader();
//   reader.onload = function (event) {
//     mammoth
//       .convertToHtml({ arrayBuffer: event.target.result as any })
//       .then(function (result) {
//         const pages = [];
//         // 这里需要将 HTML 转换为图片，可以使用第三方库或自定义逻辑
//         // 假设这里有一个函数 htmlToImage(html) 可以将 HTML 转换为图片
//         // pages.push(htmlToImage(result.value));
//         // 如果转换成功，调用 callback
//         callback(pages);
//       });
//   };
//   reader.readAsArrayBuffer(file);
// }
