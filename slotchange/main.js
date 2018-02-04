customElements.define('summary-display',
  class extends HTMLElement {
    constructor() {
      super();

      let template = document.getElementById('summary-display-template');
      let templateContent = template.content;

      let style = document.createElement('style');

      let para = this.querySelector('p');

      let shadowRoot = this.attachShadow({mode: 'open'});
      shadowRoot.appendChild(templateContent.cloneNode(true));

      let items = this.querySelectorAll('li');
      let descriptions = this.querySelectorAll('p');

      for(let i = 0; i < items.length; i++) {
        handleClick(items[i]);
      }

      function handleClick(item) {
        item.addEventListener('click', function() {
          for(let i = 0; i < items.length; i++) {
            items[i].style.backgroundColor = 'white';
          }

          for(let j = 0; j < descriptions.length; j++) {
            updateDisplay(descriptions[j], item);
          }
        });
      }

      function updateDisplay(description, item) {
        description.removeAttribute('slot');

        if(description.getAttribute('data-name') === item.textContent) {
          description.setAttribute('slot','choice');
          item.style.backgroundColor = '#bad0e4';
        } else {

        }
      }

      let slots = this.shadowRoot.querySelectorAll('slot');
      slots[1].addEventListener('slotchange', function(e) {
        let nodes = slots[1].assignedNodes();
        console.log('Element in Slot "' + e.target.name + '" changed to "' + nodes[0].outerHTML + '".');
      });
  }
});
