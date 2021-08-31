<template>
  <div>
    <b-jumbotron header="Stolice.com" :lead="'broj clanova: ' + members.length + ' -> Hello ' + user.ime">
    </b-jumbotron>
    <b-button
        variant="outline-primary"
        v-on:click="onLogout()"
    >Logout</b-button
    >
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { mapState } from 'vuex';
import router from "../router";


export default {
  name: "Header",
  computed: {
    ...mapState(['members']),
    ...mapState(['user'])
  },
  methods: {
    ...mapActions(["logout"]),
    onLogout() {
      this.logout();
      router.push({ path: `/` });
    },
  },
}
</script>

<style scoped>

</style>