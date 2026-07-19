import React from 'react';
import Link from '@docusaurus/Link';

export default function AboutSite() {
  const cardStyle = {
    background: 'var(--ifm-card-background-color, var(--ifm-background-surface-color))',
    border: '1px solid var(--ifm-color-emphasis-200)',
    borderRadius: '16px',
    padding: '24px',
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    position: 'relative',
    overflow: 'hidden',
  };

  const titleStyle = {
    fontSize: '1.1rem',
    fontWeight: 600,
    color: 'var(--ifm-heading-color)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    margin: 0,
  };

  const descStyle = {
    fontSize: '0.9rem',
    color: 'var(--ifm-color-emphasis-600)',
    lineHeight: 1.6,
    margin: 0,
  };

  const buttonStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '8px 16px',
    background: 'var(--ifm-color-primary)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.85rem',
    fontWeight: 500,
    cursor: 'pointer',
    textDecoration: 'none',
    width: 'fit-content',
    marginTop: '4px',
    transition: 'opacity 0.2s',
  };

  const linkStyle = {
    color: 'var(--ifm-color-primary)',
    fontSize: '0.85rem',
    fontWeight: 500,
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    marginTop: 'auto',
  };

  const linkListStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    margin: 0,
    padding: 0,
    listStyle: 'none',
  };

  const linkListItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.9rem',
    color: 'var(--ifm-font-color-base)',
  };

  // 爱心插图
  const HeartIllustration = () => (
    <div style={{
      width: '80px',
      height: '80px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '48px',
      filter: 'drop-shadow(0 4px 8px rgba(231, 76, 60, 0.3))',
    }}>
      💜
    </div>
  );

  // 文档插图
  const DocIllustration = () => (
    <div style={{
      width: '60px',
      height: '60px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '28px',
      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
    }}>
      📄
    </div>
  );

  // 问号插图
  const FAQIllustration = () => (
    <div style={{
      width: '60px',
      height: '60px',
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '28px',
      boxShadow: '0 4px 12px rgba(245, 87, 108, 0.3)',
    }}>
      ❓
    </div>
  );

  return (
    <div className="about-site-container">
      <style>{`
        .about-site-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 16px 40px;
        }
        .about-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr;
          }
          .about-site-container {
            padding: 0 12px 24px;
          }
        }
        .about-card {
          background: var(--ifm-card-background-color, var(--ifm-background-surface-color));
          border: 1px solid var(--ifm-color-emphasis-200);
          border-radius: 16px;
          padding: 24px;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          gap: 12px;
          position: relative;
          overflow: hidden;
        }
        [data-theme='dark'] .about-card {
          background: rgba(255, 255, 255, 0.03);
          border-color: rgba(255, 255, 255, 0.1);
        }
        .about-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
          border-color: var(--ifm-color-primary-lighter);
        }
        [data-theme='dark'] .about-card:hover {
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
          background: rgba(255, 255, 255, 0.05);
        }
        .about-card-illustration {
          position: absolute;
          right: 20px;
          bottom: 20px;
          opacity: 0.9;
          pointer-events: none;
        }
        .link-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin: 0;
          padding: 0;
          list-style: none;
        }
        .link-list li {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
          color: var(--ifm-font-color-base);
        }
        .link-list a {
          color: var(--ifm-font-color-base);
          text-decoration: none;
          transition: color 0.2s;
        }
        .link-list a:hover {
          color: var(--ifm-color-primary);
        }
        .about-footer {
          margin-top: 40px;
          padding-top: 24px;
          border-top: 1px solid var(--ifm-color-emphasis-200);
          text-align: center;
          color: var(--ifm-color-emphasis-500);
          font-size: 0.85rem;
        }
        .social-links {
          margin-top: 12px;
          display: flex;
          justify-content: center;
          gap: 16px;
        }
        .social-links a {
          color: var(--ifm-color-emphasis-500);
          transition: color 0.2s;
        }
        .social-links a:hover {
          color: var(--ifm-color-primary);
        }
      `}</style>

      <div className="about-grid">
        {/* 卡片1：关于本教程 */}
        <div className="about-card">
          <h3 style={titleStyle}>
            <span>📘</span> 关于本教程
          </h3>
          <p style={descStyle}>
            面向 FCL 新手，从下载安装到进阶使用。如果你从未看过这个文档，请点击“开始学习”按钮
          </p>
          <Link to="/docs" style={buttonStyle}>
            开始学习 →
          </Link>
        </div>

        {/* 卡片2：给新人的话 */}
        <div className="about-card">
          <h3 style={titleStyle}>
            <span>💝</span> 给新人的话
          </h3>
          <p style={descStyle}>
            欢迎来到 Minecraft Java 的世界！愿你在这里收获快乐与创造。
          </p>
          <Link to="/docs/关于本站/给新人的话" style={buttonStyle}>
            查看祝福
          </Link>
        </div>

        {/* 卡片3：贡献者名单 */}
        <div className="about-card">
          <h3 style={titleStyle}>
            <span>👥</span> 贡献者名单
          </h3>
          <p style={descStyle}>
            感谢以下小伙伴的无私付出，让本教程变得更好！
          </p>
          <Link to="/docs/关于本站/贡献者名单" style={buttonStyle}>
            查看名单 →
          </Link>
        </div>

        {/* 卡片4：项目链接 */}
        <div className="about-card">
          <h3 style={titleStyle}>
            <span>🔗</span> 项目链接
          </h3>
          <ul className="link-list">
            <li>
              <span>🐙</span>
              <Link to="https://github.com/FCLdocs-community/FCLdocs" target="_blank">
                GitHub 仓库
              </Link>
            </li>
            <li>
              <span>🐧</span>
              <Link to="https://qun.qq.com/universal-share/share?ac=1&authKey=Nf%2BO4R9xCZGYRasFG4kpxeX2w3MsH0KN125sccK5Wrs6PPOEn29E9lnJI0%2FLqsXf&busi_data=eyJncm91cENvZGUiOiI3NDM0NjAwNzEiLCJ0b2tlbiI6ImZSQkxZYkg3MFhQbWN6ZDhoTTlzbWtRa3I0NUJnSW9rS1RMeFhoZ28wK3Y2NXZsdG1SRjRuT0ZwcnpmSnVnRmsiLCJ1aW4iOiIzNDQyMzU5NDA3In0%3D&data=-9vTq8DUGSTiaSIlbhF8Fon9KEV9k_kZ2WDPPxT1FZXrIK2O7AbaosXMoAkVPiJdPxxrBkTAYpjmshHY_8a69g&svctype=4&tempid=h5_group_info" target="_blank">
                QQ 交流群
              </Link>
            </li>
          </ul>
        </div>

        {/* 卡片5：支持项目 */}
        <div className="about-card">
          <div className="about-card-illustration">
            <HeartIllustration />
          </div>
          <h3 style={titleStyle}>
            <span>💖</span> 支持项目
          </h3>
          <ul className="link-list">
            <li>
              <span>⭐</span>
              <Link to="https://github.com/FCLdocs-community/FCLdocs" target="_blank">
                给我们一个 Star
              </Link>
            </li>
            <li>
              <span>🐛</span>
              <Link to="https://github.com/FCLdocs-community/FCLdocs/issues" target="_blank">
                提交 Issue 帮助改进
              </Link>
            </li>
          </ul>
        </div>

        {/* 卡片6：更新日志 */}
        <div className="about-card">
          <div className="about-card-illustration">
            <DocIllustration />
          </div>
          <h3 style={titleStyle}>
            <span>📝</span> 更新日志
          </h3>
          <p style={descStyle}>
            查看最近更新内容，了解我们做了什么
          </p>
          <Link to="/docs/changelog" style={linkStyle}>
            查看更新 →
          </Link>
        </div>

        {/* 卡片7：常见问题 */}
        <div className="about-card">
          <div className="about-card-illustration">
            <FAQIllustration />
          </div>
          <h3 style={titleStyle}>
            <span>❓</span> 常见问题
          </h3>
          <p style={descStyle}>
            遇到问题？先来这里找答案，或许你想要的已经有了
          </p>
          <Link to="/docs/FAQ问题集合" style={linkStyle}>
            查看 FAQ →
          </Link>
        </div>
      </div>

      {/* 底部 Footer */}
      <div className="about-footer">
        <div>Made with by FCL-community 团队</div>
        <div style={{ marginTop: '8px', fontSize: '0.8rem' }}>
          © 2026 FCL-community 团队 · CC-BY-SA-4.0 License
        </div>
        <div className="social-links">
          <Link to="https://github.com/FCLdocs-community" target="_blank" aria-label="GitHub">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
