<template>
  <b-container fluid="">
    <b-form>
      <b-row class="mt-2">
        <b-col sm="2" offset="2">
          <b-input v-model="newVrsta" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Vrsta"></b-input>
        </b-col>
        <b-col sm="2">
          <b-input v-model="newCena" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Cena"></b-input>
        </b-col>
        <b-col sm="1">
          <b-button variant="primary" size="lg" @click="save">Delete</b-button>
        </b-col>
      </b-row>
    </b-form>
  </b-container>
</template>

<script>
export default {
  name: "DeleteDrvo"
}
</script>

<style scoped>

</style>