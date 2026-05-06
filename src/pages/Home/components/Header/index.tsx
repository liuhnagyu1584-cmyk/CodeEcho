import style from "@/pages/Home/components/Header/index.module.less";
import Select from "@/components/Select";
import type { LanguageOption, LanguageValue } from "../../type";

function Header({
  language,
  isLoading,
  onLanguageChange,
  onGenerateClick,
}: {
  language: LanguageValue;
  isLoading?: boolean;
  onLanguageChange?: (value: LanguageValue) => void;
  onGenerateClick?: (language: LanguageValue) => void;
}) {
  const languages: LanguageOption[] = [
    { label: "JavaScript", value: "javascript" },
    { label: "TypeScript", value: "typescript" },
    { label: "HTML", value: "html" },
    { label: "CSS", value: "css" },
    { label: "React", value: "react" },
    { label: "Vue", value: "vue" },
  ];

  function handleLanguageChange(value: LanguageValue) {
    if (isLoading || value === language) return;

    onLanguageChange?.(value);
  }

  function handleGenerateClick() {
    if (isLoading) return;

    onGenerateClick?.(language);
  }

  return (
    <div className={style["header-page"]}>
      <div className={style["header-logo"]}>
        CodeEcho <span>AI</span>
      </div>
      <div className={style["header-controls"]}>
        <Select
          disabled={isLoading}
          value={language}
          width={110}
          options={languages}
          onChange={(v) => handleLanguageChange(v)}
        ></Select>
        <button
          disabled={isLoading}
          onClick={handleGenerateClick}
          className={`button ${style["header-control-btn"]}`}
        >
          智能生成
        </button>
      </div>
    </div>
  );
}

export default Header;
