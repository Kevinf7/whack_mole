<template>
  <div class="site">
    <b-navbar type="is-primary">
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <h4 class="site-title is-size-4">Whack that Mole!</h4>
        </b-navbar-item>
      </template>
      <template slot="end">
        <b-navbar-item tag="router-link" :to="{ name: 'home' }">
          Home
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ name: 'about' }">
          About
        </b-navbar-item>
      </template>
    </b-navbar>
    <div class="site-main">
      <router-view/>
    </div>
    <footer class="footer has-text-light">
      <div class="content has-text-centered">
        <p class="is-size-7">
          Whack that Mole! - a web doodle by
          <a href="https://kevin7.net">Kevin Foong</a>
        </p>
      </div>
    </footer>
  </div>
</template>

<style lang="scss">
  // Import Bulma's core
  @import "~bulma/sass/utilities/_all";

  // Set your colors
  $primary: #4d4c7d;
  $primary-invert: findColorInvert($primary);
  $secondary: #827397;
  $secondary-invert: findColorInvert($secondary);
  $modal-background-background-color: rgba(255, 255, 255, 0.3);
  $footer-background-color: $primary;

  // Setup $colors to use as bulma classes (e.g. 'is-twitter')
  $colors: (
      "primary": ($primary, $primary-invert),
      "secondary": ($secondary, $secondary-invert)
  );

  // Links
  $link: $primary;
  $link-invert: $primary-invert;
  $link-focus-border: $primary;

  // Import Bulma and Buefy styles
  @import "~bulma";
  @import "~buefy/src/scss/buefy";

  // Import custom css and fonts
  @import './assets/styles/style.css';
  @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
</style>
