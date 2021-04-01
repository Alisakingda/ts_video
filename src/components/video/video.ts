const styles = require('./video.css').default;

function video(options: Ivideo) {
  return new Video(options);
}

interface Ivideo {
  url: string;
  elem: HTMLElement;
  width?: string;
  height?: string;
  autoPlay?: boolean;
}

interface Icomponent {
  tempContainer: HTMLElement;
  init: () => void;
  template: () => void;
  handle: () => void;
}

class Video implements Icomponent {
  tempContainer: any;
  constructor(private settings: Ivideo) {
    this.settings = Object.assign({
      width: '100%',
      height: '100%',
      autoPlay: false,
    }, this.settings)
    this.init();
  }
  init() {
    this.template();
    this.handle();
  }
  template() {
    this.tempContainer = document.createElement('div');
    this.tempContainer.style.width = this.settings.width;
    this.tempContainer.style.height = this.settings.height;
    this.tempContainer.innerHTML = `
      <video style="object-fit:fill;" width="${this.settings.width}" height="${this.settings.height}" autoplay playsinline muted loop preload poster="https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/oceanshot.jpg">
        <source src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/ocean-small.webm" />
        <source src="http://thenewcode.com/assets/videos/ocean-small.mp4" />
      </video>
    `;

    this.settings.elem as HTMLElement && this.settings.elem.append(this.tempContainer);
  }
  handle() {
    let video = this.tempContainer.querySelector("video");
    if (window.matchMedia('(prefers-reduced-motion)').matches) {
      video.removeAttribute("autoplay");
      video.pause();
    }
  }
}

export default video;