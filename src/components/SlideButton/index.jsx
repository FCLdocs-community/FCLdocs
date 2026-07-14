import React, { useState } from 'react';
import styles from './SlideButton.module.css';

// 定义 Yes 和 No 子组件，仅作为标记用来包裹内容
function Yes({ children }) {
  return <>{children}</>;
}
function No({ children }) {
  return <>{children}</>;
}

export default function SlideButton({ label, children }) {
  const [isChecked, setIsChecked] = useState(false);

  // 遍历子组件，提取 Yes 和 No 的内容
  let yesContent = null;
  let noContent = null;
  
  React.Children.forEach(children, (child) => {
    if (child.type === Yes) {
      yesContent = child.props.children;
    } else if (child.type === No) {
      noContent = child.props.children;
    }
  });

  return (
    <div className={styles.slideContainer}>
      <div className={styles.header}>
        <span className={styles.labelText}>{label}</span>
        <label className={styles.switch}>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
          <span className={styles.slider}></span>
        </label>
        <span className={styles.statusText}>
          {isChecked ? '是' : '否'}
        </span>
      </div>

      <div className={styles.contentArea}>
        {/* MDX 解析的内容会传入 */}
        {isChecked ? yesContent : noContent}
      </div>
    </div>
  );
}

// 将 Yes 和 No 挂载到主组件上，以便在 MDX 中使用 <SlideButton.Yes>
SlideButton.Yes = Yes;
SlideButton.No = No;
