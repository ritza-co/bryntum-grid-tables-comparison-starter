<script>
  import initDt from "datatables.net-dt";
  import DataTables from "../lib/DataTables.svelte";

  initDt();
</script>

<div class="page-container">
  <div class="page-text-container">
    <h1 class="page-title">DataTables</h1>
    <p>This DataTables table has the following features:</p>
    <ul>
      <li>Search</li>
      <li>Sorting</li>
    </ul>

    <div class="page-btn-container">
      <a
        href="https://datatables.net/examples/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button>View all available features</button>
      </a>
    </div>
  </div>

  <DataTables />
</div>
