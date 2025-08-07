import { Card } from "antd";
import React from "react";

const num1 = 1;
const num2 = "00FFFF";

const UnoDemo: React.FC = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center mb-8">
          UnoCSS 自定义规则演示
        </h1>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-blue-800 text-sm">
            💡 <strong>提示：</strong>以下演示了3种基础的UnoCSS自定义规则，展示了如何扩展UnoCSS的功能。
          </p>
        </div>

        {/* 1. 动态数值规则演示 */}
        <Card title="1. 动态数值规则 - 自定义间距" className="mb-6">
          <div className="space-y-4">
            <div className="bg-blue-100 p-4 rounded">
              <h3 className="mb-4">使用自定义 margin 和 padding：</h3>
              <div className="flex space-x-4">
                <div className="bg-cyan-200 m-1 p-1 rounded">m-1 p-1</div>
                <div className="bg-red-200 m-15 p-20 rounded">m-15 p-20</div>
                <div className="bg-green-200 m-25 p-10 rounded">m-25 p-10</div>
                <div className="bg-yellow-200 m-10 p-30 rounded">m-10 p-30</div>
              </div>
            </div>
            <div className="bg-gray-100 p-4 rounded">
              <code>类名: m-15, p-20, m-25, p-10, m-10, p-30</code>
            </div>
          </div>
        </Card>

        {/* 2. 动态颜色规则演示 */}
        <Card title="2. 动态颜色规则 - 自定义背景色" className="mb-6">
          <div className="space-y-4">
            <div className="bg-blue-100 p-4 rounded">
              <h3 className="mb-4">使用十六进制颜色：</h3>
              <div className="flex space-x-4">
                <div className="bg-hex-ff6b6b text-white p-4 rounded">
                  bg-hex-ff6b6b
                </div>
                <div className="bg-hex-4ecdc4 text-white p-4 rounded">
                  bg-hex-4ecdc4
                </div>
                <div className="bg-hex-45b7d1 text-white p-4 rounded">
                  bg-hex-45b7d1
                </div>
                <div className="bg-hex-f9ca24 text-black p-4 rounded">
                  bg-hex-f9ca24
                </div>
              </div>
            </div>
            <div className="bg-gray-100 p-4 rounded">
              <code>
                类名: bg-hex-ff6b6b, bg-hex-4ecdc4, bg-hex-45b7d1, bg-hex-f9ca24
              </code>
            </div>
          </div>
        </Card>

        {/* 3. 渐变边框演示 */}
        <Card title="3. 渐变边框效果" className="mb-6">
          <div className="space-y-4">
            <div className="bg-blue-100 p-4 rounded">
              <h3 className="mb-4">渐变边框效果：</h3>
              <div className="flex space-x-4">
                <div className="gradient-border p-6 rounded-lg">
                  <p className="text-center font-medium">渐变边框卡片</p>
                  <p className="text-sm text-gray-600 text-center mt-2">
                    使用 gradient-border 类
                  </p>
                </div>
                <div className="gradient-border p-6 rounded-lg">
                  <p className="text-center font-medium">另一个渐变边框</p>
                  <p className="text-sm text-gray-600 text-center mt-2">
                    同样的效果
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 p-4 rounded">
              <code>类名: gradient-border</code>
            </div>
          </div>
        </Card>



        {/* 使用说明 */}
        <Card title="📖 使用说明" className="mb-6">
          <div className="space-y-4">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <h4 className="font-semibold mb-2">如何使用这些自定义规则：</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong>动态间距：</strong> 使用 <code>m-{num1}</code> 或 <code>p-{num1}</code> 设置精确的像素值（仅支持整数）</li>
                <li><strong>十六进制颜色：</strong> 使用 <code>bg-hex-{num2}</code> 设置任意背景色</li>
                <li><strong>渐变边框：</strong> 直接使用 <code>gradient-border</code> 类名应用渐变边框效果</li>
              </ul>
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
                <p className="text-green-800 text-sm">
                  <strong>配置位置：</strong> 这些规则定义在 <code>uno.config.ts</code> 文件的 <code>rules</code> 数组中。
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UnoDemo;
