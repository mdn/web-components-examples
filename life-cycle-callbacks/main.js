function squareFactory(win) {
  // Create a class for the element
  class Square extends win.HTMLElement {
    // Specify observed attributes so that
    // attributeChangedCallback will work
    static get observedAttributes() { return ['w', 'l']; }

    constructor() {
      // Always call super first in constructor
      super();

      var shadow = this.attachShadow({ mode: 'open' });

      var div = document.createElement('div');
      var style = document.createElement('style');
      shadow.appendChild(style);
      shadow.appendChild(div);
    }

    connectedCallback() {
      console.log('Custom square element added to page.');
      updateStyle(this);
    }

    disconnectedCallback() {
      console.log('Custom square element removed from page.');
    }

    adoptedCallback() {
      console.log('Custom square element moved to new page.');
    }

    attributeChangedCallback(name, oldValue, newValue) {
      console.log('Custom square element attributes changed.');
      updateStyle(this);
    }
  }
  return Square;
}


customElements.define('custom-square', squareFactory(window));


function updateStyle(elem) {
  var shadow = elem.shadowRoot;
  var childNodes = shadow.childNodes;
  for(var i = 0; i < childNodes.length; i++) {
    if(childNodes[i].nodeName === 'STYLE') {
      childNodes[i].textContent = 'div {' +
                          ' width: ' + elem.getAttribute('l') + 'px;' +
                          ' height: ' + elem.getAttribute('l') + 'px;' +
                          ' background-color: ' + elem.getAttribute('c');
    }
  }
}

var add = document.querySelector('.add');
var update = document.querySelector('.update');
var remove = document.querySelector('.remove');
var adopted = document.querySelector('.adopted');
var square;

update.disabled = true;
remove.disabled = true;

function random(min,max) {
  var random = Math.floor(Math.random()*(max-min+1)+min);
  return random;
}

add.onclick = function() {
  // Create a custom square element
  square = document.createElement('custom-square');
  square.setAttribute('l','100');
  square.setAttribute('c','red');
  document.body.appendChild(square);

  update.disabled = false;
  remove.disabled = false;
  add.disabled = true;
};

update.onclick = function() {
  // Randomly update square's attributes
  square.setAttribute('l',random(50,200));
  square.setAttribute('c','rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) + ')');
};

remove.onclick = function() {
  // Remove the square
  document.body.removeChild(square);

  update.disabled = true;
  remove.disabled = true;
  add.disabled = false;
};

adopted.onclick = function() {
  adopted.disabled = true;

  function createWindow() {
    let promise = new Promise(resolve => {
      let f = document.createElement('iframe');
      f.onload = e => {
        resolve(f.contentWindow);
      };
      document.body.appendChild(f);
    });
    return promise;
  }

  // 1. Create two iframes, w1 and w2.
  Promise.all([createWindow(), createWindow()])
    .then(([w1, w2]) => {
      // 2. Define a custom element in w1.
      w1.customElements.define('custom-square', squareFactory(w1));

      let square = w1.document.createElement('custom-square');
      square.setAttribute('l', '100');
      square.setAttribute('c', 'red');

      // 3. Adopts the custom element into w2 and invokes its adoptedCallback().
      w2.document.body.appendChild(square);
    });
}
