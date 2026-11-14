# ADB（Android Debug Bridge）

[brief]
ADB 是电脑与安卓设备通信的调试工具，能传文件、看日志、执行命令。开服/传文件/抓日志时常用，需要先在手机上开启「USB 调试」。
[/brief]

[detail]
## 它是什么

ADB 是 Android SDK 里的命令行工具，通过 USB 或 Wi-Fi 连接手机，执行安装应用、推送文件、查看日志等操作。

## 常见用途

- `adb devices`：查看连接的设备；
- `adb shell`：进入手机命令行；
- `adb push/pull`：传文件；
- 抓取日志排查闪退。

## 注意

使用前要在「开发者选项」里打开 USB 调试，电脑需装 platform-tools/驱动。
[/detail]
