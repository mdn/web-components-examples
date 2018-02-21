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

            // gathering data from element attributes
            const title = this.getAttribute('title') || '';
            const addItemText = this.getAttribute('add-item-text') || '';

            // list items will be created later
            const listItems = [];

            // creating an array from the attributes nodelist
            let attributes = [...this.attributes];

            // adding a class to our container for the sake of clarity
            editableListContainer.classList.add('editable-list');

            // pushing attributes following the proper naming convention into the listItems array
            attributes.forEach(attr => {
                if (attr.name.includes('list-item')) {
                    listItems.push(attr.value);
                }
            });

            // creating the inner HTML of the editable list element
            editableListContainer.innerHTML = `
                <style>
                    li {
                        margin: 1rem 0;
                    }

                    .icon {
                        background-color: #fff;
                        border: none;
                        cursor: pointer;
                        float: right;
                    }
                </style>
                <h3>${title}</h3>
                <ul class="item-list">
                    ${listItems.map(item => `
                        <li>${item}
                            <button class="editable-list-remove-item icon">&#10134;</button>
                        </li>
                    `).join('')}
                </ul>
                <label>${addItemText}</label>
                <input class="add-new-list-item-input" type="text"></input>
                <button class="editable-list-add-item icon">&#10133;</button>
            `;

            // binding methods
            this.addListItem = this.addListItem.bind(this);
            this.handleRemoveItemListeners = this.handleRemoveItemListeners.bind(this);
            this.removeListItem = this.removeListItem.bind(this);

            // appending the container to the shadow DOM
            shadow.appendChild(editableListContainer);
        }

        handleRemoveItemListeners(arrayOfElements) {
            arrayOfElements.forEach(element => element.addEventListener('click', this.removeListItem, false));
        }

        // add items to the list
        addListItem(e) {
            let textInput = this.shadowRoot.querySelector('.add-new-list-item-input');
            if (textInput.value) {
                const li = document.createElement('li');
                const button = document.createElement('button');
                const childrenLength = this.itemList.children.length;

                li.textContent = textInput.value;
                button.classList.add('editable-list-remove-item', 'icon');
                button.textContent = '\u2796';

                this.itemList.appendChild(li);
                this.itemList.children[childrenLength].appendChild(button);

                this.handleRemoveItemListeners([...this.itemList.children]);

                textInput.value = '';
            }
        }

        // fires after the element has been attached to the DOM
        connectedCallback() {
            let removeElementButtons = [...this.shadowRoot.querySelectorAll('.editable-list-remove-item')];
            let addElementButton = this.shadowRoot.querySelector('.editable-list-add-item');

            this.itemList = this.shadowRoot.querySelector('.item-list');

            this.handleRemoveItemListeners(removeElementButtons);
            addElementButton.addEventListener('click', this.addListItem, false);
        }

        // remove items from the list
        removeListItem(e) {
            e.target.parentNode.remove();
        }
    }

    // let the browser know about the custom element
    customElements.define('editable-list', EditableList);
})();
