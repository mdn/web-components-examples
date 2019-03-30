class DialogModalButton extends HTMLButtonElement {
  constructor() {
    super()
    const toggleModal = new Event('toggle-modal', {
      bubbles: true
    })

    this.addEventListener('click', (e) => {
      e.target.dispatchEvent(toggleModal)
    })
  }
}

customElements.define('dialog-modal-button', DialogModalButton, { extends: 'button' })

class DialogModal extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({mode: 'open'})
    const template = document.getElementById('dialog-modal').content
    const dialogModalToggle = document.getElementById('dialog-modal-toggle')
    const closeButton = document.createElement('span')
    closeButton.setAttribute('class', 'dialog-modal-close')

    // Base modal styling. Apply custom style in the template.
    const style = document.createElement('style')
    style.textContent = `
      .dialog-modal-wrap {
        display: none;
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
      }
      .dialog-modal-wrap--active {
        display: block;
      }`

    dialogModalToggle.addEventListener('toggle-modal', (e) => {
      const closeLabel = e.target.dataset.closeLabel
      closeButton.innerText = closeLabel
      shadowRoot.querySelector('.dialog-modal-wrap')
        .classList.add('dialog-modal-wrap--active')
    })

    closeButton.addEventListener('click', () => {
      shadowRoot.querySelector('.dialog-modal-wrap')
        .classList.remove('dialog-modal-wrap--active')
    })

    shadowRoot.appendChild(template.cloneNode(true))
    shadowRoot.appendChild(style)
    shadowRoot.querySelector('.dialog-modal').appendChild(closeButton)
  }
}

customElements.define('dialog-modal', DialogModal)
