customElements.define('modal-template',
  class extends HTMLElement {
    constructor() {
      super();

      const modal = document.createElement('div');

      modal.innerHTML = `
        <h3> Modal Template </h3>
      `
      this.attachShadow({mode: 'open'}).appendChild(
        modal
      );
    }
  }
);