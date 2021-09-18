<template>
  <div class="home">
    <Header/>
    <b-container>
      <b-row>
        <b-col cm="6" >
          <Delete/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import Header from "@/components/Header";
import Delete from "@/components/DeleteDrvo";


export default {
  name: "DeleteDrvo",
  components: {
    Header,
    Delete
  }
}
</script>

<style scoped>

</style>