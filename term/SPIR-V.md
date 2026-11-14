# SPIR-V

[brief]
SPIR-V 是 Vulkan 使用的着色器"中间码"，不是给人读的文本，而是编译后的二进制。GLSL 等语言通常要先转换成 SPIR-V，Vulkan 才能执行。
[/brief]

[detail]
## 它是什么

SPIR-V 是 Khronos 定义的一种着色器中间表示，Vulkan 直接消费它。相比源码文本，它加载更快、校验更容易。

## 和 GLSL 的关系

```
GLSL 源码 → glslang 等工具 → SPIR-V → Vulkan
```

## 相关名词

- **glslang**：把 GLSL 编译成 SPIR-V 的工具；
- **SPIRV-Cross**：把 SPIR-V 转成其他着色器语言（如 GLSL/HLSL）的工具，常用于兼容层。
[/detail]
