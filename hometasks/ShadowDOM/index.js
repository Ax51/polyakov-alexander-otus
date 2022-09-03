"use strict";

const root = document.getElementById("shadow");

root.attachShadow({ mode: "open" });

const data = JSON.parse(root.getAttribute("data"));

customElements.define(
  "my-tree",
  class extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      this.style.display = "block";
      this.style.marginLeft = "1rem";
    }
  }
);

customElements.define(
  "my-leaf",
  class extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      this.style.display = "list-item";
    }
  }
);

function createTree({ id, items }, parent) {
  const ul = document.createElement("my-tree");
  const li = document.createElement("my-leaf");
  li.appendChild(document.createTextNode(id));
  ul.appendChild(li);
  parent.appendChild(ul);
  if (items) {
    for (let i = 0; i < items.length; i++) {
      createTree(items[i], li);
    }
  }
  return parent;
}
root.shadowRoot.appendChild(createTree(data, new DocumentFragment()));
