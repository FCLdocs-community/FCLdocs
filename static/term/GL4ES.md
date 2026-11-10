# GL4ES

[brief]
GL4ES 是常用的图形转换层，把电脑版 Minecraft 使用的 OpenGL 指令翻译成手机支持的 OpenGL ES。1.16.5 及更早版本基本都靠它。
[/brief]

[detail]
## 它做什么

GL4ES 在 OpenGL 和 OpenGL ES 之间做实时翻译，让只支持 OpenGL ES 的手机也能运行调用桌面 OpenGL 的游戏。

## 在 FCL 里

- 老版本 Minecraft（1.16.5 及更早）主要使用 GL4ES 后端；
- FCL 还提供 NG-GL4ES、Holy-GL4ES、Krypton Wrapper 等改进/分支版本。

## 局限

翻译会带来性能损耗，部分图形效果可能异常；新版本通常会改用 Zink、MobileGlues 等方案。
[/detail]
