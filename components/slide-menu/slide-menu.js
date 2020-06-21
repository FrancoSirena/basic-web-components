class SlideMenu extends HTMLElement {
  _root = this.attachShadow({ mode: 'open' })
  _open = false;

  connectedCallback() {
    this._root.innerHTML = `
      <link rel="stylesheet" href="/components/slide-menu/slide-menu.css">
      <div class="frame" data-close="true">
        <nav class="container">
          <div class="title">
            <div class="title-content"><slot name="title">Menu</slot></div>

            <button id="close" data-close="true" class="close">X</button>
          </div>
          <div class="content">
            <slot class="navigation"></slot>
          </div>
        </nav>
      </div>
    `

    this._$drawer = this._root.querySelector('.frame');

    this._$drawer.addEventListener('click', e => {
      if (e.target.dataset.close === 'true') {
        this.open = false;
      }
    })
  }

  get open() {
    return this._open;
  }

  set open(val) {
    this._open = val;
    this.render();
  }

  render() {
    if (this.open) {
      this._$drawer.classList.add('open')
      dispatchEvent(new CustomEvent('menu-opened'));
    } else {
      this._$drawer.classList.remove('open') 
      dispatchEvent(new CustomEvent('menu-closed'));
    }
  }
}


window.customElements.define('slide-menu', SlideMenu);