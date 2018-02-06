class ContextAwareSpan extends HTMLSpanElement {
    constructor() {
      super();
      let style = document.createElement('style');

      const shadowRoot = this.attachShadow({mode: 'open'});
      shadowRoot.appendChild(style);

      style.textContent = ':host-context(h1) { font-style: italic; }' +
                          ':host(a span) { color : red; }' +
                          ':host { font-size: 0.8rem; }';
    }
}

// Define the new element
customElements.define('context-aware-span', ContextAwareSpan, {extends : 'span'});
