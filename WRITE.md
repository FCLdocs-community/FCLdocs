# 为本项目作贡献

如果你做好了辅助编写本文档的准备，那么请查看以下内容：

## 📁 项目目录结构

```text
FCLdocs/
├── 📄 WRITE.md                    # 编写准备文档（本文件）
├── 📄 README.md                    # 项目说明文档
├── 📄 LICENSE                      # 开源许可证
├── 📄 package.json                 # Node.js 依赖与脚本配置
├── 📄 yarn.lock                    # Yarn 依赖锁定文件
├── 📄 package-lock.json            # npm 依赖锁定文件
├── 📄 docusaurus.config.js         # Docusaurus 站点核心配置文件
├── 📄 sidebars.js                  # 主文档（/docs）侧边栏导航配置
├── 📄 sidebarsFAQ.js               # FAQ 文档（/FAQ）侧边栏导航配置
│
├── 📂 blog/                        # 博客/更新日志目录
│   └── changelog.md                # FCL 更新内容记录
│
├── 📂 docs/                        # 📘 主文档目录（/docs 路由）
│   ├── index.md                    # 文档首页
│   ├── FCL 的下载与安装            # 下载与安装教程
│   ├── FCL-基础教程                # 新手入门基础操作指南
│   ├── FCL-高阶教程                # 进阶功能与深度使用教程
│   ├── 开一个属于自己的服务器      # 服务器搭建教程
│   ├── 手机小白必看                # 针对纯新手的预备知识
│   └── test.mdx                    # 测试页面
│
├── 📂 FAQ/                         # ❓ 常见问题文档目录（/FAQ 路由）
│   └── index.md                    # FAQ 首页
│
├── 📂 src/                         # 源代码目录（自定义组件与页面）
│   ├── 📂 clientModules/           # 客户端模块（页面加载时执行）
│   │   └── loadingOverlay.js       # 首屏加载动画逻辑
│   ├── 📂 components/              # 自定义 React 组件
│   │   ├── AboutBackButton/        # 关于页返回按钮组件
│   │   ├── AboutSite/              # 关于本站信息展示组件
│   │   ├── BrandSteps/             # 品牌/步骤引导组件
│   │   ├── ContributorCard/        # 贡献者卡片组件
│   │   ├── SlideButton/            # 滑动按钮交互组件
│   │   └── TermSystem/             # 术语系统组件
│   ├── 📂 css/
│   │   └── custom.css              # 全局自定义样式（覆盖主题默认样式）
│   ├── 📂 pages/                   # 自定义独立页面
│   │   ├── about/                  # 关于本站页面
│   │   ├── index.js                # 网站首页（React 组件）
│   │   └── index.module.css        # 首页局部样式
│   ├── 📂 plugins/
│   │   └── remarkWindowPlugin.js   # 自定义 Remark 插件（处理 Markdown）
│   └── 📂 theme/
│       └── MDXComponents.js        # MDX 全局组件注册
│
├── 📂 static/                      # 静态资源目录
│   ├── 📂 img/                     # 图片资源
│   │   ├── bj/                     # 网站背景图（樱花主题）
│   │   ├── docs/                   # 文档内引用的图片
│   │   ├── favicon.ico             # 网站图标
│   │   └── fcl-icon.png            # FCL 图标
│   └── 📂 term/                    # 📖 专业术语介绍
│       ├── AI.md                   # AI 相关术语
│       ├── Android.md              # Android 系统术语
│       ├── CPU.md / GPU.md / SPU.md # 硬件相关术语
│       ├── FCLEULA.md              # FCL 用户协议
│       ├── Linux.md / Windows.md   # 操作系统术语
│       ├── mod.md / 光影.md        # Minecraft 模组与光影术语
│       ├── SAF.md                  # Android 存储访问框架
│       ├── UUID.md / ID.md         # 身份标识术语
│       ├── Yggdrasil外置认证.md    # 正版验证术语
│       └── ...                     # 其他游戏/技术术语
│
└── 📂 node_modules/                # 依赖包目录（通过yarn install生成，本项目默认不提交）
```

## 编写前准备

首先你的编写环境要准备以下内容：
```text
- nodejs 24.17.0
- yarn 4.9.x
- docusaurus 3.10.1
- git 任意版本（只要能上传到github就行）
```

