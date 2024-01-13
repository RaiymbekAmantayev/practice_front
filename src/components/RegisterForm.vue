<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <div class="white elevation-2">
        <v-app flat dense class="bg-cyan" dark>
          <v-app-bar >
            <v-app-bar-title>Register</v-app-bar-title>
          </v-app-bar>
        </v-app>
        <div class="pl-4 pr-4 pt-2 pb-2">
          <input
              type="email"
              name="email"
              v-model="email"
              placeholder="email"
          />
          <br>
          <input
              type="password"
              name="password"
              v-model="password"
              placeholder="password"/>
          <br>
          <div class="error" v-html="error"/>
          <v-btn
              class="bg-cyan"
              @click="register">
            Register
          </v-btn>
        </div>
      </div>
    </v-flex>
  </v-layout>

</template>

<script>
import AuthenticationService from "@/services/Auth";
export default {
  data() {
    return {
      email:'',
      password:'',
      error:null
      // Ваши данные здесь
    }
  },
  methods:{
    async register(){
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        console.log(response.data.token)
        this.password=''
        this.email=''
        console.log(response.data)
      }catch (error){
        this.error = error.response.data
        this.password=''
        this.email=''
      }
    }
  }
}
</script>

<style scoped>
.error{
  color: red;
}
/* Здесь вы можете добавить стили для этого компонента */
</style>