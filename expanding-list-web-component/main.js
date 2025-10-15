// Create a class for the element
class ExpandingList extends HTMLUListElement {
  connectedCallback() {
    // Get ul and li elements that are a child of this custom ul element
    // li elements can be containers if they have uls within them
    const uls = this.querySelectorAll('ul');
    const lis = this.querySelectorAll('li');

    // Hide all child uls
    // These lists will be shown when the user clicks a higher level container
    for (const ul of uls) {
      ul.style.display = 'none';
    }

    // Look through each li element in the ul
    for (const li of lis) {
      // If this li has a ul as a child, decorate it and add a click handler
      if (li.querySelectorAll('ul').length > 0) {
        // Add an attribute which can be used by the style
        // to show an open or closed icon
        li.setAttribute('class', 'closed');

        // Wrap the li element's text in a new span element
        // so we can assign style and event handlers to the span
        const childText = li.childNodes[0];
        const newSpan = document.createElement('span');

        // Copy text from li to span, set cursor style
        newSpan.textContent = childText.textContent;
        newSpan.style.cursor = 'pointer';

        // Add click handler to this span
        const onClick = (e) => {
          // next sibling to the span should be the ul
          const nextUl = e.target.nextElementSibling;

          // Toggle visible state and update class attribute on ul
          if (nextUl.style.display === 'block') {
            nextUl.style.display = 'none';
            nextUl.parentNode.setAttribute('class', 'closed');
          } else {
            nextUl.style.display = 'block';
            nextUl.parentNode.setAttribute('class', 'open');
          }
        };

        newSpan.addEventListener('click', onClick);

        // Add the span and remove the bare text node from the li
        childText.parentNode?.insertBefore(newSpan, childText);
        childText.parentNode?.removeChild(childText);
      }
    }
  }
}

// Define the new element
customElements.define('expanding-list', ExpandingList, { extends: 'ul' });
