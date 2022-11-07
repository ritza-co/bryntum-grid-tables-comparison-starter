<script>
  import { onMount, onDestroy } from "svelte";
  import { Grid, AjaxStore, StringHelper } from "@bryntum/grid";
  import "@bryntum/grid/grid.stockholm.css";
  import zipcelx from "zipcelx";

  const store = new AjaxStore({
    readUrl: "/data/data.json",
    autoLoad: true,
  });

  export let grid = null;
  let newPlayerCount = 0;

  onMount(() => {
    grid = new Grid({
      appendTo: "bryntum-grid",
      features: {
        filter: true,
        rowReorder: {
          showGrip: true,
        },
        stripe: true,
        summary: true,
        excelExporter: {
          zipcelx,
        },
        cellMenu: {
          items: {
            extraItem: {
              text: "Export - Excel",
              icon: "b-fa-download",
              weight: 200,
              onItem: () => {
                grid.features.excelExporter.export();
              },
            },
          },
        },
      },

      // Show changed cells
      showDirty: true,

      tbar: [
        {
          type: "buttongroup",
          items: [
            {
              type: "button",
              ref: "addButton",
              color: "b-green",
              icon: "b-fa-plus-circle",
              text: "Add",
              tooltip: "Adds a new row (at bottom)",
              onAction: () => {
                const counter = ++newPlayerCount,
                  added = grid.store.add({
                    name: `New player ${counter}`,
                    cls: `new_player_${counter}`,
                  });

                grid.selectedRecord = added[0];
              },
            },
            {
              type: "button",
              ref: "insertButton",
              color: "b-green",
              icon: "b-fa-plus-square",
              margin: "0 7",
              text: "Insert",
              tooltip: "Inserts a new row (at top)",
              onAction: () => {
                const counter = ++newPlayerCount,
                  added = grid.store.insert(0, {
                    name: `New player ${counter}`,
                    cls: `new_player_${counter}`,
                  });

                grid.selectedRecord = added[0];
              },
            },
            {
              type: "button",
              ref: "removeButton",
              color: "b-red",
              icon: "b-fa b-fa-trash",
              text: "Remove",
              tooltip: "Removes selected record(s)",
              onAction: () => {
                const selected = grid.selectedRecords;
                if (selected && selected.length) {
                  const store = grid.store,
                    nextRecord = store.getNext(selected[selected.length - 1]),
                    prevRecord = store.getPrev(selected[0]);

                  store.remove(selected);
                  grid.selectedRecord = nextRecord || prevRecord;
                }
              },
            },
          ],
        },

        {
          type: "button",
          ref: "removeAll",
          text: "Remove all filters",
          margin: "0 5",
          onAction: () => store.clearFilters(),
        },
        {
          type: "button",
          ref: "readOnlyButton",
          text: "Read-only",
          tooltip: "Toggles read-only mode on grid",
          toggleable: true,
          icon: "b-fa-square",
          pressedIcon: "b-fa-check-square",
          onToggle: ({ pressed }) => {
            addButton.disabled =
              insertButton.disabled =
              grid.readOnly =
                pressed;
            removeButton.disabled = pressed || !grid.selectedRecords.length;
          },
        },
        {
          type: "button",
          text: "Sum selected rows",
          margin: "0 auto",
          toggleable: true,
          onToggle: "up.onSelectToggle",
        },
      ],

      store,

      columns: [
        { type: "rownumber" },
        {
          text: "Name (custom filter: whole words)",
          field: "name",
          width: 260,
          // This column has a custom filtering function that matches whole words
          filterable: ({ value, record }) =>
            Boolean(record.name.match(new RegExp(`${value}\\b`, "i"))),
          sum: "count",
          summaryRenderer: ({ sum }) => `Total: ${sum}`,
        },
        {
          text: "City",
          field: "city",
          width: 200,
          sum: (result, current, index) => {
            if (index === 0) {
              result = {};
            }

            const city = current.city;
            if (!Object.prototype.hasOwnProperty.call(result, city)) {
              result[city] = 1;
            } else {
              ++result[city];
            }

            return result;
          },
          summaryRenderer: ({ sum }) => {
            let value = 0,
              mostPopularCity = "";

            Object.keys(sum).forEach((key) => {
              if (value < sum[key]) {
                value = sum[key];
                mostPopularCity = key;
              }
            });

            return StringHelper.xss`Most entries: ${mostPopularCity} (${value})`;
          },
        },
        {
          text: "Team",
          field: "team",
          width: 250,
          sum: (result, current, index) => {
            // There is
            if (index === 0) {
              result = {};
            }

            const team = current.team;
            if (!Object.prototype.hasOwnProperty.call(result, team)) {
              result[team] = 1;
            } else {
              ++result[team];
            }

            return result;
          },
          summaryRenderer: ({ sum }) => {
            let value = 0,
              mostPopularTeam = "";

            Object.keys(sum).forEach((key) => {
              if (value < sum[key]) {
                value = sum[key];
                mostPopularTeam = key;
              }
            });

            return StringHelper.xss`Most entries: ${mostPopularTeam} (${value})`;
          },
        },
        {
          type: "number",
          text: "Score",
          field: "score",
          width: 100,
          // Using built in summary calculations
          summaries: [
            { sum: "min", label: "Min" },
            { sum: "max", label: "Max" },
          ],
        },
        {
          type: "percent",
          text: "Percent wins",
          field: "percentWins",
          width: 200,
          editor: {
            type: "number",
            min: 0,
            max: 100,
          },
          sum: "average",
          summaryRenderer: ({ sum }) => `Average: ${Math.round(sum)}%`,
        },
      ],
      onSelectToggle() {
        this.features.summary.selectedOnly =
          !this.features.summary.selectedOnly;
      },
    });
    const { addButton, removeButton, insertButton } = grid.widgetMap;
  });

  onDestroy(() => {
    if (grid) {
      grid.destroy();
    }
  });
</script>
