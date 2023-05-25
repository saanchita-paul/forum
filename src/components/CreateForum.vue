<template>
  <v-sheet class="pa-12" rounded>
    <v-card class="mx-auto px-6 py-8" max-width="700">
      <v-row>
        <v-col cols="9">
          <h2>Forum Add</h2>
        </v-col>
        <v-col cols="3">
          <v-btn color="black" @click="backToList">Back</v-btn>
        </v-col>
      </v-row>
      <v-container>
        <br>
        <form @submit.prevent="submit" enctype="multipart/form-data">
          <v-text-field required density="compact" variant="outlined" label="Forum Title" v-model.trim="forum.title" />
          <v-textarea density="compact" variant="outlined" label="Body" v-model="forum.body" />
          <v-btn color="blue" class="me-4" type="submit" @click="saveForum">Submit</v-btn>
          <v-btn @click="handleReset" color="red">Clear</v-btn>
        </form>
      </v-container>
    </v-card>
  </v-sheet>
</template>

<script>

import ForumService from "../services/ForumService.js";

export default {
  name: "CreateForum",
  data() {
    return {
      forum: {
        title: "",
        body: "",
      },
    };
  },
  computed: {
    userId() {
      console.log('user id', this.$store.state.authStore.user?.id);
      return this.$store.state.authStore.user?.id || null;
    }
  },
  methods: {
    backToList()
    {
      this.$router.push({
        name: 'ForumList'
      })
    },

    async saveForum () {

      const formData = new FormData();
      formData.append('title', this.forum.title);
      formData.append('body', this.forum.body);
      formData.append('user_id', this.userId);


      const response = await ForumService.insertForum(formData);
      console.log('create prod', response);
    },


    handleReset() {
      this.forum.title = '';
      this.forum.body = '';
    },
  }
};
</script>

<style scoped>
.v-main {
  flex: none!important;
}
</style>
