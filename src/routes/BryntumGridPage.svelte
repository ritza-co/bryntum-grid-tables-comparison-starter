<script>
  import BryntumGrid from "../lib/BryntumGrid.svelte";
</script>

<div class="page-container">
  <div class="page-text-container">
    <h1 class="page-title">Bryntum Grid</h1>
    <p>This Bryntum Grid table has the following features:</p>
    <ul>
      <li>Filtering and sorting</li>
      <li>Cell editing</li>
      <li>Adding and deleting rows</li>
      <li>Row and column re-ordering</li>
      <li>Read-only toggle</li>
      <li>Summary row</li>
      <li>Summary for selected rows</li>
      <li>Export to Excel</li>
    </ul>

    <div class="page-btn-container">
      <a
        href="https://www.bryntum.com/products/grid/features"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button>View all available features</button>
      </a>
    </div>
  </div>
  <div id="bryntum-grid">
    <BryntumGrid />
  </div>
</div>

<style>
  #bryntum-grid {
    font-size: 0.875rem;
    margin: 0;
    display: flex;
    flex-direction: column;
    height: 500px;
    max-width: 800px;
  }
</style>
