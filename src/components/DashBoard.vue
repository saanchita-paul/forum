<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer">
      <template v-slot:prepend>
        <v-list-item
            lines="two"
            prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg"
            title="Jane Smith"
            subtitle="Logged in"
        ></v-list-item>
      </template>

      <v-divider></v-divider>
      <v-list nav>
        <v-list-item :to="{name: 'ForumList'}" prepend-icon="mdi-animation" title="Forums" value="Forums"></v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list nav>
        <v-list-item @click="onLogout" prepend-icon="mdi-logout" title="Logout" value="Logout" color="red"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Forum</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <!--  -->
    </v-main>
    <router-view></router-view>
  </v-app>
</template>

<script>
import AuthService from "../services/AuthService.js";

export default {
  methods:{
    ForumList() {
      this.$router.push({
        name: 'ForumList'
      })
    },

    async onLogout(){
      await AuthService.logout();
    }
  },
  data: () => ({ drawer: null }),
}
</script>

<style>
.sidebar{
  text-decoration: none;
}
sidebar:active {
  color: darkred!important;
}
</style>