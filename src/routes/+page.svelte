<script lang="ts">
  import { goto } from '$app/navigation';

  function handleStart() {
    goto('/sessions/new');
  }

  function handleNewGoal() {
    goto('/goals/new');
  }
</script>

<style>
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.7);
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

  .hero {
    background-image: url('/hero.jpg');
    background-size: cover;
    background-position: center;
    height: 100vh;
    padding-top: 5rem;
    position: relative;
    color: white;
  }

  .overlay {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: linear-gradient(135deg, rgba(0, 0, 255, 0.5), rgba(0, 255, 0, 0.5));
    z-index: 1;
  }

  .content {
    position: relative;
    z-index: 2;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  .center-button {
    background-color: #00FF00;
    color: black;
    font-weight: bold;
    padding: 1rem 2rem;
    border-radius: 8px;
    font-size: 1.2rem;
    transition: background 0.3s;
  }

  .center-button:hover {
    background-color: #66FF66;
  }

  .slogan {
    position: absolute;
    bottom: 2rem;
    right: 2rem;
    font-size: 1.2rem;
    font-weight: 600;
    max-width: 250px;
    text-align: right;
    z-index: 2;
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

<!--HERO-BEREICH -->
<div class="hero">
  <div class="overlay"></div>
  <div class="content">
    <button class="center-button" on:click={handleStart}>Neue Session erfassen</button>
    <button class="center-button" on:click={handleNewGoal}>Neues Ziel erfassen</button>
  </div>
  <div class="slogan">Tracke deinen Fortschritt. Stärke dein Ziel.</div>
</div>
