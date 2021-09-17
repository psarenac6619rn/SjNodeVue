<template>
  <b-container fluid="">
    <b-form>
      <b-row class="mt-2">
        <b-col sm="2" offset="2">
          <b-input v-model="newModel" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Model"></b-input>
        </b-col>
        <b-col sm="2">
          <b-input v-model="newDimenzije" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Dimenzije"></b-input>
        </b-col>
        <b-col sm="2">
          <b-input v-model="newCena" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Cena"></b-input>
        </b-col>
        <b-col sm="1">
          <b-button variant="primary" size="lg" @click="save">Dodaj</b-button>
        </b-col>
      </b-row>
    </b-form>
  </b-container>
</template>

<script>
import { mapActions } from 'vuex';
const Joi = require('joi');

const editSchema = Joi.object().keys({
  model: Joi.string().trim().min(2).max(50).required(),
  dimenzija: Joi.string().trim().min(2).max(50).required(),
  cena: Joi.string().trim().min(2).max(50).required(),
});

export default {
  name: "NewStolica",
  props: {
    model: {
      type: String,
      default: ''
    },
    dimenzija: {
      type: String,
      default: ''
    },
    cena: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      newModel: '',
      newDimenzije: '',
      newCena:' ',
    }
  },
  mounted: function () {
    this.newModel = this.model;
    this.newDimenzije = this.dimenzija;
    this.newCena = this.cena;
  },
  methods: {
    ...mapActions(['new_stolica']),

    save: function() {
      let {error} = editSchema.validate({model: this.newModel, dimenzija: this.newDimenzije, cena: this.newCena});

      if(error) {
        alert(error.details[0].message);
      }else {
        const msg = JSON.stringify({model: this.newModel, dimenzija : this.newDimenzije, cena: this.newCena});

        this.new_stolica(msg);

        alert("Uspesno uneti podaci!")

        this.newModel = '';
        this.newDimenzije = '';
        this.newCena = '';
      }
    }
  }
}
</script>

<style scoped>

</style>