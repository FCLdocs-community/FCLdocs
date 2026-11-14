# Krypton Wrapper（NG-GL4ES）

[brief]
Krypton Wrapper 是 FCL 目前的默认渲染器，本名 NG-GL4ES——gl4es 的深度改进分支，用 glslang + SPIRV-Cross 做着色器转换，走 GLES3 路线，兼容上限约 26.2。
[/brief]

[detail]
## 它是什么

- 上游：ptitSeb 的 gl4es（OpenGL→OpenGL ES 转换层）；
- 改进：支持更复杂的着色器与更新的 Minecraft 版本；
- 在 FCL 中表现为 `libng_gl4es.so`，也是默认选项（"均衡之选"）。

## 和 GL4ES 的区别

| | GL4ES | Krypton Wrapper |
|---|---|---|
| 着色器转换 | 弱 | 强（glslang+SPIRV-Cross）|
| 兼容上限 | 约 1.16–1.21.4 | 约 26.2 |

## 相关

- **GL4ES**：原始转换层；
- **SPIR-V**：涉及到的着色器中间格式。
[/detail]