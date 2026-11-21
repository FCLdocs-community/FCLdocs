# Metaspace（元空间）

[brief]
Metaspace 是 JVM 存放"类信息"的内存区域（Java 8 起取代永久代）。它超载会报 `OutOfMemoryError: Metaspace` 或频繁 Full GC，属一种常见的 Java 虚拟机报错。
[/brief]

[detail]
## 它是什么

JVM 把加载到内存的类元数据存在 Metaspace（元空间），它是"非堆"内存的一部分，容量默认由系统决定。

## 常见问题

- 报 `Metaspace` 内存不足：类加载过多（模组多、整合包大时常见）；
- 报 `Metadata GC Threshold`：触发压缩，伴随卡顿。

## 怎么解决

在 JVM 参数里限制并观察，例如：
`-XX:MaxMetaspaceSize=512m`，同时确认启动器分配的内存合理、别开太多模组。

## 相关

- **GC**：垃圾回收；
- **堆内存**：与 Metaspace 不同的另一块区域。
[/detail]