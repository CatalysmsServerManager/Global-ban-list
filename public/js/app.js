Vue.component('navbar', {
  template: `
  <ul class="navbar">
  <li class="current"><a href="#" data-hover="Home">Home</a></li>
  <li><a href="/app.html" data-hover="Bans">Bans</a></li>
  <li><a href="#" data-hover="Statistics">Statistics</a></li>
  <li><a href="#" data-hover="API">API</a></li>
  <li><a href="#" data-hover="Login">Login</a></li>
</ul>
  `,
});



const app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue.js!',
  },
});
