<template>
  <div class="home">
    <Header/>
    <b-container>
      <b-row>
        <b-col cm="6" >
          <Edit/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import Header from "@/components/Header";
import Edit from "@/components/EditDrvo";


export default {
  name: "EditDrvo",
  components: {
    Header,
    Edit
  }
}
</script>

<style scoped>

</style>