export class PersonFilter {
  init(params) {
    this.valueGetter = params.valueGetter;
    this.filterText = null;
    this.setupGui(params);
  }

  // not called by AG Grid, just for us to help setup
  setupGui(params) {
    this.gui = document.createElement("div");
    this.gui.innerHTML = `<div style="padding: 4px; width: 200px;">
                <div style="font-weight: bold;">Custom filter: whole words</div>
                <div>
                    <input style="margin: 4px 0 4px 0;" type="text" id="filterText" placeholder="Full name search..."/>
                </div>
            </div>
        `;

    const listener = (event) => {
      this.filterText = event.target.value;
      params.filterChangedCallback();
    };

    this.eFilterText = this.gui.querySelector("#filterText");
    this.eFilterText.addEventListener("changed", listener);
    this.eFilterText.addEventListener("paste", listener);
    this.eFilterText.addEventListener("input", listener);
    // IE doesn't fire changed for special keys (eg delete, backspace), so need to
    // listen for this further ones
    this.eFilterText.addEventListener("keydown", listener);
    this.eFilterText.addEventListener("keyup", listener);
  }

  getGui() {
    return this.gui;
  }

  doesFilterPass(params) {
    const searchQuery = this.filterText.toLowerCase();
    const value = this.valueGetter(params);
    console.log({ searchQuery }, { value });
    return Boolean(searchQuery.match(new RegExp(`${value}\\b`, "i")));
  }

  isFilterActive() {
    return this.filterText != null && this.filterText !== "";
  }

  getModel() {
    return { value: this.filterText.value };
  }

  setModel(model) {
    this.eFilterText.value = model.value;
  }
}
