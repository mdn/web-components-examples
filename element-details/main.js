customElements.define('element-details',
  class extends HTMLElement {
    constructor() {
      super();
      var template = document
        .getElementById('element-details-template')
        .content;
      const shadowRoot = this.attachShadow({mode: 'open'})
        .appendChild(template.cloneNode(true));
  }
});
