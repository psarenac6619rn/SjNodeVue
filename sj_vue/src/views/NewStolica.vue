<template>
  <div class="home">
    <Header/>
    <b-container>
      <b-row>
        <b-col cm="6" >
          <Stolica/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import Header from "@/components/Header";
import Stolica from "@/components/NewStolica";


export default {
  name: "NewStolica",
  components: {
    Header,
    Stolica,
  }
}
</script>

<style scoped>

</style>