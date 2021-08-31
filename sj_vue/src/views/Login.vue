<template>
  <div>
    <Header/>
    <b-container>
      <b-row>
        <b-col cm="6" >
          <Log/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>

import Header from "@/components/Header";
import Log from  "@/components/Login";

export default {
  name: "Login",
  components: {
    Header,
    Log
  }
}
</script>

<style scoped>

</style>