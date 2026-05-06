import { useState, useRef, useEffect } from "react";
import styles from "./index.module.less";

interface SelectOption<T> {
  label: string;
  value: T;
  disabled?: boolean;
}

interface SelectProps<T> {
  options: SelectOption<T>[];
  value?: T;
  placeholder?: string;
  width?: number | string;
  disabled?: boolean;
  onChange: (value: T) => void;
}

const Select = <T,>({
  options = [],
  value,
  disabled,
  onChange,
  placeholder = "请选择",
  width = 200,
}: SelectProps<T>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement>(null);

  // 查找当前选中的选项
  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionClick = (option: SelectOption<T>) => {
    if (option.disabled) return;
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div className={styles.selectContainer} ref={selectRef} style={{ width }}>
      <div
        className={`${styles.selectTrigger} ${isOpen ? styles.active : ""} ${disabled ? styles.disabled : ""}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span className={!selectedOption ? styles.placeholder : ""}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <i
          className={`icon-dropdown ${styles.arrowIcon} ${isOpen ? styles.up : styles.down}`}
        ></i>
      </div>

      {isOpen && (
        <ul className={styles.selectMenu}>
          {options.map((option, index) => (
            <li
              key={index}
              className={`
                ${styles.selectOption} 
                ${value === option.value ? styles.selected : ""} 
                ${option.disabled ? styles.disabled : ""}
              `}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </li>
          ))}
          {options.length === 0 && (
            <li className={styles.selectEmpty}>暂无数据</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Select;
