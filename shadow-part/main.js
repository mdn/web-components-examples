let template = document.getElementById("tabbed-custom-element");

globalThis.customElements.define(template.id, class extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content);

    let tabs = [];
    let children = this.shadowRoot.children;

    for(let elem of children) {
      if(elem.getAttribute('part')) {
        tabs.push(elem);
      }
    }

    tabs.forEach((tab) => {
      tab.addEventListener('click', (e) => {
        tabs.forEach((tab) => {
          tab.part = 'tab';
        })
        e.target.part = 'tab active';
      })

      console.log(tab.part);
    })
  }
});
