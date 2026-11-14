# LWJGL

[brief]
LWJGL（Lightweight Java Game Library）是让 Java 程序调用图形、音频、输入等底层能力的绑定库。Minecraft 的窗口、OpenGL、声音都通过它实现。
[/brief]

[detail]
## 它是什么

LWJGL 把 C 语言的图形/音频/输入库包装成 Java 接口，Minecraft 主要用到三块：

- **GLFW**：窗口与输入；
- **OpenGL 绑定**：画面绘制；
- **OpenAL 绑定**：声音。

## 在手机上

LWJGL 原本面向桌面，手机启动器需要移植/改造它（替换 GLFW 内部实现、补齐 native 库），这也是「LWJGL 移植」一节的内容。

## 版本

FCL 内置 LWJGL 3.3.3（老版本）与 3.4.1（26.x）两套，按游戏版本选用。
[/detail]
