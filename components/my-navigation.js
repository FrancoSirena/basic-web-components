class MyNavigation extends HTMLElement {
  _root = this.attachShadow({ mode: "open" }) 

  connectedCallback() {
    this._root.innerHTML= `
      <script src="components/slide-menu/slide-menu.js"></script>
      <div class="menu">
        <button id="open">Open Menu</button>
      </div>
      <slide-menu theme="blue">
        <a href="index.html">Home</a>
        <a href="table.html">Table</a>
      </slide-menu>
    `;

    this._root.querySelector('#open').addEventListener('click', () => {
      this._root.querySelector('slide-menu').open = true;
    })
  }
}

window.customElements.define('my-navigation', MyNavigation)