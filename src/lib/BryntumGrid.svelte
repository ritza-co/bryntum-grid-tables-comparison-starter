<script>
  import { onMount, onDestroy } from "svelte";
  import { Grid } from "@bryntum/grid";
  import "@bryntum/grid/grid.stockholm.css";

  export let grid = null;

  onMount(() => {
    grid = new Grid({
      appendTo: "bryntum-grid",

      columns: [
        { type: "rownumber" },
        {
          text: "Name (custom filter: whole words)",
          field: "name",
          width: 260,
        },
        {
          text: "City",
          field: "city",
          width: 200,
        },
        {
          text: "Team",
          field: "team",
          width: 250,
        },
        {
          type: "number",
          text: "Score",
          field: "score",
          width: 100,
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
        },
      ],
    });
  });

  onDestroy(() => {
    if (grid) {
      grid.destroy();
    }
  });
</script>
