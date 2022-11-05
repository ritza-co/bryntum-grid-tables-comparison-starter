<script>
  import Router from "svelte-spa-router";
  import HomePage from "./routes/HomePage.svelte";
  import BryntumGridPage from "./routes/BryntumGridPage.svelte";
  import NotFoundPage from "./routes/NotFoundPage.svelte";
  import DataTablesPage from "./routes/DataTablesPage.svelte";
  import AgGridPage from "./routes/AgGridPage.svelte";

  let routes = {
    "/": HomePage,
    "/bryntum-grid": BryntumGridPage,
    "/data-tables": DataTablesPage,
    "/ag-grid": AgGridPage,

    "*": NotFoundPage,
  };
</script>

<div id="app">
  <header>
    <nav>
      <div class="title">JavaScript table comparisons</div>
      <div class="nav-link">
        <a href="#/">Home</a>
      </div>
      <div class="nav-link">
        <a href="#/bryntum-grid">Bryntum Grid</a>
      </div>
      <div class="nav-link">
        <a href="#/ag-grid">AG Grid</a>
      </div>
      <div class="nav-link">
        <a href="#/data-tables">DataTables</a>
      </div>
    </nav>
  </header>

  <main>
    <Router {routes} />
  </main>
</div>

<style>
  #app {
    display: grid;
    grid-template-rows: auto 1fr;
    min-height: 100vh;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0px 2rem 1.45rem;
    overflow-x: hidden;
  }

  nav {
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    gap: 1rem;
    padding: 1.5rem 0.5rem;
    border-bottom: 1px solid var(--beige);
  }

  .title {
    margin-right: auto;
  }

  main {
    padding: 2rem 0;
  }
</style>
