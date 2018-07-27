customElements.define('my-paragraph',
  class extends HTMLElement {
    constructor() {
      super();

      const template = document.getElementById('my-paragraph');
      const templateContent = template.content;

      this.attachShadow({mode: 'open'}).appendChild(
        templateContent.cloneNode(true)
      );
    }
  }
);

const slottedSpan = document.querySelector('my-paragraph span');

console.log(slottedSpan.assignedSlot);
console.log(slottedSpan.slot);
