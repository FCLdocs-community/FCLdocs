# OpenAL

[brief]
OpenAL 是一套跨平台的 3D 音频接口，Minecraft 用它播放游戏声音。手机上由启动器把桌面的音频调用桥接到 Android 的音频系统。
[/brief]

[detail]
## 它是什么

OpenAL（Open Audio Library）负责空间音效与音频播放，常与 OpenGL 搭配使用。

## 在 FCL 里

FCL 内的 LWJGL 提供 OpenAL 绑定，并通过 JSound 等桥接层，把桌面 Minecraft 的 `javax.sound` 调用接到 OpenAL，解决手机音频兼容问题。

## 常见问题

没有声音、声音断续，可能与音频后端或设备兼容性有关。
[/detail]
