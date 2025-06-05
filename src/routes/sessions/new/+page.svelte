<script lang="ts">
  export let data: {
    goals: { _id: string; description: string }[];
  };

  let date = '';
  let exercise = '';
  let sets = '';
  let weight = '';
  let goalId = '';
</script>

<style>
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(8px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    z-index: 10;
  }

.logo-link {
  font-size: 1.5rem;
  font-weight: bold;
  color: #00FF00;
  text-decoration: none;
  transition: color 0.3s;
}

.logo-link:hover {
  color: #66FF66;
}

  .nav-links {
    display: flex;
    gap: 1.5rem;
  }

  .nav-links a {
    color: white;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s;
  }

  .nav-links a:hover {
    color: #00FF00;
  }

  main {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 120px;
    min-height: 100vh;
    background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
    color: white;
  }

  form {
    background-color: rgba(255, 255, 255, 0.05);
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.2);
    width: 100%;
    max-width: 500px;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }

  input, select {
    width: 100%;
    padding: 0.75rem;
    margin-bottom: 1.5rem;
    border: 1px solid #00FF00;
    border-radius: 8px;
    background: #111;
    color: white;
  }

  button {
    background-color: #00FF00;
    color: black;
    font-weight: bold;
    padding: 1rem 2rem;
    border-radius: 8px;
    font-size: 1.1rem;
    width: 100%;
    transition: background 0.3s;
  }

  button:hover {
    background-color: #66FF66;
  }
</style>

<!--NAVIGATION -->
<nav class="navbar">
  <a href="/" class="logo-link">TrackMyStrength</a>
  <div class="nav-links">
    <a href="/sessions">Trainingssessions</a>
    <a href="/goals">Ziele</a>
  </div>
</nav>

<main>
  <form method="POST">
    <h1 class="text-3xl font-bold mb-6 text-center">Session erfassen</h1>

    <div>
      <label for="date">Datum</label>
      <input id="date" name="date" type="date" bind:value={date} required />
    </div>

    <div>
      <label for="exercise">Übung</label>
      <input id="exercise" name="exercise" type="text" bind:value={exercise} required />
    </div>

    <div>
      <label for="sets">Sätze/Wiederholungen</label>
      <input id="sets" name="sets" type="text" bind:value={sets} required />
    </div>

    <div>
  <label for="weight">Gewicht in Kg</label>
  <input id="weight" name="weight" type="text" bind:value={weight} />
</div>

    <div>
      <label for="goalId">Ziel (optional)</label>
      <select id="goalId" name="goalId" bind:value={goalId}>
        <option value="">Kein Ziel</option>
        {#each data.goals as goal}
          <option value={goal._id}>{goal.description}</option>
        {/each}
      </select>
    </div>

    <button type="submit">Speichern</button>
  </form>
</main>
