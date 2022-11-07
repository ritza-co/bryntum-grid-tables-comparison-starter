<script>
  import { client } from "../utils/fetchWrapper";
  import { onDestroy, onMount } from "svelte";
  import FaRegCheckCircle from "svelte-icons/fa/FaRegCheckCircle.svelte";
  import FaRegCircle from "svelte-icons/fa/FaRegCircle.svelte";
  import FaPlusCircle from "svelte-icons/fa/FaPlusCircle.svelte";
  import FaTrash from "svelte-icons/fa/FaTrash.svelte";
  import { Grid } from "ag-grid-enterprise";
  import "ag-grid-enterprise/styles/ag-grid.css";
  import "ag-grid-enterprise/styles/agGridAlpineFont.css";
  import "ag-grid-enterprise/styles/ag-theme-alpine.css";
  import { PersonFilter } from "./personFilter";

  let grid = null;
  let gridContainer;
  let canEdit = true;

  function getColumnDefs() {
    return [
      {
        field: "name",
        headerName: "NAME",
        filter: "personFilter",
        // only allow non-group rows to be dragged
        rowDrag: (params) => !params.node.group,
        editable: true,
        aggFunc: (params) => {
          let count = 0;
          params.values.forEach((value) => {
            count += 1;
          });

          return `Total: ${count}`;
        },
      },
      {
        field: "city",
        headerName: "CITY",
        width: 220,
        editable: true,
        aggFunc: (params) => {
          const valueCountObj = {};

          params.values.forEach((value) => {
            if (!valueCountObj[value]) {
              valueCountObj[value] = 1;
            } else {
              valueCountObj[value] += 1;
            }
          });
          const mostEntries = Object.keys(valueCountObj).reduce(
            (a, b) => (valueCountObj[a] > valueCountObj[b] ? a : b),
            0
          );
          return `Most entries: ${mostEntries} (${valueCountObj[mostEntries]})`;
        },
      },
      {
        field: "team",
        headerName: "TEAM",
        width: 250,
        editable: true,
        aggFunc: (params) => {
          const valueCountObj = {};

          params.values.forEach((value) => {
            if (!valueCountObj[value]) {
              valueCountObj[value] = 1;
            } else {
              valueCountObj[value] += 1;
            }
          });
          const mostEntries = Object.keys(valueCountObj).reduce(
            (a, b) => (valueCountObj[a] > valueCountObj[b] ? a : b),
            0
          );
          return `Most entries: ${mostEntries} (${valueCountObj[mostEntries]})`;
        },
      },
      {
        field: "score",
        headerName: "SCORE",
        editable: true,
        aggFunc: (params) => {
          let min = null;
          let max = null;
          params.values.forEach((value) => {
            if (value < min || min === null) {
              min = value;
            }
            if (value > max || max === null) {
              max = value;
            }
          });

          return `Min ${min} Max ${max}`;
        },
      },
      {
        field: "percentWins",
        headerName: "PERCENT WINS",
        editable: true,
        aggFunc: (params) => {
          let count = 0;
          let sum = 0;
          params.values.forEach((value) => {
            count += 1;
            sum += Number(value);
          });

          return `Average: ${Math.round(sum / count)} %`;
        },
      },
    ];
  }

  // Grid Options are properties passed to the grid
  const gridOptions = {
    // each entry here represents one column
    columnDefs: getColumnDefs(),
    components: {
      personFilter: PersonFilter,
    },
    // default col def properties get applied to all columns
    defaultColDef: {
      sortable: true,
      filter: true,
      resizable: true,
    },

    groupIncludeTotalFooter: true,
    rowSelection: "multiple", // allow rows to be selected
    animateRows: true, // have rows animate to new positions when sorted
    rowDragManaged: true,
  };

  onMount(() => {
    grid = new Grid(gridContainer, gridOptions);
    client("data/data.json").then(({ data }) => {
      gridOptions.api.setRowData(data);
    });
  });

  onDestroy(() => {
    if (grid) {
      gridOptions.api.destroy();
    }
  });
</script>

<div
  id="datagrid"
  class="ag-theme-alpine"
  style="height: 500px; width:800px;"
  bind:this={gridContainer}
>
  <div class="toolbar">
    <button
      class="btn add-btn"
      on:click={() => gridOptions.api.applyTransaction({ add: [{}] })}
      disabled={!canEdit}
    >
      <div class="icon">
        <FaPlusCircle />
      </div>
      <div>ADD</div>
    </button>

    <button
      class="btn add-btn"
      on:click={() =>
        gridOptions.api.applyTransaction({ add: [{}], addIndex: 0 })}
      disabled={!canEdit}
    >
      <div class="icon">
        <FaPlusCircle />
      </div>
      <div>INSERT</div>
    </button>

    <button
      class="btn remove-btn"
      on:click={() => {
        const selectedRows = gridOptions.api.getSelectedRows();
        gridOptions.api.applyTransaction({ remove: selectedRows });
      }}
      disabled={!canEdit}
    >
      <div class="icon"><FaTrash /></div>
      <div>REMOVE</div></button
    >

    <button
      class="btn remove-filters-btn"
      on:click={() => gridOptions.api.setFilterModel(null)}
    >
      REMOVE ALL FILTERS</button
    >
    <button
      class="btn read-only-btn"
      on:click={() => {
        const columnDefs = getColumnDefs();
        const newState = canEdit ? false : true;
        canEdit = newState;
        columnDefs.forEach(function (colDef) {
          colDef.editable = newState;
        });
        gridOptions.api.setColumnDefs(columnDefs);
      }}
    >
      <div class="icon">
        {#if canEdit}
          <FaRegCircle />
        {/if}
        {#if !canEdit}
          <FaRegCheckCircle />
        {/if}
      </div>
      <div>READ-ONLY</div>
    </button>
  </div>
</div>

<style>
  .ag-theme-alpine {
    --ag-foreground-color: var(--dark-grey);
    --ag-header-foreground-color: var(--dark-grey);
  }

  .toolbar {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    width: 100%;
    background-color: var(--light-grey);
    padding: 0.5rem;
  }

  .btn {
    display: flex;
    gap: 0.3rem;
    align-items: center;
    padding: 0.75rem;
    border-radius: 2px;
    color: var(--dark-grey);
    border: 1px solid var(--medium-grey);
    transition: all 0.3s ease;
  }

  .btn:hover {
    cursor: pointer;
    filter: brightness(115%);
  }

  .btn:disabled {
    opacity: 0.5;
  }

  .icon {
    display: flex;
    align-items: center;
    width: 12px;
    height: 12px;
  }

  .add-btn {
    color: var(--green);
    border: 1px solid var(--light-green);
  }

  .remove-btn {
    color: var(--red);
    border: 1px solid var(--light-red);
  }
</style>
