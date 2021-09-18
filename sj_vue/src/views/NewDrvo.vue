<template>
  <div class="home">
    <Header/>
    <b-container>
      <b-row>
        <b-col cm="6" >
          <Drvo/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import Header from "@/components/Header";
import Drvo from "@/components/NewDrvo";


export default {
  name: "NewDrvo",
  components: {
    Header,
    Drvo,
  }
}
</script>

<style scoped>

</style>