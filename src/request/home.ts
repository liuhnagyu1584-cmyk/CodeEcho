import type { LanguageValue } from "@/pages/Home/type";
import axios, { type IRequestRes } from "./index";

/**
 * 生成代码注释
 * @param data
 * @returns
 */
export const generateComment = (data: {
  code: string;
  code_type: LanguageValue;
}) => {
  return axios.post("/api/generate-comment", data, {
    timeout: 120000,
  }) as Promise<IRequestRes<string>>;
};
