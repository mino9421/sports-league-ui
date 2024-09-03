<template>
  <div class="container">
    <nav class="nav">
      <div class="logo-box">
        <router-link to="/"
          ><img class="logo" src="../../public/images/logo.svg"
        /></router-link>
      </div>
      <div class="router-box">
        <router-link class="router" to="/schedule"
          ><img class="icon" src="../../public/images/schedule.png" />
          Schedules</router-link
        >
        <router-link class="router" to="/leaderboard"
          ><img class="icon" src="../../public/images/leaderboard.png" />
          Leaderboard</router-link
        >
      </div>
    </nav>
    <main class="body">
      <router-view></router-view>
    </main>
    <footer class="footer">API VERSION: 2.0</footer>
  </div>
</template>

<style>
.container {
  display: grid;
  grid-template-areas:
    "nav"
    "main"
    "footer";
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 1fr;
  min-height: 100vh;
}

.router {
  text-decoration: none;
}

.router:hover {
  color: lightgray;
}
.router:active,
.router:visited {
  color: white;
}

.router-box {
  display: flex;
  justify-content: flex-end;
  padding-right: 40px;
  gap: 40px;
}

.logo-box {
  display: flex;
  justify-content: flex-start;
  padding-left: 40px;
}

.nav {
  display: flex;
  flex-flow: row;
  grid-area: nav;
  justify-content: space-between;
  align-items: center;
  background-color: #025feb;
  font-size: 16px;
  height: 60px;
}

.logo {
  width: 110px;
  height: auto;
}

.icon {
  width: auto;
  height: 25px;
  margin-right: 5px;
}

.body {
  grid-area: main;
  background-color: #e4edf2;
}

.footer {
  grid-area: footer;
  background-color: #f6f7f7;
  color: #4b5c68;
  text-align: center;
  display: flex;
  justify-content: flex-end;
  align-content: center;
  padding-right: 40px;
  height: 40px;
}
</style>
