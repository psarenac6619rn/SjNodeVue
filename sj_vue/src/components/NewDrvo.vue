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
  vrsta: Joi.string().trim().min(2).max(50).required(),
  cena: Joi.number().integer().required(),
});

export default {
  name: "NewDrvo",
  props: {
    vrsta: {
      type: String,
      default: ''
    },
    cena: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      newVrsta: '',
      newCena: '',
    }
  },
  mounted: function () {
    this.newVrsta = this.vrsta;
    this.newCena = this.cena;
  },
  methods: {
    ...mapActions(['new_drvo']),

    save: function() {
      let {error} = editSchema.validate({vrsta: this.newVrsta, cena: this.newCena});

      if(error) {
        alert(error.details[0].message);
      }else {
        const msg = JSON.stringify({vrsta: this.newVrsta, cena: this.newCena});

        this.new_drvo(msg);
        alert(msg)
        alert("Uspesno uneti podaci!")

        this.newVrsta = '';
        this.newCena = '';
      }
    }
  }
}
</script>

<style scoped>

</style>