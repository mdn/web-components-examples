// Create a class for the element
class Square extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    var width = this.getAttribute('w');
    var height = this.getAttribute('w');
    var bgColor = this.getAttribute('c');

    var shadow = this.attachShadow({mode: 'open'});

    var div = document.createElement('div');
    shadow.appendChild(div);

    var style = document.createElement('style');
    style.textContent = 'div {' +
                        ' width: ' + width + 'px;' +
                        ' height: ' + height + 'px;' +
                        ' background-color: ' + bgColor;
    shadow.appendChild(style);

  }

  connectedCallback() {
    console.log('Custom square element registered on page.');
  }
}

// Define the new element
customElements.define('custom-square', Square);
