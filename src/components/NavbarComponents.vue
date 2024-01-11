<template>
  <nav class="navbar navbar-expand-lg bg-primary mt-0">
    <div class="container-fluid">
      <div v-if="!$store.state.isUserLoggedIn">
        <a  class="navbar-brand text-white" href="#">TabTracker</a>
      </div>
      <div v-if="$store.state.isUserLoggedIn">
        <a  class="navbar-brand text-white" href="#">{{currentUsername}}</a>
      </div>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item" v-if="!$store.state.isUserLoggedIn">
            <router-link to="/" class="nav-link text-white">Sign In</router-link>
          </li>
          <li class="nav-item" v-if="$store.state.isUserLoggedIn">
            <router-link to="/"><button @click="logout" class="btn btn-outline-light">Logout</button></router-link>
          </li>
          <li class="nav-item" v-if="$store.state.isUserLoggedIn">
            <router-link to="/add"><button class="btn btn-outline-light">Add</button></router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavbarComponent',
  methods:{
    logout(){
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
    }
  },
  // В вашем компоненте Vue
  computed: {
    currentUsername() {
      return this.$store.state.user ? this.$store.state.user.email : null;
    }
  }

}
</script>

<style>

</style>