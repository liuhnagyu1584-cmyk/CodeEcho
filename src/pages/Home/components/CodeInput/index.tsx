import style from "@/pages/Home/components/CodeInput/CodeInput.module.less";
import Editor, { type Monaco } from "@monaco-editor/react";
import type { editor } from "monaco-editor/esm/vs/editor/editor.api.js";
import { useRef } from "react";

function CodeInput({
  editorLanguage,
  editorValue,
  setEditorValue,
  onExamplecode,
  onCodeInput,
}: {
  editorLanguage: string;
  editorValue: string;
  setEditorValue: (value: string) => void;
  onExamplecode: () => void;
  onCodeInput?: (code: string) => void;
}) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  // 在编辑器挂载后获取实例
  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
  };

  const handleEditorChange = (value: string | undefined) => {
    const val = value || "";
    setEditorValue(val);
    onCodeInput?.(val);
  };

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

  const showExamplecode = () => {
    onExamplecode();

    setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.getAction("editor.action.formatDocument")?.run();
      }
    }, 100);
  };

  return (
    <div className={style["code-input"]}>
      <div className={style["code-input-nav"]}>
        <p>源代码输入</p>
        <div className={style["code-input-nav-actions"]}>
          <button className="button" onClick={showExamplecode}>
            示例代码
          </button>
          <button className="button" onClick={() => setEditorValue("")}>
            清空
          </button>
        </div>
      </div>
      <div className={style["code-input-editor"]}>
        <Editor
          height="100%"
          language={editorLanguage}
          value={editorValue}
          theme="vs-dark"
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          beforeMount={handleEditorWillMount}
          options={{
            fontSize: 18,
            minimap: { enabled: false }, // 隐藏缩略图
            scrollBeyondLastLine: false, // 禁止滚动超过最后一行
            formatOnType: true, // 启用格式化功能
            formatOnPaste: true, // 启用粘贴格式化
          }}
        />
      </div>
    </div>
  );
}

export default CodeInput;
