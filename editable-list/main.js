'use strict';

(function() {
  class EditableList extends HTMLElement {
    constructor() {
      // establish prototype chain
      super();

      // attaches shadow tree and returns shadow root reference
      // https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow
      const shadow = this.attachShadow({ mode: 'open' });

      // creating a container for the editable-list component
      const editableListContainer = document.createElement('div');

      // get attribute values from getters
      const title = this.title;
      const addItemText = this.addItemText;
      const listItems = this.items;

      // adding a class to our container for the sake of clarity
      editableListContainer.classList.add('editable-list');

      // creating the inner HTML of the editable list element
      editableListContainer.replaceChildren(); // clear safely

      // <h3>
      const heading = document.createElement('h3');
      heading.textContent = title;

      // <ul>
      const ul = document.createElement('ul');
      ul.className = 'item-list';

      // list items
      listItems.forEach(item => {
        const li = document.createElement('li');

        const text = document.createTextNode(item);

        const btn = document.createElement('button');
        btn.className = 'editable-list-remove-item icon';
        btn.textContent = String.fromCharCode(0x2296);

        li.append(text, btn);
        ul.appendChild(li);
      });

      // <div> (input section)
      const div = document.createElement('div');

      const label = document.createElement('label');
      label.textContent = addItemText;

      const input = document.createElement('input');
      input.className = 'add-new-list-item-input';
      input.type = 'text';

      const addBtn = document.createElement('button');
      addBtn.className = 'editable-list-add-item icon';
      addBtn.textContent = String.fromCharCode(0x2295);

      div.append(label, input, addBtn);

      const style = document.createElement("style");
      style.textContent = `li,
                          div>div {
                              display: flex;
                              align-items: center;
                              justify-content: space-between;
                          }

                          .icon {
                              background-color: #fff;
                              border: none;
                              cursor: pointer;
                              float: right;
                              font-size: 1.8rem;
                          }`;

      // append everything
      editableListContainer.append(heading, ul, div,style);

      // binding methods
      this.addListItem = this.addListItem.bind(this);
      this.handleRemoveItemListeners = this.handleRemoveItemListeners.bind(this);
      this.removeListItem = this.removeListItem.bind(this);

      // appending the container to the shadow DOM
      shadow.appendChild(editableListContainer);
    }

    // add items to the list
    addListItem(e) {
      const textInput = this.shadowRoot.querySelector('.add-new-list-item-input');

      if (textInput.value) {
        const li = document.createElement('li');
        const button = document.createElement('button');
        const childrenLength = this.itemList.children.length;

        li.textContent = textInput.value;
        button.classList.add('editable-list-remove-item', 'icon');
        button.textContent = String.fromCharCode(0x2296);

        this.itemList.appendChild(li);
        this.itemList.children[childrenLength].appendChild(button);

        this.handleRemoveItemListeners([button]);

        textInput.value = '';
      }
    }

    // fires after the element has been attached to the DOM
    connectedCallback() {
      const removeElementButtons = [...this.shadowRoot.querySelectorAll('.editable-list-remove-item')];
      const addElementButton = this.shadowRoot.querySelector('.editable-list-add-item');

      this.itemList = this.shadowRoot.querySelector('.item-list');

      this.handleRemoveItemListeners(removeElementButtons);
      addElementButton.addEventListener('click', this.addListItem, false);
    }

    // gathering data from element attributes
    get title() {
      return this.getAttribute('title') || '';
    }

    get items() {
      const items = [];

      [...this.attributes].forEach(attr => {
        if (attr.name.includes('list-item')) {
          items.push(attr.value);
        }
      });

      return items;
    }

    get addItemText() {
      return this.getAttribute('add-item-text') || '';
    }

    handleRemoveItemListeners(arrayOfElements) {
      arrayOfElements.forEach(element => {
        element.addEventListener('click', this.removeListItem, false);
      });
    }

    removeListItem(e) {
      e.target.parentNode.remove();
    }
  }

  // let the browser know about the custom element
  customElements.define('editable-list', EditableList);
})();
