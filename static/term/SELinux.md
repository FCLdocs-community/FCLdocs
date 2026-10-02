# SELinux

[brief]
SELinux 是安卓系统里的一层"安全管理员"，它会限制每个 App 只能访问被允许的文件和功能，防止恶意程序越权干坏事。
[/brief]

[detail]
## SELinux 是什么

SELinux（Security-Enhanced Linux，安全增强型 Linux）是一套 Linux 内核的安全模块，通过强制访问控制（MAC）策略，限制进程只能访问被授权的资源。

## 作用

- **最小权限**：即使某个进程被攻破，攻击者也只能在受限范围内活动。
- **隔离应用**：防止恶意 App 越权访问其他 App 的数据或系统敏感文件。
- **保护系统**：限制进程对系统关键目录、设备的访问。

## 在 Android 中的体现

Android 从 4.3 开始引入 SELinux，并在后续版本强制启用。它是 `Android/data` 目录受限、普通文件管理器无法随意读写某些目录的原因之一。

## 和玩家的关系

- `Android/data` 访问限制与 SELinux 等安全机制有关。
- 某些需要 root 的进阶操作会涉及修改 SELinux 策略（如"宽容模式"），风险较高，普通用户不建议操作。
[/detail]
