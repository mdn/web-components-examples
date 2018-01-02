customElements.define('element-details',
  class extends HTMLElement {
    constructor() {
      super();
      const template = document
        .getElementById('element-details-template')
        .content;
      const shadowRoot = this.attachShadow({mode: 'open'})
        .appendChild(template.cloneNode(true));
  }
});
