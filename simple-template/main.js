customElements.define('my-paragraph',
  class extends HTMLElement {
    constructor() {
      super();
      let template = document.getElementById('my-paragraph');
      let templateContent = template.content;

      const shadowRoot = this.attachShadow({mode: 'open'})
        .appendChild(templateContent.cloneNode(true));
  }
})

let slottedSpan = document.querySelector('my-paragraph span')
console.log(slottedSpan.assignedSlot);
console.log(slottedSpan.slot);
