class StarRating extends HTMLElement {
  _root = this.attachShadow({ mode: "open" });
  _$star = "&#9733;";
  _disabled = false;
  _value = 0;

  connectedCallback() {
    this._root.innerHTML = `
      <link href="/components/star-rating/star-rating.css" rel="stylesheet" >
      <div class="container">
        <div class="top">
          ${Array.from({ length: 5 }, () => `<span>${this._$star}</span>`).join(
            ""
          )}
        </div>
        <div class="bottom">
        ${Array.from({ length: 5 })
          .map(
            (_, i, arr) =>
              `<span data-value="${arr.length - i}">${this._$star}</span>`
          )
          .join("")} 
        </div>
      </div>
    `;

    this._root.querySelectorAll(".bottom").forEach((el) => {
      el.addEventListener("click", this.setStarValue.bind(this));
    });

    this._disabled = this.getAttribute("disabled") !== null;

    this.paintStars();
  }

  setStarValue(event) {
    this.dispatchEvent(new Event("change"));
    if (this.value === Number(event.target.dataset.value)) {
      this.value = 0
    } else {
      this.value = event.target.dataset.value;
    }
  }

  paintStars() {
    const stars = this._root.querySelectorAll(".top span");
    let index = 0;
    for (const star of stars) {
      if (index < this._value) {
        star.classList.add("selected");
      } else {
        star.classList.remove("selected");
      }
      index++;
    }
  }

  get value() {
    return this._value;
  }

  set value(val) {
    if (Number(val) === this._value) return;
    this._value = Number(val);
    this.paintStars();
  }

  static get observedAttributes() {
    return ["disabled", "value"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === "disabled") {
        this._disabled = newValue !== null;
      }
      if (name === "value") {
        this.value = newValue;
      }
    }
  }
}

window.customElements.define("star-rating", StarRating);
