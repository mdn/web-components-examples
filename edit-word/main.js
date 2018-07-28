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
      `;

      shadowRoot.appendChild(style);
      shadowRoot.appendChild(templateContent.cloneNode(true));
    }
  }
);

customElements.define('edit-word',
  class extends HTMLElement {
    constructor() {
      super();

      const shadowRoot = this.attachShadow({mode: 'open'});
      const form = document.createElement('form');
      const input = document.createElement('input');
      const span = document.createElement('span');

      const style = document.createElement('style');
      style.textContent = 'span { background-color: #eef; padding: 0 2px }';

      shadowRoot.appendChild(style);
      shadowRoot.appendChild(form);
      shadowRoot.appendChild(span);

      span.textContent = this.textContent;

      form.appendChild(input);
      form.style.display = 'none';
      span.style.display = 'inline-block';
      input.style.width = span.clientWidth + 'px';

      this.setAttribute('tabindex', '0');
      input.setAttribute('required', 'required');
      this.style.display = 'inline-block';

      this.addEventListener('click', () => {
        span.style.display = 'none';
        form.style.display = 'inline-block';
        input.focus();
      });

      form.addEventListener('submit', e => {
        e.preventDefault();
      });
      input.addEventListener('change', updateDisplay);

      function updateDisplay() {
        span.style.display = 'inline-block';
        form.style.display = 'none';
        span.textContent = input.value;
        input.value = '';
        input.style.width = span.clientWidth + 'px';
      }
    }
  }
);
