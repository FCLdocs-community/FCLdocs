# ART（Android Runtime）

[brief]
ART 是 Android 系统运行 App 的运行时环境，你可以把它理解成"安卓版的 Java 虚拟机"。它只认安卓专用的 dex 字节码，不认电脑 Minecraft 用的标准 Java 字节码，所以手机跑 Java 版必须自带一套真正的 JVM。
[/brief]

[detail]
## 它是什么

ART（Android Runtime）负责执行 Android App。早期 Android 用过 Dalvik，后来换成 ART。

## 关键区别

- ART 执行的是 **dex** 格式字节码（App 安装时由标准字节码转换而来）；
- 电脑 Minecraft 用的是标准 Java 字节码和完整 JVM；
- 两者不兼容，所以 FCL 不能靠系统 ART 启动 Minecraft，必须内置 OpenJDK 移植版。

## 常见误解

"手机能跑 Java"指的是安卓 App 用 Java/Kotlin 写，不是说手机能直接跑任意 Java 程序。标准 Java 程序仍需要完整的 JVM。
[/detail]
