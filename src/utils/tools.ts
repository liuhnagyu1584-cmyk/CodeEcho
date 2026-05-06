/**
 * 复制文本到剪贴板
 * @param text 要复制的文本内容
 * @returns Promise<boolean> 返回复制是否成功
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  if (!text) {
    console.warn("Copy text is empty");
    return false;
  }

  // 此 API 在 HTTP 非安全环境下可能不可用（仅 localhost 或 HTTPS）
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.warn("Modern clipboard API failed, trying fallback:", err);
    }
  }

  //  降级方案
  return fallbackCopy(text);
};

/**
 * 传统降级复制方法
 */
const fallbackCopy = (text: string): boolean => {
  const textArea = document.createElement("textarea");

  // 基本设置
  textArea.value = text;

  // 防止在页面上显示该元素
  textArea.style.position = "absolute";
  textArea.style.left = "-999999px";
  textArea.style.top = "-999999px";

  // 防止移动端键盘弹出
  textArea.setAttribute("readonly", "");
  textArea.contentEditable = "true";

  document.body.appendChild(textArea);

  // 选中内容
  textArea.focus();
  textArea.select();
  // 兼容 iOS 的选中范围
  textArea.setSelectionRange(0, textArea.value.length);

  try {
    const successful = document.execCommand("copy");
    return successful;
  } catch (err) {
    console.error("Fallback copy failed:", err);
    return false;
  } finally {
    // 无论成功失败，清理 DOM
    document.body.removeChild(textArea);
  }
};

/**
 * 下载文件的通用函数
 * @param content 文件内容
 * @param fileName 文件名 (包含后缀)
 * @param contentType MIME 类型 (如 'text/javascript', 'application/json')
 */
export const downloadFile = (
  content: string,
  fileName: string,
  contentType: string,
) => {
  // 1. 创建 Blob 对象
  const blob = new Blob([content], { type: contentType });

  // 2. 创建一个指向该 Blob 的 URL
  const url = URL.createObjectURL(blob);

  // 3. 创建一个隐藏的 a 标签并触发下载
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;

  // 将 link 插入 body 以确保在某些浏览器中正常工作
  document.body.appendChild(link);
  link.click();

  // 4. 清理：移除标签并释放 URL 对象
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
