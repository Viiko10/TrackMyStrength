<script lang="ts">
  export let data;
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

  .session-card {
    background-color: rgba(255, 255, 255, 0.05);
    border: 1px solid #00FF00;
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 0 8px rgba(0, 255, 0, 0.2);
  }

  .session-card p {
    margin: 0.3rem 0;
  }

  .progress-bar-bg {
    background-color: #333;
    border-radius: 6px;
    overflow: hidden;
    height: 16px;
    margin-top: 0.5rem;
  }

  .progress-bar-fill {
    height: 100%;
    background-color: #00FF00;
  }

  .session-actions {
    margin-top: 1rem;
    display: flex;
    gap: 2rem;
  }

  .session-actions a,
  .session-actions button {
    font-weight: bold;
    cursor: pointer;
  }

  .session-actions a {
    color: #00BFFF;
  }

  .session-actions button {
    background: none;
    border: none;
    color: #FF4444;
  }

  .text-gray-700 {
    color: #ccc;
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

<!--INHALT -->
<main>
  <h1 class="text-2xl font-bold mb-6">Deine Trainingssessions</h1>

  {#each data.sessions as session}
    <div class="session-card">
      <p><strong>Datum:</strong> {session.date}</p>
      <p><strong>Übung:</strong> {session.exercise}</p>
      <p><strong>Sätze:</strong> {session.sets}</p>

      {#if session.weight}
  <p><strong>Gewicht:</strong> {session.weight} kg</p>
{/if}

      {#if session.goal}
        <div class="mt-2 text-sm text-gray-700">
          <p><strong>Ziel:</strong> {session.goal.title}</p>
          <p><strong>Status:</strong> {session.goal.status}</p>
          <div class="progress-bar-bg">
            <div
              class="progress-bar-fill"
              style="width: {Math.min(100, (session.goal.achievedValue / session.goal.targetValue) * 100)}%"
            ></div>
          </div>
        </div>
      {/if}

      <form method="POST" action="?/delete" class="session-actions">
        <input type="hidden" name="id" value={session._id} />
        <button type="submit">Löschen</button>
        <a href={`/sessions/edit/${session._id}`}>Bearbeiten</a>
      </form>
    </div>
  {/each}
</main>
