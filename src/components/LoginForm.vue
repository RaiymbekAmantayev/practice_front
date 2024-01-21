<template>
  <h1>Login</h1>
  <div>
    <div class="mb-3 row">
      <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" id="email" v-model="email">
      </div>
    </div>
    <div class="mb-3 row">
      <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
      <div class="col-sm-10">
        <input type="password" class="form-control" id="password" v-model="password">
      </div>
      <div>
        <button type="button" @click="login" class="btn btn-outline-primary">Login</button>
      </div>
    </div>
  </div>
</template>

<script>
import AuthenticationService from "@/services/Auth";

export default {
  data() {
    return {
      email: '',
      password: '',
      error: null
      // Ваши данные здесь
    }
  },
  methods: {
    async login() {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password,
        });

        this.password = '';
        this.email = '';
        await this.$store.dispatch('setToken', response.data.token)
        await this.$store.dispatch('setUser', response.data.user)
        if(this.$store.state.isUserLoggedIn){
          this.$router.push('/add');
        }
        console.log(response.data.token)
        console.log(response.data.user.email)
      } catch (error) {
        this.error = error.response.data;
        this.password = '';
        this.email = '';
      }
    }
  }
}
</script>

<style scoped>


</style>