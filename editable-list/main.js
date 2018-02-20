'use strict';

(function() {
    class EditableList extends HTMLElement {
        constructor() {
            super();

            const shadow = this.attachShadow({ mode: 'open' });
            const container = document.createElement('div');
            const title = this.getAttribute('title') || '';
            const addItemText = this.getAttribute('add-item-text') || '';
            const listItems = [];

            let attributes = [...this.attributes];

            container.classList.add('editable-list');

            attributes.forEach(attr => {
                if (attr.name.includes('list-item')) {
                    listItems.push(attr.value);
                }
            });

            container.innerHTML = `
                <style>
                    .icon {
                        cursor: pointer;
                    }
                </style>
                <h3>${title}</h3>
                <ul class="item-list">
                    ${listItems.map(item => `
                        <li>${item}
                            <span class="editable-list-remove-item icon">&#10134;</span>
                        </li>
                    `).join('')}
                </ul>
                <label>${addItemText}</label>
                <input class="add-new-list-item-input" type="text"></input>
                <span class="editable-list-add-item icon">&#10133;</span>
            `;

            this.addListItem = this.addListItem.bind(this);
            this.removeListItem = this.removeListItem.bind(this);

            shadow.appendChild(container);
        }

        addListItem(e) {
            let textInput = this.shadowRoot.querySelector('.add-new-list-item-input');
            if (textInput.value) {
                const itemCount = this.itemList.children.length;

                this.itemList.innerHTML += `
                    <li>${textInput.value}
                        <span class="editable-list-remove-item">&#10134;</span>
                    </li>
                `;

                this.itemList.children[itemCount].addEventListener('click', this.removeListItem, false);
                textInput.value = '';
            }
        }

        connectedCallback() {
            let removeElements = [...this.shadowRoot.querySelectorAll('.editable-list-remove-item')];
            let addElements = [...this.shadowRoot.querySelectorAll('.editable-list-add-item')];

            this.itemList = this.shadowRoot.querySelector('.item-list');

            removeElements.forEach(element => element.addEventListener('click', this.removeListItem, false));
            addElements.forEach(element => element.addEventListener('click', this.addListItem, false));
        }

        removeListItem(e) {
            e.target.parentNode.remove();
        }
    }

    customElements.define('editable-list', EditableList);
})();
