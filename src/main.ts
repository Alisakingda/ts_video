import './iconfont/iconfont.css'  // 图标文件
import popup from "./components/popup/popup";
import video from "./components/video/video";

let dialog = document.getElementsByClassName('dialog')[0];
dialog.addEventListener('click', () => {
  popup({
    width: "880px",
    height: '550px',
    title: 'test dialog component',
    pos: 'center',
    mask: true,
    content: (elem: HTMLElement) => {
      video({
        url: "https://www.youtube.com/ce92760b-8d2b-419b-93ad-2b5a27d125eb",
        elem,
      })
    }
  });
})