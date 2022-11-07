<script>
  import { onDestroy, onMount } from "svelte";
  import { Grid } from "ag-grid-enterprise";
  import "ag-grid-enterprise/styles/ag-grid.css";
  import "ag-grid-enterprise/styles/agGridAlpineFont.css";
  import "ag-grid-enterprise/styles/ag-theme-alpine.css";

  let grid = null;
  let gridContainer;

  function getColumnDefs() {
    return [
      {
        field: "name",
        headerName: "NAME",
      },
      {
        field: "city",
        headerName: "CITY",
        width: 220,
      },
      {
        field: "team",
        headerName: "TEAM",
        width: 250,
      },
      {
        field: "score",
        headerName: "SCORE",
      },
      {
        field: "percentWins",
        headerName: "PERCENT WINS",
      },
    ];
  }

  // Grid Options are properties passed to the grid
  const gridOptions = {
    // each entry here represents one column
    columnDefs: getColumnDefs(),
  };

  onMount(() => {
    grid = new Grid(gridContainer, gridOptions);
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
/>

<style>
  .ag-theme-alpine {
    --ag-foreground-color: var(--dark-grey);
    --ag-header-foreground-color: var(--dark-grey);
  }
</style>
