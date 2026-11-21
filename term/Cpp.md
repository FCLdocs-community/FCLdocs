# C++

[brief]
C++ 是一门高性能的编程语言，很多游戏、图形引擎、系统底层软件（包括 Minecraft 及其模组）都是用 C++ 或类似语言写的。
[/brief]

[detail]
## C++ 是什么

C++ 由 Bjarne Stroustrup 在 20 世纪 80 年代开发，是在 C 语言基础上加入了"面向对象"等特性的编程语言。它直接编译成机器码，运行速度极快，是性能敏感场景的首选。

## 用在哪里

- 游戏引擎（如 Unreal Engine）。
- 图形软件与驱动、浏览器内核。
- 操作系统底层、数据库。
- Minecraft 的 native 库、JVM（Java 虚拟机）本身也大量用 C++ 编写。

## 和 Java 的关系

- Java 通过 JVM 运行字节码，跨平台、开发效率高，但速度略逊。
- C++ 直接编译成原生机器码，速度快、可控性强，但开发复杂度更高。
- Minecraft 游戏本体用 Java，但很多底层 native 库（如 LWJGL、图形相关 `.so`）是用 C/C++ 写的。

## 为什么玩家会在意

Minecraft 的 native 库（`.so`/`.dll`）很多是 C/C++ 编译的，这些库要针对不同平台（Windows/Android、x86/ARM）分别编译，这也是手机 Java 启动器需要移植 `.so` 文件的原因。
[/detail]
