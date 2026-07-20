---
sidebar_position: 4
title: Termux终端
---

# 前言

此教程仅适用于拥有**较高性能备用机**的玩家。  
性能差/在主力机上仅有娱乐性质，实用性趋近于**0**。  
此教程不考虑通过Linux终端访问的Proot/Chroot等各类Linux容器，此类参考Linux终端开服教程。

## 1. 安装Termux

[Termux](https://github.com/termux/termux-app/releases/latest)是一款安卓终端应用，提供了类Linux环境，推荐搭配[MT管理器](https://mt2.cn)使用。

## 2. 安装Java

Android使用的是Bionic libc而不是常规Linux所使用的glibc，所以并不兼容适配Linux的Java，因此我们只能选择Termux官方提供的Java。

### 2.1 Java版本挑选

不同Java版本支持的MC范围不同：

- **JDK 8**（2014）：最经典，企业还在大量用，Minecraft 1.7–1.16.5 用这个。
- **JDK 11**（2018）：长期支持版（LTS），不常使用。
- **JDK 17**（2021）：LTS，Minecraft 1.18–1.20.4 要求。
- **JDK 21**（2023）：LTS，Minecraft 1.20.5–1.21.11 要求。
- **JDK 25**（2025）：当前最新 LTS，Minecraft 26.1+ 要求。

其中存在由Mod/ModLoader导致的差异，如：1.16.5Forge可使用Java21, 1.12.2Cleanroom可使用Java25等。

### 2.2 安装Java

当你想好该使用哪个版本的Java后，运行以下命令以安装

```sh
apt update && apt upgrade -y #更新软件包
apt install openjdk-{version}
```

:::tip 
这里的version需要替换为你所需的实际版本哦～
:::

## 3. 准备服务器端文件

在Termux中创建一个文件夹(可不选，但推荐这样做以区分服务器文件与Termux文件)

下载服务器端文件请参考[这个文件](/docs/开一个属于自己的服务器/1.认识服务器核心.md)
然后使用MT移动至Termux内目录
运行以下命令

```sh
ls | grep .jar
```

如果输出的结果没有你下载的服务器核心，请检查所在目录

```sh
pwd
```

## 4. 启动服务器

当一切准备就绪后，运行以下命令

```sh
echo "export SERVER_NAME = 你的服务器核心名.jar" >> ~/.bashrc
source ~/.bashrc #更新环境变量
java -jar $SERVER_NAME nogui
```

首次启动服务器需要我们同意EULA条款

![如图所示](/img/docs/开一个属于自己的服务器/开服操作/Termux终端/首次运行服务器输出.jpg)

```sh
sed -i 's/false/true/g' eula.txt
cat eula.txt #检查是否包含“eula = true”
```

默认是开启正版验证的，如果你没有正版账户或是有这方面的需要可以执行下列命令

```sh
sed -i 's/online-mode=false/online-mode=true/g' server.properties
```

如果你有更多需求如修改服务器名称可参考下表(选自[知乎文章](https://zhuanlan.zhihu.com/p/19179879391))修改server.properties（推荐使用MT管理器修改）

[戳我看表](window:/term/List)

:::note 名词解释

| 名词 | 含义 |
|------|------|
| true | 是/启用 |
| false | 否/取消 |
| NULL | 空 |

:::
重新启动服务器

```sh
java -jar $SERVER_NAME nogui
```

## 5. 加入服务器

- 如果你想自己玩，那么你的游戏版本要和服务器游戏版本一致（也可以使用插件支持其他版本），Termux挂小窗后启动游戏输入`127.0.0.1:25565`
- 如果你想和同一局域网的人玩，那么条件如上，把`127.0.0.1:25565`改成`你的局域网地址:25565`
- 如果你想让异地的人玩，那些就需要[内网穿透/组网等](/docs/开一个属于自己的服务器/xxx.md)