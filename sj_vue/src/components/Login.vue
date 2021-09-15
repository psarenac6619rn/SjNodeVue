<template>
  <form @submit.prevent="handleSubmit">
    <h3>Login</h3>

    <div class="form-group">
      <label>Ime</label>
      <input type="username" v-model="form.username" class="form-control" placeholder="ime"/>
    </div>
    <div class="form-group">
      <label>Email</label>
      <input type="email" v-model="form.email" class="form-control" placeholder="email"/>
    </div>
    <div class="form-group">
      <label>Password</label>
      <input type="password" v-model="form.password1" class="form-control" placeholder="password"/>
    </div>

    <button class="btn btn-primary btn-block">Login</button>
  </form>
</template>

<script>
import { mapState, mapActions } from "vuex";
import router from "../router";

export default {
  name: "Login",
  data() {
    return{
      form: {
        username:'',
        email:'',
        password1:'',
      }
    }
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    ...mapActions(["login"]),
    handleSubmit() {
      this.login({
        username: this.form.username,
        email: this.form.email,
        password1: this.form.password1
      });
      setTimeout(() => {
        if (this.user.id != undefined) {
          console.log(this.user)
          router.push({path: `/home`});
          this.makeToast("Uspesno", "Dobrodosli!", "success");
        } else {
          console.log(this.user)
          this.makeToast(
              "Neuspesno",
              "Ne postoji korisnik sa takvim kredencijalima.",
              "danger"
          );
        }
      }, 100);
    },
    makeToast(title, text, variant, append = false) {
      this.$bvToast.toast(text, {
        title,
        autoHideDelay: 5000,
        variant,
        appendToast: append,
      });
    },
  },
}
</script>

<style scoped>

</style>