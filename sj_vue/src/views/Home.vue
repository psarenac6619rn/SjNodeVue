<template>
  <div class="home">
    <Header/>
    <b-container>
      <b-row>
        <b-col cm="6" >
          <StolicaList/>
          <DrvoList/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
export default {
name: "Home"
}
</script>

<style scoped>

</style>