import style from "@/pages/Home/index.module.less";
import Header from "@/pages/Home/components/Header";
import CodeInput from "@/pages/Home/components/CodeInput";
import message from "@/components/Message";
import CodeComment from "@/pages/Home/components/CodeComment";
import type { LanguageValue } from "./type";
import { useState } from "react";
import { generateComment } from "@/request/home";

const languageMap: Record<
  LanguageValue,
  { language: string; defaultValue: string; example: string }
> = {
  react: {
    language: "javascript",
    defaultValue: "// 在此粘贴 React 代码...",
    example: `function App() {
                  return (
                    <div>Hello, React!</div>
                      );
                  }
              export default App;`,
  },
  vue: {
    language: "html",
    defaultValue: "<!-- 在此粘贴 Vue 代码... -->",
    example: `<template>
              <div>Hello, Vue!</div>
             </template>
            <script>
              export default {
                name: 'App'
              }
            </script>`,
  },
  javascript: {
    language: "javascript",
    defaultValue: "// 在此粘贴 JavaScript 代码...",
    example: `function greet(name) {
                  return "Hello, " + name + "!";
              }
              console.log(greet("World"));`,
  },
  typescript: {
    language: "typescript",
    defaultValue: "// 在此粘贴 TypeScript 代码...",
    example: `function greet(name: string): string {
                  return "Hello, " + name + "!";
              }
              console.log(greet("World"));`,
  },
  css: {
    language: "css",
    defaultValue: "/* 在此粘贴 CSS 代码... */",
    example: `body {
                  font-family: Arial, sans-serif;
                  background-color: #f0f0f0;
              }
              h1 {
                  color: #333;
              }`,
  },
  html: {
    language: "html",
    defaultValue: "<!-- 在此粘贴 HTML 代码... -->",
    example: `<div>Hello, HTML!</div>`,
  },
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<LanguageValue>("javascript");
  const [editorValue, setEditorValue] = useState(
    languageMap[language].defaultValue,
  );
  const [code, setCode] = useState("");
  const [comment, setComment] = useState("");

  function handleGenerateClick(lan: LanguageValue) {
    const trimmedCode = code?.trim() || "";

    if (!trimmedCode) {
      message.warning("请输入源代码后再生成注释");
      return;
    }

    if (trimmedCode.length < 5) {
      message.warning("代码内容过短，请补充完整的代码逻辑");
      return;
    }

    const codeFeatures = /[{};()[\]=<>]/;
    if (!codeFeatures.test(trimmedCode)) {
      message.warning("输入内容似乎不包含有效的代码特征，请检查后再试");
      return;
    }

    setIsLoading(true);

    generateComment({ code: trimmedCode, code_type: lan })
      .then((res) => {
        if (res.code === 200) {
          setComment(res.data);
        } else {
          message.error("生成注释失败，请稍后重试");
        }
      })
      .catch(() => {
        message.error("生成注释失败，请稍后重试");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleLanguageChange(value: LanguageValue) {
    setLanguage(value);
    setEditorValue(languageMap[value].defaultValue);
    setComment("");
  }

  function onExamplecode() {
    setEditorValue(languageMap[language].example);
  }

  return (
    <div className={style["home-page"]}>
      <Header
        language={language}
        isLoading={isLoading}
        onGenerateClick={handleGenerateClick}
        onLanguageChange={handleLanguageChange}
      ></Header>
      <div className={style["home-content"]}>
        <CodeInput
          editorValue={editorValue}
          editorLanguage={languageMap[language].language}
          setEditorValue={setEditorValue}
          onExamplecode={onExamplecode}
          onCodeInput={setCode}
        ></CodeInput>
        <CodeComment
          language={language}
          editorLanguage={languageMap[language].language}
          isLoading={isLoading}
          commentValue={comment}
        ></CodeComment>
      </div>
    </div>
  );
}
