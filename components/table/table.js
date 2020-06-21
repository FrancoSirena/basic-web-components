class MyTable extends HTMLElement {

  static get observedAttributes() {
    return ["state"]
  }

  get data() {
    return this._data;
  }

  set data(val) {
    this._data = val;
    this._pages = Math.ceil(val.length / this._size);
    this._render();
  }

  get currentPage() {
    return this._currentPage
  }

  set currentPage(val) {
    this._currentPage = val;
    this._render()
  }

  constructor() {
    super();
    this._state = "simple"
    this._attached = false
    this._identifier = Date.now();
    this._body = null;
    this._sortedBy = 'id'
    this._sortedOrder = 'asc'
    this._currentPage = 1
    this._pages = 1;
    this._size = 10;
  }

  connectedCallback() {
    changeData();
    this._attached = true;
    this.innerHTML = `
      <style>
        th, td {
          padding: 0px 16px;
          border-bottom: 1px solid;
        }
      </style>
      <table id="table_${this._identifier}">
      <thead>
        <th data-col="id" data-type="string">ID</th>
        <th data-col="name" data-type="string">Name</th>
      </thead>
      <tbody>
      </tbody>
      </table>
      <footer>
        <button id="previous"><</button>
        <span id="page"></span>
        <button id="next">></button>
      </footer>
      `;

    this._body = this.querySelector(`tbody`);
    this._pageAt = this.querySelector('#page')
    for (const element of this.querySelectorAll('th')) {
      element.addEventListener('click', this.arrange.bind(this))
    }

    this.querySelector('#previous').addEventListener('click', e => {
      if (this.currentPage <= 1) {
        return;
      }
      this.currentPage -= 1;
    })

    this.querySelector('#next').addEventListener('click', e => {
      if (this.currentPage === this._pages) {
        return;
      }
      this.currentPage += 1;
    })

    this._render();
  }

  arrange(e) {
    const column = e.target.getAttribute('data-col');
    const type = e.target.getAttribute('data-type')
    const lastSort = e.target.getAttribute('data-sorted') || 'asc'
    const order = lastSort === 'asc' ? 'desc' : 'asc'
    e.target.setAttribute('data-sorted', order )
    this._sortedBy = column
    this._sortedOrder = order
    this.data = this.data.sort((a, b) => {
      let current = a
      let next = b
      if (lastSort === 'asc') {
        current = b
        next = a
      }
      if (type === 'string') {
        return current[column].localeCompare(next[column])
      }
      return current[column] - next[column]
    })
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this._state = newValue;
    this._render();
  }

  _render() {
    if (!this._attached) {
      return;
    }
    
    const span = document.createElement('span')
    span.classList.add('arrow');
    span.innerHTML = this._sortedOrder === 'desc' ? '&uarr;' : '&darr;'
    this.querySelector('.arrow')?.remove();
    this.querySelector(`[data-col="${this._sortedBy}"]`)?.appendChild(span)
    this._pageAt.innerHTML = `${this._currentPage} of ${this._pages}`

    const from = (this._currentPage - 1) * this._size;

    this._body.innerHTML =
      this._data?.slice(from, from+this._size).map(item => `
      <tr>
        <td>${item.id}</td>
        <td>${item.name}</td>
      `)?.join('</tr>')
  }



}

window.customElements.define('fr-table', MyTable)

function changeData() {
  const data = Array.from(
    { length: faker.random.number({ max: 150 }) },
    () => ({
      id: faker.random.uuid(),
      name: faker.company.companyName(),
    })
  );
  document.querySelector("fr-table").data = data;
}

