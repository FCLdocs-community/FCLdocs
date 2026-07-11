---
sidebar_position: 1
title: 引言
description: 这是一份专为从未接触过计算机知识的手机小白编写的科普文档，用大白话讲清楚手机里的各种概念。
---

# 手机小白必看

## 这份文档是写给谁的？

如果你拿到一部手机，看到「骁龙 8 Gen3」「12GB+256GB」「Android 14」「APK」「SoC」这些词就一头雾水；如果你想知道为什么 QQ 下载的安装包装不上、为什么 `Android/data` 文件夹打不开、为什么玩 Minecraft 还要装 Java——那么这份文档就是为你写的。

我们假设你**完全不懂计算机**，所以每一个专业名词都会先用大白话解释一遍，再告诉你它正式叫什么。文档里不会出现「请自行理解」这种话，所有概念都会拆开揉碎讲清楚。

## 文档结构一览

| 章节 | 主要讲什么 |
|------|-----------|
| [手机配置讲解](/docs/%E6%89%8B%E6%9C%BA%E5%B0%8F%E7%99%BD%E5%BF%85%E7%9C%8B/%E6%89%8B%E6%9C%BA%E9%85%8D%E7%BD%AE%E8%AE%B2%E8%A7%A3/%E5%A6%82%E4%BD%95%E6%9F%A5%E7%9C%8B%E6%89%8B%E6%9C%BA%E9%85%8D%E7%BD%AE) | SoC、CPU、GPU、NPU、安卓版本、运行内存、存储空间这些参数到底什么意思 |
| [手机云控介绍](/docs/%E6%89%8B%E6%9C%BA%E5%B0%8F%E7%99%BD%E5%BF%85%E7%9C%8B/%E6%89%8B%E6%9C%BA%E4%BA%91%E6%8E%A7%E4%BB%8B%E7%BB%8D) | 厂商是怎么远程控制你的手机的 |
| [data 文件夹访问限制](/docs/%E6%89%8B%E6%9C%BA%E5%B0%8F%E7%99%BD%E5%BF%85%E7%9C%8B/data%E6%96%87%E4%BB%B6%E5%A4%B9%E8%AE%BF%E9%97%AE%E9%99%90%E5%88%B6) | 为什么 Android 11 之后 `Android/data` 打不开了 |
| [手机权限](/docs/%E6%89%8B%E6%9C%BA%E5%B0%8F%E7%99%BD%E5%BF%85%E7%9C%8B/%E6%89%8B%E6%9C%BA%E6%9D%83%E9%99%90) | App 申请的那些权限到底在干什么 |
| [文件后缀名介绍](/docs/%E6%89%8B%E6%9C%BA%E5%B0%8F%E7%99%BD%E5%BF%85%E7%9C%8B/%E6%96%87%E4%BB%B6%E5%90%8E%E7%BC%80%E5%90%8D%E4%BB%8B%E7%BB%8D/%E5%90%8E%E7%BC%80%E5%90%8D%E5%88%97%E4%B8%BE) | `.apk` `.zip` `.so` 这些后缀名都是什么 |
| [下载和安装 apk](/docs/%E6%89%8B%E6%9C%BA%E5%B0%8F%E7%99%BD%E5%BF%85%E7%9C%8B/%E4%B8%8B%E8%BD%BD%E5%92%8C%E5%AE%89%E8%A3%85apk/%E5%BA%94%E7%94%A8%E5%95%86%E5%BA%97) | 从 QQ、应用商店、浏览器、adb 四种渠道装软件 |
| [MT 管理器的使用](/docs/%E6%89%8B%E6%9C%BA%E5%B0%8F%E7%99%BD%E5%BF%85%E7%9C%8B/mt%E7%AE%A1%E7%90%86%E5%99%A8%E7%9A%84%E4%BD%BF%E7%94%A8/%E7%B3%BB%E7%BB%9F%E6%96%87%E4%BB%B6%E7%AE%A1%E7%90%86%E5%B1%80%E9%99%90%E6%80%A7) | 安卓上最强的第三方文件管理器怎么用 |
| [什么是 Java](/docs/%E6%89%8B%E6%9C%BA%E5%B0%8F%E7%99%BD%E5%BF%85%E7%9C%8B/%E4%BB%80%E4%B9%88%E6%98%AFjava) | 一门编程语言的科普 |
| [什么是 Minecraft](/docs/%E6%89%8B%E6%9C%BA%E5%B0%8F%E7%99%BD%E5%BF%85%E7%9C%8B/%E4%BB%80%E4%B9%88%E6%98%AFminecraft) | 一款沙盒游戏的科普 |
| [Minecraft Java版 如何被移植在手机上](/docs/%E6%89%8B%E6%9C%BA%E5%B0%8F%E7%99%BD%E5%BF%85%E7%9C%8B/minecraft%E7%A7%BB%E6%A4%8D%E5%88%B0%E6%89%8B%E6%9C%BA) | 手机怎么跑起电脑版 MC 的 |
| [什么是图形 API](/docs/%E6%89%8B%E6%9C%BA%E5%B0%8F%E7%99%BD%E5%BF%85%E7%9C%8B/%E4%BB%80%E4%B9%88%E6%98%AF%E5%9B%BE%E5%BD%A2api) | OpenGL、Vulkan、DirectX 是什么 |
| [什么是图形渲染器](/docs/%E6%89%8B%E6%9C%BA%E5%B0%8F%E7%99%BD%E5%BF%85%E7%9C%8B/%E4%BB%80%E4%B9%88%E6%98%AF%E5%9B%BE%E5%BD%A2%E6%B8%B2%E6%9F%93%E5%99%A8) | 渲染器 = 图形 API + 自定义 GLSL |

点击右上角三横 或 点击本文章的下一篇，就可以开始阅读以上内容

祝你阅读愉快，读完之后你就能看懂手机参数、看懂技术帖、甚至自己折腾起 Minecraft 模组了。