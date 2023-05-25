<template>
  <v-sheet class=" pa-12" rounded>
    <v-card class="bg-deep-purple mx-auto px-6 py-8" max-width="444" title="LOGIN">

      <v-container>
        <v-fade-transition>
          <div
              v-if="isLoginFailed"
              style="border-radius: 10px"
              class="red white--text pa-2 ma-3 text-center app-title-small"
          >Login failed! Invalid credentials
          </div>
        </v-fade-transition>
            <v-text-field density="compact" variant="outlined" required
                          v-model="email"
                          class="mb-2"
                          clearable
                          label="Email"
                          @keyup.enter="onLogin"
            ></v-text-field>

          <v-text-field density="compact" variant="outlined" required
              v-model="password"
              clearable
              label="Password"
              type="password"
              placeholder="Enter your password"
              @keyup.enter="onLogin"
          ></v-text-field>

          <br>

          <v-btn
              :disabled="!form"
              :loading="loading"
              block
              color="white"
              size="large"
              type="submit"
              variant="elevated"
              @click="onLogin"
          >
            Sign In
          </v-btn>
      </v-container>
    </v-card>
  </v-sheet>
</template>

<script>
import AuthService from "../services/AuthService.js";
import {tr} from "vuetify/locale";

export default {
  data: () => ({
    form: true,
    email: null,
    password: null,
    loading: false,
    isLoginFailed: false,
  }),

  mounted() {
    console.log("AUTH", AuthService.isAuthenticated());
  },

  methods: {
    required (v) {
      return !!v || 'Field is required'
    },
    async onLogin() {
    // this.isLoginFailed = false;
    // this.loading =true;
    if(!(await AuthService.login({email: this.email, password: this.password}))){
      this.loading = true
    }
    }
  },
}
</script>
<style scoped>

.bg-deep-purple {
  height: 100%!important;
}

</style>