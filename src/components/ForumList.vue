<template>
  <v-sheet class="pa-12" rounded>
    <v-card class="mx-auto px-6 py-8" max-width="800">
  <v-container>
    <v-row>
      <v-col cols="9">
        <h2>Forum List</h2>
      </v-col>
      <v-col cols="3">
        <v-btn @click="addForum" color="blue">+ Add New Forum</v-btn>
      </v-col>
    </v-row>
    <br>
    <v-card>
      <v-card-title>
        <v-spacer></v-spacer>
        <v-text-field
            density="compact"
            rounded
            variant="outlined"
            v-model="search"
            prepend-inner-icon="mdi-magnify"
            label="Search forum name.."
            single-line
            hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table-server
          v-model:items-per-page="pagination.per_page"
          :search="search"
          :headers="headers"
          :items-length="pagination.total"
          :items="forums"
          :loading="loading"
          class="elevation-1"
          item-value="name"
          @update:options="loadForums"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon
              size="small"
              class="me-2"
              @click="detailsPage(item.raw.id)"
          >
            mdi-eye
          </v-icon>
        </template>
      </v-data-table-server>
    </v-card>
  </v-container>
    </v-card>
  </v-sheet>
</template>


<script>


import ForumService from "../services/ForumService.js";

export default {
  data: () => ({
    headers: [
      {title: 'Forum Title', align: 'start', sortable: false, key: 'title',},
      { title: 'Body', key: 'body' },
      { title: 'Created By', key: 'user.name' },
      { title: 'Total Upvote', key: 'total_up_vote' },
      { title: 'Total Downvote', key: 'total_down_vote' },
      { title: 'Actions', key: 'actions', sortable: false },
    ],
    forums: [],
    loading: true,
    search: '',
    pagination: {
      total: 0,
      page: 1,
      per_page: 10
    }

  }),


  methods: {

    addForum() {
      this.$router.push({
        name: 'CreateForum'
      })
    },
    detailsPage(id) {
      console.log('item', id);
      this.$router.push({ name: 'ForumDetails', params: { id: id } });
    },
    async loadForums() {
      this.loading = true;
      const { page, per_page, search } = this.pagination;
      try {
        const response = await ForumService.listForum(page, per_page, this.search);
        this.pagination.total = response.total;
        this.forums = response.data;
        console.log('jjj', response);
      } catch (error) {
        console.log('Error loading forums:', error);
      }
      this.loading = false;
    },
  },

}
</script>
