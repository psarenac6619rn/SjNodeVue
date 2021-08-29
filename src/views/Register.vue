<template>
  <div>
    <Header/>
    <b-container>
      <b-row>
        <b-col cm="6" >
          <Reg/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>


<script>

import Header from "@/components/Header";
import Reg from  "@/components/Register";

export default {
  name: "Register",
  components: {
    Header,
    Reg
  }
}
</script>

<style scoped>

</style>