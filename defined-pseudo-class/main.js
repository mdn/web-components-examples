customElements.define('simple-custom',
  class extends HTMLElement {
    constructor() {
      super();

      const divElem = document.createElement('div');
      divElem.textContent = this.getAttribute('text');

      this.attachShadow({mode: 'open'})
        .appendChild(divElem);
    }
  }
);
