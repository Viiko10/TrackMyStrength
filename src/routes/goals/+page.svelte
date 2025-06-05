<script lang="ts">
  // Typdefinition für ein Ziel
  type Goal = {
    _id: string;
    title: string;
    description: string;
    targetExercise: string;
    targetValue: number;
    unit: string;
    status: string;
    achievedValue: number;
  };

  type PageData = {
    goals: Goal[];
  };

  export let data: PageData;
  const goals = data.goals;

  // Berechne Fortschritt in Prozent (max. 100)
  function getProgress(goal: Goal): number {
    if (!goal.targetValue || goal.targetValue <= 0) return 0;
    return Math.min(100, Math.round((goal.achievedValue / goal.targetValue) * 100));
  }

  function handleDelete(event: SubmitEvent) {
    event.preventDefault();
    if (confirm('Ziel wirklich löschen?')) {
      const form = event.target as HTMLFormElement;
      form.submit();
    }
  }
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
    padding-top: 120px;
    min-height: 100vh;
    background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
    color: white;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  h1 {
    text-align: center;
    margin-bottom: 2rem;
  }

  .goal-card {
    background-color: rgba(255, 255, 255, 0.05);
    border: 1px solid #00FF00;
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 0 8px rgba(0, 255, 0, 0.2);
  }

  .goal-card h2 {
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
    color: #00FF00;
  }

  .goal-card p {
    margin: 0.3rem 0;
  }

  .progress-bar-bg {
    background-color: #333;
    border-radius: 6px;
    overflow: hidden;
    height: 20px;
    margin-top: 0.75rem;
  }

  .progress-bar-fill {
    height: 100%;
    text-align: right;
    padding-right: 0.5rem;
    color: white;
    font-size: 0.9rem;
    font-weight: bold;
  }

  .progress-green {
    background-color: #00FF00;
  }

  .progress-yellow {
    background-color: #FFD700;
  }

  .goal-actions {
    margin-top: 1rem;
    display: flex;
    gap: 2rem;
  }

  .goal-actions a,
  .goal-actions button {
    font-weight: bold;
    cursor: pointer;
  }

  .goal-actions a {
    color: #00BFFF;
  }

  .goal-actions button {
    background: none;
    border: none;
    color: #FF4444;
  }

  .text-gray-600 {
    color: #ccc;
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

<!-- INHALT -->
<main>
  <h1 class="text-3xl font-bold">Meine Ziele</h1>

  {#if goals.length === 0}
    <p class="text-gray-600 text-center">Noch keine Ziele erfasst.</p>
  {:else}
    <div>
      {#each goals as goal}
        <div class="goal-card">
          <h2>{goal.title}</h2>
          <p>{goal.description}</p>
          <p>Ziel: {goal.targetValue} {goal.unit} ({goal.targetExercise})</p>
          <p>Status: {goal.status}</p>

          <div class="progress-bar-bg">
            <div
              class="progress-bar-fill {getProgress(goal) >= 100 ? 'progress-green' : 'progress-yellow'}"
              style="width: {getProgress(goal)}%"
            >
              {getProgress(goal)}%
            </div>
          </div>

          <div class="goal-actions">
            <a href={`/goals/${goal._id}/edit`}>Bearbeiten</a>
            <form method="POST" action="?/delete" on:submit={handleDelete}>
              <input type="hidden" name="id" value={goal._id} />
              <button type="submit">Löschen</button>
            </form>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</main>
  
