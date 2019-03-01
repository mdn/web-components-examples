class DialogModal extends HTMLElement {
    constructor(){
      // Establish prototype chain
      super()

      // Create a shadow root
      const shadow = this.attachShadow({ mode: 'open' })

      // Create elements
      const wrapper = document.createElement('div')
      const trigger = document.createElement('button', {type: 'button'})
      const modalWrapper = document.createElement('div')
      const modalContentWrapper = document.createElement('div')
      const closeButton = document.createElement('div')

      // Add classes to elements for styling
      wrapper.setAttribute('class', 'dialog-modal')
      trigger.setAttribute('class', 'dialog-modal__trigger')
      modalWrapper.setAttribute('class', 'dialog-modal__modal')
      modalContentWrapper.setAttribute('class', 'dialog-modal__content')
      closeButton.setAttribute('class', 'dialog-modal__close')

      // Setup modal launch button text
      const buttonText = this.getAttribute('buttonText')
      trigger.textContent = buttonText

      // Setup close button text
      const closeButtonText = this.getAttribute('closeButtonText')
      closeButton.innerText = closeButtonText

      // Add dialog content to modal
      const modalContent = this.firstElementChild.innerHTML
      modalContentWrapper.innerHTML = modalContent

      // Open modal button click event
      trigger.addEventListener('click', () => {
        modalWrapper.style.display = 'block'
      })

      // Close modal button click event
      closeButton.addEventListener('click', () => {
        modalWrapper.style.display = 'none'
      })

      // Some basic modal styling
      const style = document.createElement('style');
      style.textContent = `
        .dialog-modal__trigger {
          padding: 10px 20px;
          background: white;
          border: 1px solid #ccc;
        }
  
        .dialog-modal__modal {
          display: none;
          position: fixed;
          z-index: 1;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          overflow: auto;
          background-color: rgb(0,0,0);
          background-color: rgba(0,0,0,0.4);
        }
  
        .dialog-modal__content {
          background-color: #fefefe;
          margin: 5% auto;
          padding: 20px;
          border: 1px solid #888;
          border-radius: 5px;
          max-width: 600px;
          box-shadow: 0px 11px 15px -7px rgba(0,0,0,0.2), 0px 24px 38px 3px rgba(0,0,0,0.14), 0px 9px 46px 8px rgba(0,0,0,0.12);
        }
  
        .dialog-modal__close {
          color: #aaa;
          text-align: right;
          font-size: 18px;
          font-weight: bold;
        }
  
        .dialog-modal__close:hover,
        .dialog-modal__close:focus {
          color: black;
          text-decoration: none;
          cursor: pointer;
        }
      `

      // Attach the created elements to the shadow dom
      shadow.appendChild(style)
      shadow.appendChild(wrapper)
      wrapper.appendChild(trigger)
      wrapper.appendChild(modalWrapper)
      modalWrapper.appendChild(modalContentWrapper)
      modalContentWrapper.appendChild(closeButton)
    }
  }

  // Register the custom element with the browser
  customElements.define('dialog-modal', DialogModal)
