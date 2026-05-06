# CodeEcho

AI 前端代码注释生成工具 — 让前端逻辑一目了然。

一款面向前端开发者的轻量工具，输入前端代码（JavaScript / TypeScript / React JSX / Vue SFC / HTML / CSS），一键生成规范、易读的中文代码注释。

后端仓库：[CodeEcho-py](https://github.com/liuhnagyu1584-cmyk/CodeEcho-py)

## 功能特性

- **多语言支持** — 覆盖 JavaScript、TypeScript、HTML、CSS、React (JSX) 和 Vue (SFC)，每种语言提供示例代码一键填充
- **AI 智能注释** — 将源码发送至后端 AI 服务，自动生成带注释的代码，注释清晰、可读性强
- **Monaco 编辑器** — 左右双栏均为 VS Code 同款编辑器，支持语法高亮与代码折叠
- **复制 & 下载** — 生成的注释代码支持一键复制到剪贴板，或按对应语言扩展名下载为文件
- **暗色主题** — 全局 VS Code Dark 风格，减少视觉疲劳
- **输入校验** — 客户端校验空输入、过短代码及代码特征字符检测，减少无效请求
- **Toast 通知** — 自定义消息提示系统，操作反馈即时可见

## 技术栈

| 类别 | 技术 |
|------|------|
| 运行时 | Node.js + Vite |
| 框架 | React 19 + TypeScript 6 (strict) |
| 路由 | React Router DOM v7 |
| 编辑器 | @monaco-editor/react |
| HTTP | Axios (JWT 拦截器 + 响应归一化) |
| 样式 | CSS Modules + Less |
| 检查 | ESLint 10 + TypeScript-ESLint |

## 项目结构

```
CodeEcho/
├── src/
│   ├── main.tsx                 # 应用入口
│   ├── App.tsx                  # 根布局组件
│   ├── router/index.tsx         # 路由配置 (/ → Home, * → 404)
│   ├── request/
│   │   ├── index.ts             # Axios 实例 (baseURL, JWT 拦截器)
│   │   └── home.ts              # generateComment API
│   ├── pages/
│   │   ├── Home/
│   │   │   ├── index.tsx        # 主页面 (状态管理，编排生成流程)
│   │   │   ├── type.ts          # 语言选项类型定义
│   │   │   └── components/
│   │   │       ├── Header/      # 顶栏 (Logo、语言选择、生成按钮)
│   │   │       ├── CodeInput/   # 左栏 — Monaco 源码输入
│   │   │       └── CodeComment/ # 右栏 — Monaco 注释输出
│   │   └── NotFindPage/         # 404 页面
│   ├── components/
│   │   ├── Message/             # Toast 消息通知系统
│   │   └── Select/              # 通用下拉选择组件
│   ├── utils/tools.ts           # copyToClipboard, downloadFile
│   └── assets/                  # 字体、图标、全局样式
├── vite.config.ts               # Vite 配置 (@ 别名 → ./src)
├── tsconfig.json
└── eslint.config.js
```

## 快速开始

### 环境要求

- Node.js >= 18
- 后端 API 服务运行在 `http://127.0.0.1:8000`

### 安装与运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 类型检查 + 构建
npm run build

# 预览构建产物
npm run preview

# 代码检查
npm run lint
```

开发服务器默认运行在 `http://localhost:5173`。

### 环境变量

| 变量 | 说明 | 默认值 |
|------|------|--------|
| `VITE_BASE_URL` | 后端 API 地址 | `http://127.0.0.1:8000` |

可在 `.env.development` 或 `.env.production` 中覆盖。

## API 接口

本仓库仅为前端，后端服务请参见 [CodeEcho-py](https://github.com/liuhnagyu1584-cmyk/CodeEcho-py)，依赖以下接口：

### POST /api/generate-comment

**请求体：**

```json
{
  "code": "function hello() { return 'world'; }",
  "code_type": "javascript"
}
```

| 字段 | 类型 | 说明 |
|------|------|------|
| code | string | 待注释的源代码 |
| code_type | string | 语言类型: `javascript` / `typescript` / `html` / `css` / `react` / `vue` |

**响应体：**

```json
{
  "code": 0,
  "message": "success",
  "data": "// 返回问候语\nfunction hello() { return 'world'; }"
}
```

超时时间：120 秒。

### JWT 认证

前端 Axios 实例已内置 `Authorization: Bearer <token>` 请求拦截器，token 读取自 `localStorage.getItem('token')`。如后端需要认证，登录后将 token 写入 localStorage 即可。
