# web-components-examples
A series of web components examples, related to the MDN web components documentation at https://developer.mozilla.org/en-US/docs/Web/Web_Components.

The following examples are available:

* element-details — <element-details>. Displays a box containing an HTML element name and description. Provides an example of an autonomous custom element that gets its structure from a <template> element (that also has its own styling defined), and also contains <slot> elements populated at runtime.
* expanding-list-web-component — <ul is="expanding-list">. Creates an unordered list with expandable/collapsible children. Provides an example of a customized built-in element (the class inherits from HTMLUListElement rather than HTMLElement).
* popup-info-box-web-component — <popup-info img="" text="">. Creates an info icon that when focused displays a popup info box. Provides an example of an autonomous custom element that takes information from its attributes, and defines structure and basic style in an attached shadow DOM.
* word-count-web-component — <word-count>. When added to an element, counts all the words inside that element and displays them inside an attached shadow DOM. It also contains an interval that periodically updates the word count as it changes. Provides an example of a customized built-in element (the class inherits from HTMLParagraphElement rather than HTMLElement).
