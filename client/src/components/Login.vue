<script>
import authServices from "../services/authServices";
export default {
  name: "Login",
  components: {},
  data() {
    return {
      username: "",
      password: "",
      loading: false,
    };
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault();
      if (this.username.length === 0) {
        return this.$toast.error("Please Enter Username!");
      } else if (this.password.length === 0) {
        return this.$toast.error("Please Enter Password!");
      }
      try {
        this.loading = true;
        const res = await authServices.login({
          username: this.username,
          password: this.password,
        });
        this.$store.dispatch("setCredentials", res);
        this.loading = false;
        this.$router.push("/home");
      } catch (error) {
        const errorMessage =
          error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : "An unexpected error occurred.";
        this.$toast.error(errorMessage);
        this.loading = false;
      }
    },
  },
};
</script>

<template>
  <div class="container-fluid">
    <div class="row login">
      <div
        class="col-md-6 back-img d-flex justify-content-center align-items-center"
      >
        <h1 class="text-white">Login</h1>
      </div>
      <div class="col-md-6 d-flex justify-content-center align-items-center">
        <div
          class="w-75 h-100 d-flex align-items-center justify-content-center"
        >
          <b-form @submit="onSubmit" class="text-left border p-5 rounded">
            <b-form-group
              id="input-group-1"
              label="Username:"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="username"
                type="text"
                placeholder="Username..."
              />
            </b-form-group>

            <b-form-group
              id="input-group-2"
              label="Password:"
              label-for="input-2"
            >
              <b-form-input
                id="input-2"
                v-model="password"
                type="password"
                placeholder="Password..."
              />
            </b-form-group>
            <p>
              <router-link to="/register" class="text-dark"
                >Don't have an account?</router-link
              >
            </p>

            <b-button type="submit" variant="dark" :disabled="loading">
              Login</b-button
            >
          </b-form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.back-img {
  background-image: url("../assets/back.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
}

.login {
  height: 100vh;
}
</style>
