export interface ViewportOffsetResult {
  left: number;
  top: number;
  right: number;
  bottom: number;
  rightIncludeBody: number;
  bottomIncludeBody: number;
}

export function getViewportOffset(element: Element): ViewportOffsetResult {
  const doc = document.documentElement;

  const docScrollLeft = doc.scrollLeft;
  const docScrollTop = doc.scrollTop;
  const docClientLeft = doc.clientLeft;
  const docClientTop = doc.clientTop;

  const pageXOffset = window.pageXOffset;
  const pageYOffset = window.pageYOffset;

  const box = getBoundingClientRect(element);

  const {
    left: retLeft,
    top: rectTop,
    width: rectWidth,
    height: rectHeight
  } = box as DOMRect;

  const scrollLeft = (pageXOffset || docScrollLeft) - (docClientLeft || 0);
  const scrollTop = (pageYOffset || docScrollTop) - (docClientTop || 0);
  const offsetLeft = retLeft + pageXOffset;
  const offsetTop = rectTop + pageYOffset;

  const left = offsetLeft - scrollLeft;
  const top = offsetTop - scrollTop;

  const clientWidth = window.document.documentElement.clientWidth;
  const clientHeight = window.document.documentElement.clientHeight;

  return {
    left: left,
    top: top,
    right: clientWidth - rectWidth - left,
    bottom: clientHeight - rectHeight - top,
    rightIncludeBody: clientWidth - left,
    bottomIncludeBody: clientHeight - top
  };
}

export function getBoundingClientRect(element: Element): DOMRect | number {
  if (!element || !element.getBoundingClientRect) {
    return 0;
  }
  return element.getBoundingClientRect();
}

/**
 * 高亮搜索
 * @param ele
 * @param text
 */

declare const Highlight: any;
declare const CSS: any;
export function highlightText(
  ele: HTMLElement | Node,
  query: string,
  hightName = "search-highlight"
) {
  if (!CSS.highlights) {
    console.error("CSS.highlights API暂不支持!");
    return;
  }

  const str = query.trim().toLowerCase();
  if (!str) {
    return;
  }

  const treeWalker = document.createTreeWalker(ele, NodeFilter.SHOW_TEXT);
  const allTextNodes = [];
  let currentNode = treeWalker.nextNode();
  while (currentNode) {
    allTextNodes.push(currentNode);
    currentNode = treeWalker.nextNode();
  }

  const ranges = allTextNodes
    .map(el => {
      return { el, text: el.textContent?.toLowerCase() };
    })
    .map(({ text, el }) => {
      console.log(text);
      const indices = [];
      let startPos = 0;
      while (startPos < text.length) {
        const index = text.indexOf(str, startPos);
        if (index === -1) break;
        indices.push(index);
        startPos = index + str.length;
      }

      // Create a range object for each instance of
      // str we found in the text node.
      return indices.map(index => {
        const range = new Range();
        range.setStart(el, index);
        range.setEnd(el, index + str.length);
        return range;
      });
    });
  console.log(ranges);
  const searchHighlight = new Highlight(...ranges.flat());
  CSS.highlights.set(hightName, searchHighlight);
}
