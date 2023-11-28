class BarChart extends HTMLElement {
  static observedAttributes = ["percentage"];
  percentage = true;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.setAttribute("role", "list");
    this.shadowRoot.append(this.getTemplate());

    const slot = this.shadowRoot.querySelector("slot");
    slot.addEventListener("slotchange", () => {
      slot
        .assignedNodes()
        .filter((node) => node.tagName === "BAR-CHART-ITEM")
        .forEach((node, index) => {
          if (node.tagName === "BAR-CHART-ITEM") {
            node.setAttribute("index", index + 1);
          }
        });
    });
  }

  getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = /*html*/ `
      <style>
      :host {
        display: grid;
        grid-template-columns: ${
          this.percentage === "false" ? "auto" : "repeat(100, 1fr)"
        };
        gap: .5em 0;
        align-items: center;
        margin: 0;
        padding: 0;
        list-style-type: none;
       }
      </style>
      <slot></slot>
      `;

    this.shadowRoot.innerHTML = "";
    return template.content.cloneNode(true);
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    if (name === "percentage") {
      this.percentage = newValue;
    }
    this.shadowRoot.append(this.getTemplate());
  }
}

class BarChartItem extends HTMLElement {
  static observedAttributes = [
    "value",
    "label",
    "color",
    "textColor",
    "index",
  ];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.setAttribute("role", "listitem");
    this.shadowRoot.append(this.getTemplate());
  }

  getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = /*html*/ `
    <style>
      :host {
        --bar-background-color: lightgrey;
        --bar-text-color: black;
        background: ${this.color ? this.color : "var(--bar-background-color)"};
        color: ${this.textColor ? this.textColor : "var(--bar-text-color)"};
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.25rem 0.5rem;
        gap: 0.5rem;
        ${
          this.percentage
            ? `grid-column-end: span ${this.value};`
            : `grid-column: span ${this.value};`
        }
        grid-row-start:${+this.index + 1};
        grid-row-end:${+this.index + 2};
      }
    </style>
    ${this.label}<span>${this.value}</span>
  `;
    this.shadowRoot.innerHTML = "";
    return template.content.cloneNode(true);
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    if (name === "value") {
      this.value = newValue;
    } else if (name === "label") {
      this.label = newValue;
    } else if (name === "color") {
      this.color = newValue;
    } else if (name === "index") {
      this.index = newValue;
    } else if (name === "textColor") {
      this.textColor = newValue;
    }
    this.shadowRoot.append(this.getTemplate());
  }
}

customElements.define("bar-chart", BarChart);
customElements.define("bar-chart-item", BarChartItem);
