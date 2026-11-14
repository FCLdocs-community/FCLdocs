# FPE（固定管线模拟）

[brief]
FPE 是"固定管线模拟"的缩写。老版本 Minecraft 用的是 OpenGL 固定管线，新图形接口不再直接支持，所以需要模拟这套旧行为，老游戏才能正常渲染。
[/brief]

[detail]
## 它是什么

早期 OpenGL 提供一套"固定管线"（fixed-function pipeline），用固定步骤完成变换与光照。现代图形 API（如部分转换层）不再支持，需要软件模拟。

## 用在哪

- 老版本 Minecraft 的图形转换；
- GL4ES 等转换层中的兼容处理。

## 相关

- **GL4ES**：常用转换层；
- **图形转化层**：更通俗的概念。
[/detail]
