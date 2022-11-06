<script>
  import "datatables.net-dt/css/jquery.dataTables.min.css";
  import jQuery from "jquery";
  import { onDestroy, onMount } from "svelte";

  let table = null;

  onMount(() => {
    table = jQuery("#datatable").DataTable({
      paging: false,
      columns: [
        { data: "name" },
        { data: "city" },
        { data: "team" },
        { data: "score" },
        { data: "percentWins" },
      ],
    });
    table.init();
  });

  onDestroy(() => {
    if (table) {
      table.destroy();
    }
  });
</script>

<div>
  <table id="datatable" class="display">
    <thead>
      <tr>
        <th>Name</th>
        <th>City</th>
        <th>Team</th>
        <th>Score</th>
        <th>Percent wins</th>
      </tr>
    </thead>
    <tbody />
  </table>
</div>
