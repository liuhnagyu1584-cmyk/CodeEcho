import message from "@/components/Message";
import style from "@/pages/Home/components/CodeComment/CodeComment.module.less";
import { copyToClipboard, downloadFile } from "@/utils/tools";
import Editor, { type Monaco } from "@monaco-editor/react";
import type { LanguageValue } from "../../type";

const map: Record<
  LanguageValue,
  {
    contentType: string;
    extension: string;
  }
> = {
  javascript: {
    contentType: "text/javascript",
    extension: "js",
  },
  typescript: {
    contentType: "text/typescript",
    extension: "ts",
  },
  html: {
    contentType: "text/html",
    extension: "html",
  },
  css: {
    contentType: "text/css",
    extension: "css",
  },
  react: {
    contentType: "text/jsx",
    extension: "jsx",
  },
  vue: {
    contentType: "text/plain",
    extension: "vue",
  },
};

function CodeComment({
  language,
  editorLanguage,
  isLoading,
  commentValue,
}: {
  language: LanguageValue;
  editorLanguage: string;
  isLoading?: boolean;
  commentValue?: string;
}) {
  function handleCopy() {
    if (isLoading) {
      message.warning("正在分析逻辑,请稍后再试");
      return;
    }

    copyToClipboard(commentValue || "CodeEcho").then((res) => {
      if (res) {
        message.success("复制成功");
      } else {
        message.error("复制失败");
      }
    });
  }

  function handleDownload() {
    if (isLoading) {
      message.warning("正在分析逻辑,请稍后再试");
      return;
    }

    downloadFile(
      commentValue || "",
      `comment.${map[language].extension}`,
      map[language].contentType,
    );
    message.success("下载成功");
  }

  const handleEditorWillMount = (monaco: Monaco) => {
    const options =
      monaco.languages.typescript.typescriptDefaults.getCompilerOptions();

    if (options.jsx !== monaco.languages.typescript.JsxEmit.React) {
      monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        jsx: monaco.languages.typescript.JsxEmit.React,

        target: monaco.languages.typescript.ScriptTarget.ES2020,

        allowNonTsExtensions: true,

        moduleResolution:
          monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      });
    }
  };

  return (
    <div className={style["code-comment"]}>
      <div className={style["code-comment-nav"]}>
        <p>注释生成结果</p>
        <div className={style["code-comment-nav-actions"]}>
          <button className="button" onClick={handleCopy}>
            <i className="icon-copy"></i>复制
          </button>
          <button className="button" onClick={handleDownload}>
            <i className="icon-download"></i>下载
          </button>
        </div>
      </div>
      <div className={style["code-comment-content"]}>
        <Editor
          height="100%"
          language={editorLanguage}
          // defaultValue="// 结果将在此显示..."
          value={commentValue || ""}
          theme="vs-dark"
          beforeMount={handleEditorWillMount}
          options={{
            fontSize: 18,
            minimap: { enabled: false }, // 隐藏缩略图
            scrollBeyondLastLine: false, // 禁止滚动超过最后一行
            formatOnType: true, // 启用格式化功能
            formatOnPaste: true, // 启用粘贴格式化
          }}
        />
        <div
          className={style["code-comment-loading"]}
          style={{ display: isLoading ? "block" : "none" }}
        >
          <div className={style["code-comment-spinner"]}>
            <div className={style.spinner}></div>
            <p>AI 正在分析逻辑...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodeComment;
