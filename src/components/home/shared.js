import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faCheck, faBolt, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import Link from '@docusaurus/Link';
import sharedStyles from './shared.module.css';

export { FontAwesomeIcon, faRocket, faCheck, faBolt, faBookOpen, faGithub, Link };

function QQIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ width: '1em', height: '1em' }}>
      <path d="M21.395 15.035c-.184-.742-.623-1.842-1.477-3.838.324-1.648.184-3.838-.738-5.566C18.184 3.838 15.949 2 12 2S5.816 3.838 4.82 5.631c-.922 1.728-1.062 3.918-.738 5.566-.854 1.996-1.293 3.096-1.477 3.838-.184.742.184 1.484.922 1.666.738.184 1.477-.184 1.66-.922.061-.246.246-.861.553-1.717.246.676.615 1.352 1.107 1.967-.553.553-.922 1.293-.922 2.096 0 1.666 1.354 3 3 3 1.107 0 2.092-.615 2.615-1.477.523.061 1.046.061 1.57 0 .523.861 1.508 1.477 2.615 1.477 1.66 0 3-1.334 3-3 0-.803-.369-1.543-.922-2.096.492-.615.861-1.291 1.107-1.967.307.855.492 1.471.553 1.717.184.738.922 1.105 1.66.922.738-.182 1.106-.924.922-1.666z" />
    </svg>
  );
}

function StackedImageCycler({ images, interval, pauseDuration, alt, eagerFirst }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    let cycleIndex = 0;
    let unmounted = false;

    const scheduleNext = () => {
      if (unmounted) return;
      const nextIndex = cycleIndex + 1;
      if (nextIndex >= images.length) {
        timerRef.current = setTimeout(() => {
          if (unmounted) return;
          cycleIndex = 0;
          setCurrentIndex(0);
          timerRef.current = setTimeout(scheduleNext, interval);
        }, pauseDuration);
      } else {
        cycleIndex = nextIndex;
        setCurrentIndex(nextIndex);
        timerRef.current = setTimeout(scheduleNext, interval);
      }
    };

    timerRef.current = setTimeout(scheduleNext, interval);
    return () => {
      unmounted = true;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [images.length, interval, pauseDuration]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`${alt} ${i + 1}`}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            opacity: i === currentIndex ? 1 : 0,
            transition: 'opacity 0.4s ease',
            zIndex: i === currentIndex ? 1 : 0,
          }}
          loading={eagerFirst && i === 0 ? 'eager' : 'lazy'}
        />
      ))}
    </div>
  );
}

export { QQIcon, StackedImageCycler };

export const IMG_APP = '/img/index/img_app.png';
export const IMG_1 = '/img/index/1.jpg';
export const IMG_VERSION = '/img/index/版本下载.jpg';
export const IMG_MODLOADER = '/img/index/模组加载器.jpg';
export const IMG_SHADER = '/img/index/光影.jpg';
export const IMG_DYNAMIC1 = '/img/index/动态管理1.jpg';
export const IMG_DYNAMIC2 = '/img/index/动态管理2.jpg';
export const IMG_DYNAMIC3 = '/img/index/动态管理3.jpg';
export const IMG_DYNAMIC4 = '/img/index/动态管理4.jpg';
export const IMG_JAVA = '/img/index/Java.jpg';
export const IMG_VIRTUALKEY = '/img/index/虚拟按键.jpg';
export const IMG_THEME = '/img/index/主题.jpg';
export const IMG_PLUGIN1 = '/img/index/插件1.jpg';
export const IMG_PLUGIN2 = '/img/index/插件2.jpg';
export const IMG_FCLGITHUB = '/img/index/FCLgithub.png';
export const IMG_QQ = '/img/index/QQ.jpg';
export const IMG_FCL_ICON = '/img/fcl-icon.png';

export const GITHUB_URL = 'https://github.com/FCL-Team/FoldCraftLauncher';
export const QQ_GROUP_URL = 'https://qun.qq.com/universal-share/share?ac=1&authKey=HoBMAE02%2BrrStV%2FvxFJ6a8nEM%2BUN%2Fvvbz1aqnpEdtRTqx0odUWkBmZwRhz56WURe&busi_data=eyJncm91cENvZGUiOiI3NDM0NjAwNzEiLCJ0b2tlbiI6IkxmeGZrVVlsK1dWTWY5THhhdHhHa0dpZFBNSjl3N1hXZWFTZVBLUmNLczZsZUpRcTk2TkZhbWpJTS9jT0tVV1EiLCJ1aW4iOiIzNDQyMzU5NDA3In0%3D&data=R4bgdQ_R5K-gefKWSFI6lfxbK_cAFnltrosrpX6CP5VePsSlburN76vzKTMb-uMaRW2ihLqRk63ijMB7HYqTkA&svctype=4&tempid=h5_group_info';
