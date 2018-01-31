customElements.define('open-shadow',
  class extends HTMLElement {
    constructor() {
      super();

      let pElem = document.createElement('p');
      pElem.textContent = this.getAttribute('text');

      let shadowRoot = this.attachShadow({mode: 'open'})
        .appendChild(pElem);

  }
});

customElements.define('closed-shadow',
  class extends HTMLElement {
    constructor() {
      super();

      let pElem = document.createElement('p');
      pElem.textContent = this.getAttribute('text');

      let shadowRoot = this.attachShadow({mode: 'closed'})
        .appendChild(pElem);
  }
});

document.querySelector('html').addEventListener('click',function(e) {
  console.log(e.composed);
  console.log(e.composedPath());
});
