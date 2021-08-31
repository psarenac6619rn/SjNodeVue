<template>
  <div>
    <Header/>
    <b-container>
      <b-row>
        <b-col cm="6" >
          <div v-if="edit">
            <EditMember :user="member" :message="member.message"/>
          </div>
          <div v-else>
            <ShowMember v-if="members.length" :member="member"/>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col cm="2" style="margin-top: 10px">
          <b-button variant="primary" size="lg" @click="toggleEdit" v-html="edit ? 'Cancel' : 'Edit'"/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
export default {
name: "Member"
}
</script>

<style scoped>

</style>