> 如果在Github内编写，以上这些在项目文档内就准备好了（写在了Workflow工作流文件内），你把fork后的仓库的Action功能打开即可

你要熟悉以下内容：
- markdown 基本语法
- docusaurus 额外语法
- 本文档额外添加的语法（下文会介绍）
- git 指令

如果可以，允许额外的东西：
- 熟悉 JavaScript 语法及 react 组件带来的扩展库（比较高阶，不要求掌握）
- 熟悉 HTML 语法（比较高阶，不要求掌握）
- 一款 AI 软件（豆包除外，毕竟豆包写出来的内容会有大量错误）

推荐的 AI 软件：Kimi、智谱、DeepSeek

## 本文档语法
本教程文档除了 markdown 语法和 docusaurus 带来的额外语法外，目前引入了以下语法
- 文字(window:路径)       # 在文档内嵌入小窗口

例：红色(window:/term/red.md)      #小窗口展示对红色的介绍

## 编写部署

将本仓库[进行fork](https://www.cnblogs.com/nn2dw/p/18396818)，接着打开你fork后的仓库

### Github部署

在上边栏找到 Action 按钮，然后点击下面的绿色按钮，即可成功打开

具体打开和使用可以看这篇文章：https://zhuanlan.zhihu.com/p/731785401

> 开启 Actions 后，每次你向自己的 Fork 仓库修改代码，GitHub 会自动构建并部署到你的 docs 分支，无需手动操作。

> 如果你想要看效果的话，要去仓库设置开启Pages，具体可以看这个链接：https://juejin.cn/post/7470715845502009379

你在你fork的仓库内做的每一个改动，都会触发 Action 运行，比较适合本地不方便部署，然后又想看是否编译成功的人

### 本地部署

#### Windows 完整搭建步骤

##### 第 1 步：安装 Git

1. 打开浏览器，访问 [https://git-scm.com/download/win](https://git-scm.com/download/win)。
2. 页面会自动识别你的系统并弹出下载提示，下载 `.exe` 安装程序。
3. 双击下载好的安装文件，启动安装向导。
4. **一路点击 "Next" 保持默认选项即可**，不需要修改任何配置。
5. 安装完成后，按 `Win + R` 键，输入 `cmd`，回车打开命令提示符。
6. 在命令提示符中输入以下命令，验证 Git 是否安装成功：

   ```bash
   git --version
   ```
   
   如果看到类似 `git version 2.45.0` 的输出，说明安装成功。

##### 第 2 步：安装 Node.js

1. 打开浏览器，访问 [https://nodejs.org/](https://nodejs.org/)。
2. 点击首页左侧绿色的 **"LTS"** 按钮，下载长期支持版本（推荐）。
3. 双击下载好的 `.msi` 安装文件。
4. **一路点击 "Next" 保持默认选项即可**。
5. 安装完成后，重新打开命令提示符（**注意：必须重新打开，之前打开的窗口不会生效**）。
6. 输入以下命令验证 Node.js 和 npm 是否安装成功：

   ```bash
   node -v
   npm -v
   ```
   
   如果看到版本号输出（如 `v20.12.0`），说明安装成功。

##### 第 3 步：启用 Corepack 并启动 Yarn

Node.js 自带了 Corepack 工具，可以自动管理 Yarn，不需要单独下载 Yarn 安装包。

1. 在命令提示符中输入：

   ```bash
   corepack enable
   ```
   
   如果没有任何报错提示，说明启用成功。
2. 验证 Yarn 是否可用：

   ```bash
   yarn -v
   ```
   
   如果看到版本号（如 `4.2.2`），说明 Yarn 已就绪。

##### 第 4 步：克隆项目仓库

1. 在命令提示符中，先切换到你想要存放项目的文件夹。例如，想放到桌面：

   ```bash
   cd %USERPROFILE%\Desktop
   ```
   
2. 执行克隆命令：

   ```bash
   git clone https://github.com/自己的用户名/FCLdocs.git
   ```
   
3. 等待克隆完成，你会在桌面看到新生成的 `FCLdocs` 文件夹。

##### 第 5 步：进入目录并安装依赖

1. 进入项目目录：

   ```bash
   cd FCLdocs
   ```
   
2. 使用 Yarn 安装项目依赖：

   ```bash
   yarn install
   ```
   
3. 等待安装完成。如果看到 `Done` 或没有报错，说明依赖安装成功。

---

#### Linux 完整搭建步骤（以 Ubuntu/Debian 为例）

> 如果你使用的是 Fedora、Arch 等其他发行版，安装命令略有不同，已附在对应步骤下方。

##### 第 1 步：安装 Git

1. 打开终端（按 `Ctrl + Alt + T`）。
2. 先更新软件包列表：

   ```bash
   sudo apt update
   ```
   
3. 安装 Git：

   ```bash
   sudo apt install git -y
   ```
   
4. 验证安装：

   ```bash
   git --version
   ```
   
   看到版本号即成功。

> **其他发行版安装 Git：**
> - Fedora / RHEL：`sudo dnf install git`
> - Arch Linux：`sudo pacman -S git`

##### 第 2 步：安装 Node.js

推荐使用 NodeSource 提供的官方源安装最新 LTS 版本。

1. 在终端中执行以下命令添加 NodeSource 源并安装：

   ```bash
   curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
   sudo apt install -y nodejs
   ```
   
2. 验证安装：

   ```bash
   node -v
   npm -v
   ```
   
   看到版本号即成功。

> **其他发行版安装 Node.js：**
> - Fedora：`sudo dnf install nodejs`
> - Arch：`sudo pacman -S nodejs npm`

##### 第 3 步：启用 Corepack 并启动 Yarn

1. 启用 Corepack：

   ```bash
   corepack enable
   ```
   
   如果提示权限不足，使用：
   
   ```bash
   sudo corepack enable
   ```
   
2. 验证 Yarn：

   ```bash
   yarn -v
   ```

##### 第 4 步：克隆项目仓库

1. 切换到你想要存放项目的目录。例如，放到用户主目录：

   ```bash
   cd ~
   ```
2. 克隆仓库：

   ```bash
   git clone https://github.com/自己的用户名/FCLdocs.git
   ```

##### 第 5 步：进入目录并安装依赖

1. 进入项目目录：

   ```bash
   cd FCLdocs
   ```
2. 安装依赖：

   ```bash
   yarn install
   ```

---

#### macOS 完整搭建步骤

##### 第 1 步：安装 Git

macOS 通常自带 Git，但版本可能较旧，建议通过 Homebrew 安装最新版。

###### 先安装 Homebrew（如果还没有）

1. 打开 **终端**（在「启动台」搜索 "终端" 或 "Terminal"）。
2. 在终端中粘贴并执行以下命令：

   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
   
3. 按照屏幕提示输入密码并等待安装完成。

###### 通过 Homebrew 安装 Git

1. 在终端中执行：

   ```bash
   brew install git
   ```
   
2. 验证安装：

   ```bash
   git --version
   ```
   
   看到版本号即成功。

> **备选方式**：如果你不想用 Homebrew，可以执行 `xcode-select --install` 安装 Apple 自带的命令行工具（包含 Git），但版本通常不是最新的。

##### 第 2 步：安装 Node.js

1. 在终端中执行：

   ```bash
   brew install node
   ```
   
2. 验证安装：

   ```bash
   node -v
   npm -v
   ```
   
   看到版本号即成功。

##### 第 3 步：启用 Corepack 并启动 Yarn

1. 启用 Corepack：

   ```bash
   corepack enable
   ```
   
   如果提示权限不足：
   
   ```bash
   sudo corepack enable
   ```
   
2. 验证 Yarn：

   ```bash
   yarn -v
   ```

##### 第 4 步：克隆项目仓库

1. 切换到你想要存放项目的目录。例如：

   ```bash
   cd ~
   ```
2. 克隆仓库：

   ```bash
   git clone https://github.com/自己的用户名/FCLdocs.git
   ```

##### 第 5 步：进入目录并安装依赖

1. 进入项目目录：

   ```bash
   cd FCLdocs
   ```
2. 安装依赖：

   ```bash
   yarn install
   ```

---

#### 常见问题

##### Q1: `corepack enable` 提示 "command not found"

这说明你的 Node.js 版本过低（需要 v16.13.0 或更高）。请重新安装 Node.js 24.17.0

##### Q2: 克隆仓库时网络超时或失败

可以尝试使用国内镜像加速：

```bash
git clone https://ghproxy.com/https://github.com/FCLdocs-community/FCLdocs.git
```

有能力的话可以选择开梯子克隆

##### Q3: `yarn install` 安装依赖很慢

可以配置 Yarn 使用国内镜像源：

```bash
yarn config set registry https://registry.npmmirror.com
yarn install
```

##### Q4: Windows 上命令提示符显示乱码

在命令提示符标题栏右键 → **默认值** → **字体**，选择 **Consolas** 或 **新宋体**。

---

#### 快速命令速查

如果你已经装好了 Git 和 Node.js，只需要执行下面三行：

```bash
corepack enable
git clone https://github.com/FCLdocs-community/FCLdocs.git
cd FCLdocs && yarn install
```

#### 本地配置

1. 确保你已经在项目目录内（上一步 `cd FCLdocs` 后的位置）。
2. 查看当前配置的远程仓库：

   ```bash
   git remote -v
   ```
   
   你应该只看到 `origin`，指向你自己的仓库，例如：
   
   ```
   origin  https://github.com/你的用户名/FCLdocs.git (fetch)
   origin  https://github.com/你的用户名/FCLdocs.git (push)
   ```
   
3. 添加原仓库作为上游（upstream）：

   ```bash
   git remote add upstream https://github.com/FCLdocs-community/FCLdocs.git
   ```
   
4. 再次查看远程仓库，确认添加成功：

   ```bash
   git remote -v
   ```
   现在应该看到两行：
   
   ```
   origin    https://github.com/你的用户名/FCLdocs.git (fetch)
   origin    https://github.com/你的用户名/FCLdocs.git (push)
   upstream  https://github.com/FCLdocs-community/FCLdocs.git (fetch)
   upstream  https://github.com/FCLdocs-community/FCLdocs.git (push)
   ```

---

#### 创建新分支进行修改

**不要在 `main`（或 `master`）分支上直接修改。** 创建一个新分支，保持主分支干净。

1. 确保你在项目目录内。
2. 先拉取原仓库的最新代码，确保你的本地代码是最新的：

   ```bash
   git fetch upstream
   ```
   
3. 切换到主分支（通常是 `main`，也可能是 `master`，根据仓库实际情况）：

   ```bash
   git checkout main
   ```
   
4. 用上游的最新代码更新你的本地主分支：

   ```bash
   git merge upstream/main
   ```
   
   > 如果提示 `Already up to date.`，说明已经是最新的。
   
5. 创建并切换到一个新分支（分支名建议描述你要做的修改，例如 `fix-typo`）：

   ```bash
   git checkout -b fix-typo
   ```
   
   看到类似 `Switched to a new branch 'fix-typo'` 的提示，说明分支创建成功。

---

#### 修改文件并提交

1. 用你喜欢的编辑器（VS Code、记事本等）修改项目中的文件。

2. 修改完成后，你可以启动本地服务器来看看效果如何
  
   ```bash
   yarn start
   ```

Docusaurus 默认会打开  http://localhost:3000 ，这样能实时预览。

> 预览完成并确认无误后，在终端按 Ctrl + C 停止服务器，再继续下面的 Git 操作。

3. 在终端中查看哪些文件被修改了：

   ```bash
   git status
   ```
   
   红色字体的文件表示已修改但未暂存。
4. 将修改的文件添加到暂存区（`.` 表示添加所有修改的文件）：
   ```bash
   git add .
   ```
   如果只想添加特定文件：
   
   ```bash
   git add 文件名
   ```
5. 提交修改，并写一条清晰的提交信息：

   ```bash
   git commit -m "修复了文档中的拼写错误"
   ```

   > 提交信息建议用中文，描述清楚你做了什么修改。

---

#### 推送到你自己的 Fork 仓库

1. 将本地的新分支推送到你的 GitHub 仓库：

   ```bash
   git push origin fix-typo
   ```

   > 注意：`fix-typo` 要替换成你实际创建的分支名。
   
2. 如果是第一次推送这个分支，Git 可能会提示你设置上游分支，按提示执行：

   ```bash
   git push --set-upstream origin fix-typo
   ```
   
3. 推送成功后，终端会显示类似：

   ```
   remote: Create a pull request for 'fix-typo' on GitHub by visiting:
   remote: https://github.com/你的用户名/FCLdocs/pull/new/fix-typo
   ```

---

## 在 GitHub 上创建 Pull Request

如果你已经修改完文件并推送到了你的fork仓库，你可以创建 Pull Request（PR）来推送文件到本仓库

1. 打开浏览器，访问你自己的仓库页面：

   ```
   https://github.com/你的用户名/FCLdocs
   ```
2. GitHub 会自动检测到你推送了新分支，页面顶部会出现一个黄色提示条，点击 **"Compare & pull request"** 按钮。
3. 如果没有看到提示条，点击 **"Pull requests"** 标签页，再点击绿色的 **"New pull request"** 按钮。
4. 在 PR 页面中：
   - **base repository**：选择 `FCLdocs-community/FCLdocs`（原仓库）
   - **base**：选择 `main`
   - **head repository**：选择 `你的用户名/FCLdocs`
   - **compare**：选择你推送的分支（如 `fix-typo`）
5. 填写 PR 标题和描述，说明你的修改内容。
6. 点击 **"Create pull request"** 提交。

---

## 同步原仓库的最新更新

当原仓库（FCLdocs-community/FCLdocs）有了新提交，你需要把这些更新同步到自己的 Fork 中。

### 方法一：命令行同步（推荐）

1. 进入项目目录，确保在 `main` 分支：

   ```bash
   git checkout main
   ```
   
2. 拉取上游仓库的最新代码：

   ```bash
   git fetch upstream
   ```
   
3. 合并到本地主分支：

   ```bash
   git merge upstream/main
   ```
   
4. 将更新后的主分支推送到你自己的 GitHub 仓库：

   ```bash
   git push origin main
   ```

### 方法二：GitHub 网页同步

1. 打开你自己的仓库页面：`https://github.com/你的用户名/FCLdocs`
2. 点击 **"Sync fork"** 按钮（在分支选择器旁边）。
3. 点击 **"Update branch"**。

---

## 完整命令速查表

| 步骤 | 命令 |
|------|------|
| Fork 仓库 | 在 GitHub 网页点击 Fork 按钮 |
| 克隆自己的仓库 | `git clone https://github.com/你的用户名/FCLdocs.git` |
| 添加上游仓库 | `git remote add upstream https://github.com/FCLdocs-community/FCLdocs.git` |
| 查看远程仓库 | `git remote -v` |
| 拉取上游更新 | `git fetch upstream` |
| 创建并切换分支 | `git checkout -b 分支名` |
| 查看修改状态 | `git status` |
| 添加文件到暂存区 | `git add .` |
| 提交修改 | `git commit -m "提交信息"` |
| 推送到自己的仓库 | `git push origin 分支名` |
| 同步上游到本地 | `git checkout main && git fetch upstream && git merge upstream/main` |
| 同步后推送 | `git push origin main` |

---

### 常见问题

#### Q1: `git push` 提示 "Permission denied"

说明你尝试推送到没有权限的仓库。请确认：
- 你克隆的是**自己 Fork 的仓库**，不是原仓库。
- 远程地址 `origin` 应该指向 `github.com/你的用户名/FCLdocs.git`。

#### Q2: `git merge upstream/main` 提示冲突（conflict）

说明你本地修改的文件和上游更新有冲突。解决步骤：
1. 打开冲突的文件，找到 `<<<<<<< HEAD` 标记。
2. 手动编辑，保留你想要的代码，删除冲突标记。
3. 保存文件后执行：

   ```bash
   git add .
   git commit -m "解决合并冲突"
   ```

#### Q3: 如何只推送特定文件，而不是全部？

```bash
git add 文件名1 文件名2
git commit -m "只修改了这两个文件"
git push origin 分支名
```

#### Q4: 提交信息写错了，怎么修改？

如果还没推送：

```bash
git commit --amend -m "新的提交信息"
```

如果已经推送了：

```bash
git commit --amend -m "新的提交信息"
git push origin 分支名 --force-with-lease
```

> **注意**：`--force` 和 `--force-with-lease` 会覆盖远程历史（--force-with-lease会相对更安全些），仅在个人分支上使用，不要对共享分支使用。


## 编写注意

文章开头的（例如）：
```
---
sidebar_position: 1
title: GitHub下载
---
```
是文档的顺序和标题，非特殊情况下请勿修改


至此，你完成了对本仓库的贡献，我们会将你的贡献写入贡献者名单😋