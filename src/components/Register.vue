<template>
  <b-container fluid="">
    <b-form>
      <b-row class="mt-2">
        <b-col sm="2" offset="2">
          <b-input v-model="newIme" class="mb-2 mr-sm-2 mb-sm-0" placeholder="ime"></b-input>
        </b-col>
        <b-col sm="2">
          <b-input v-model="newPrezime" class="mb-2 mr-sm-2 mb-sm-0" placeholder="prezime"></b-input>
        </b-col>
        <b-col sm="2">
          <b-input v-model="newPass" class="mb-2 mr-sm-2 mb-sm-0" placeholder="pass"></b-input>
        </b-col>
        <b-col sm="1">
          <b-button variant="primary" size="lg" @click="save">Register</b-button>
        </b-col>
      </b-row>
    </b-form>
  </b-container>
</template>

<script>
import { mapActions } from 'vuex';
const Joi = require('joi');

const editSchema = Joi.object().keys({
  ime: Joi.string().trim().min(2).max(50).required(),
  prezime: Joi.string().trim().min(2).max(50).required(),
  pass: Joi.string().trim().min(2).max(50).required(),
});

export default {
  name: "Register",
  props: {
    ime: {
      type: String,
      default: ''
    },
    prezime: {
      type: String,
      default: ''
    },
    pass: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      newIme: '',
      newPrezime: '',
      newPass:' ',
    }
  },
  mounted: function () {
    this.newIme = this.ime;
    this.newPrezime = this.prezime;
    this.newPass = this.pass;
  },
  methods: {
    ...mapActions(['new_member']),

    save: function() {
      let {error} = editSchema.validate({ime: this.newIme, prezime: this.newPrezime, pass: this.newPass});

      if(error) {
        alert(error.details[0].message);
      }else {
        const msg = JSON.stringify({ime: this.newIme, prezime: this.newPrezime, pass: this.newPass});

        this.new_member(msg);

        alert("Uspesno uneti podaci!")

        this.newIme = '';
        this.newPrezime = '';
        this.newPass = '';
      }
    }
  }
}
</script>

<style scoped>

</style>