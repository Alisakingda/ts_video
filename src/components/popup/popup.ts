const styles = require('./popup.css').default;

function popup(options: Ipopup) {
  return new Popup(options);
}

interface Ipopup {
  width?: string;
  height?: string;
  title?: string;
  pos?: string;
  mask?: boolean;
  content: (elem: HTMLElement) => void;
}

interface Icomponent {
  tempContainer: HTMLElement;
  init: () => void;
  template: () => void;
  handle: () => void;
}

class Popup implements Icomponent {
  tempContainer: any;
  mask: any;
  constructor(private settings: Ipopup) {
    this.settings = Object.assign({
      // 默认值
      width: '100%',
      height: '100%',
      title: '',
      pos: 'center',
      mask: true,
      content: function () { }
    }, this.settings)
    this.init();
  }
  // 初始化
  init() {
    this.template();
    this.handle();
    this.settings.mask && this.createMask();
    this.contentCallback();
  }
  // 创建模板
  template() {
    this.tempContainer = document.createElement('div');
    this.tempContainer.style.width = this.settings.width;
    this.tempContainer.style.height = this.settings.height;
    this.tempContainer.className = styles.popup;

    this.tempContainer.innerHTML = `
      <div class="${styles['popup-title']}">
        <h3>${this.settings.title}</h3>
        <i class="iconfont icon-guanbi"></i>
      </div>
      <div class="${styles['popup-content']}"></div>
    `;
    document.body.appendChild(this.tempContainer);

    // pos相关
    if (this.settings.pos == 'right') {
      this.tempContainer.style.top = 0;
      this.tempContainer.style.right = 0;
    } else if (this.settings.pos == 'left') {
      this.tempContainer.style.bottom = 0;
      this.tempContainer.style.left = 0;
    } else {
      this.tempContainer.style.left = (window.innerWidth - this.tempContainer.offsetWidth) / 2 + 'px';
      this.tempContainer.style.top = (window.innerHeight - this.tempContainer.offsetHeight) / 2 + 'px';
    }
  }
  // 事件操作
  handle() {
    let popupClose = this.tempContainer.querySelector(`.${styles['popup-title']} i`);
    popupClose.addEventListener('click', () => {
      this.tempContainer && document.body.removeChild(this.tempContainer);
      this.mask && document.body.removeChild(this.mask);
    })
  }
  // 创建蒙层
  createMask() {
    this.mask = document.createElement('div');
    this.mask.className = styles.mask;
    document.body.appendChild(this.mask);
  }
  // content回调函数
  contentCallback() {
    let popupContent = this.tempContainer.querySelector(`.${styles['popup-content']}`);
    this.settings.content(popupContent);
  }
}

export default popup;