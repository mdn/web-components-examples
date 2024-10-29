function defineSimpleCustom() {
  customElements.define("simple-custom",
    class extends HTMLElement {
      constructor() {
        super();
      }
    }
  );
  document.getElementById("button1").remove();
}