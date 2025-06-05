<script lang="ts">
  export let data: {
    goal: {
      _id: string;
      title: string;
      description: string;
      type: string;
      targetExercise: string;
      targetValue: number;
      unit: string;
      status: string;
      achievedValue: number;
    };
  };
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
    padding-left: 1rem;
    padding-right: 1rem;
  }

  form {
    background-color: rgba(255, 255, 255, 0.05);
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.2);
    width: 100%;
    max-width: 600px;
  }

  h1 {
    font-size: 1.75rem;
    font-weight: bold;
    margin-bottom: 2rem;
    text-align: center;
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

<!-- NAVIGATION -->
<nav class="navbar">
  <a href="/" class="logo-link">TrackMyStrength</a>
  <div class="nav-links">
    <a href="/sessions">Trainingssessions</a>
    <a href="/goals">Ziele</a>
  </div>
</nav>

<main>
  <form method="POST">
    <h1>Ziel bearbeiten</h1>

    <div>
      <label for="description">Beschreibung</label>
      <input
        id="description"
        name="description"
        type="text"
        bind:value={data.goal.description}
        required
      />
    </div>

    <div>
      <label for="type">Typ</label>
      <select
        id="type"
        name="type"
        bind:value={data.goal.type}
        required
      >
        <option value="strength">Kraft</option>
        <option value="endurance">Ausdauer</option>
        <option value="weight">Gewicht</option>
      </select>
    </div>

    <div>
      <label for="targetExercise">Zielübung</label>
      <input
        id="targetExercise"
        name="targetExercise"
        type="text"
        bind:value={data.goal.targetExercise}
        required
      />
    </div>

    <div>
      <label for="targetValue">Zielwert</label>
      <input
        id="targetValue"
        name="targetValue"
        type="number"
        step="0.1"
        bind:value={data.goal.targetValue}
        required
      />
    </div>

    <div>
      <label for="unit">Einheit</label>
      <input
        id="unit"
        name="unit"
        type="text"
        bind:value={data.goal.unit}
        required
      />
    </div>

    <div>
      <label for="status">Status</label>
      <select
        id="status"
        name="status"
        bind:value={data.goal.status}
        required
      >
        <option value="active">Aktiv</option>
        <option value="completed">Abgeschlossen</option>
        <option value="paused">Pausiert</option>
      </select>
    </div>

    <div>
      <label for="achievedValue">Aktueller Fortschritt</label>
<input
  id="achievedValue"
  name="achievedValue"
  type="number"
  step="0.1"
  bind:value={data.goal.achievedValue}
/>

    </div>

    <button type="submit">Speichern</button>
  </form>
</main>
