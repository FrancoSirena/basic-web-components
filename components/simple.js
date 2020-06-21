
function addMe() {
  const element = new MyCustomComponent();
  element.append('Blaaaa');
  document.querySelector('#bla-list').appendChild(element);
}

function deleteMe() {
  document.getElementsByTagName('fr-custom')[0]?.remove();
}

class MyCustomComponent extends HTMLElement {

  static get observedAttributes() {
    return ["demo"]
  }
  constructor() {
    super();
    console.log('something')
  }

  connectedCallback() {
    console.log('connected')
  }

  disconnectedCallback() {
    console.log('disconnected')
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log({ name, oldValue ,newValue})
  }
}

window.customElements.define('fr-custom', MyCustomComponent)

class MyButton extends HTMLButtonElement {
  connectedCallback() {
    this.addEventListener('click', () => {
      alert('aren\'t you lovely?')
    })
  }
}

window.customElements.define('fr-button', MyButton, { extends: 'button'})