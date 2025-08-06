import { defineConfig } from "unocss";

export default defineConfig({
  // ...UnoCSS options
  shortcuts: [
    // 定义一个名为 'btn-primary' 的快捷方式
    // 之后就可以在定义组件时使用class="btn-primary"了
    [
      "btn-primary",
      "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg",
    ],
  ],
  rules: [
    ["m-1", { margin: "0.25rem" }],
    ["p-1", { padding: "0.25rem" }],
    ['font-bold', { 'font-weight': 700 }],
  ],
});
