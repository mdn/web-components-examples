customElements.define('person-details',
  class extends HTMLElement {
    constructor() {
      super();

      const template = document.getElementById('person-template');
      const templateContent = template.content;

      const shadowRoot = this.attachShadow({mode: 'open'});

      const style = document.createElement('style');
      style.textContent = `
        div { padding: 10px; border: 1px solid gray; width: 200px; margin: 10px; }
        h2 { margin: 0 0 10px; }
        ul { margin: 0; }
        p { margin: 10px 0; }
        ::slotted(*) { color: gray; font-family: sans-serif; }
      `;

      shadowRoot.appendChild(style);
      shadowRoot.appendChild(templateContent.cloneNode(true));
  }
});
