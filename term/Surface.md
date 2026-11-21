# Surface（Android 绘图表面）

[brief]
Surface 是 Android 里"可以往上面画画的一块画布"，由系统合成后显示到屏幕上。游戏要把画面渲染到 Surface，再交给屏幕显示。
[/brief]

[detail]
## 它是什么

在 Android 中，Surface 代表一块可供绘制/合成的图像缓冲区，通常和 `SurfaceView`、`TextureView` 配合使用。

## 在启动器里的作用

启动器把 Android 的 Surface（底层是 `ANativeWindow`）注册为游戏的渲染目标，游戏的 OpenGL/Vulkan 画面最终就画到这块 Surface 上。

## 相关名词

- **ANativeWindow**：Surface 在 native 层的表示；
- **EGL**：把 OpenGL ES 与 Surface 连接起来的接口。
[/detail]
