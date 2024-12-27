<script>
import authServices from "../services/authServices";
export default {
  name: "register",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      loading: false,
    };
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault();

      const phone = this.phoneNumber.trim();
      const email = this.email.trim();
      const username = this.username.trim();

      // Phone number validation
      if (
        !/^[0-9]+$/.test(phone) ||
        phone.length !== 11 ||
        parseInt(phone) <= 0
      ) {
        this.$toast.error("Phone number must be a positive 11-digit number.");
        return; // Prevent further processing
      }

      // Email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        this.$toast.error("Please enter a valid email address.");
        return; // Prevent further processing
      }

      // Username validation
      if (username.length < 3 || /\s/.test(username)) {
        this.$toast.error(
          "Username must be at least 3 characters long and cannot contain spaces."
        );
        return; // Prevent further processing
      }

      if (this.confirmPassword !== this.password) {
        return this.$toast.error("Passwords Do Not Match!");
      }

      try {
        this.loading = true;
        await authServices.register({
          username: this.username,
          email: this.email,
          password: this.password,
          phoneNumber: this.phoneNumber,
        });
        this.loading = false;
        this.$toast.success("User Registered!");
        this.$router.push("/");
      } catch (error) {
        this.loading = false;
        this.$toast.error(error.response.data.message);
      }
    },
  },
};
</script>

<template>
  <div>
    <div class="container-fluid">
      <div class="row login">
        <div
          class="col-md-6 back-img d-flex justify-content-center align-items-center"
        >
          <h1 class="text-white">Register</h1>
        </div>
        <div class="col-md-6 d-flex justify-content-center align-items-center">
          <div
            class="w-75 h-100 d-flex align-items-center justify-content-center"
          >
            <b-form @submit="onSubmit" class="text-left border rounded p-5">
              <!-- First Row: Username and Email -->
              <b-row>
                <b-col md="6">
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
                      required
                    />
                  </b-form-group>
                </b-col>
                <b-col md="6">
                  <b-form-group
                    id="input-group-2"
                    label="Email:"
                    label-for="input-2"
                  >
                    <b-form-input
                      id="input-2"
                      v-model="email"
                      type="email"
                      placeholder="Email..."
                      required
                    />
                  </b-form-group>
                </b-col>
              </b-row>

              <!-- Second Row: Phone Number -->
              <b-form-group
                id="input-group-3"
                label="Phone No:"
                label-for="input-3"
              >
                <b-form-input
                  id="input-3"
                  v-model="phoneNumber"
                  type="text"
                  placeholder="Phone No..."
                  required
                />
              </b-form-group>

              <!-- Third Row: Password and Confirm Password -->
              <b-row>
                <b-col md="6">
                  <b-form-group
                    id="input-group-4"
                    label="Password:"
                    label-for="input-4"
                  >
                    <b-form-input
                      id="input-4"
                      v-model="password"
                      type="password"
                      placeholder="Password..."
                      required
                    />
                  </b-form-group>
                </b-col>
                <b-col md="6">
                  <b-form-group
                    id="input-group-5"
                    label="Confirm Password:"
                    label-for="input-5"
                  >
                    <b-form-input
                      id="input-5"
                      v-model="confirmPassword"
                      type="password"
                      placeholder="Confirm Password..."
                      required
                    />
                  </b-form-group>
                </b-col>
              </b-row>

              <!-- Already registered link -->
              <p>
                <router-link to="/" class="text-dark"
                  >Already registered?</router-link
                >
              </p>

              <!-- Centered Create Account button -->
              <div class="d-flex justify-content-start">
                <b-button type="submit" variant="dark" :disabled="loading">
                  Create Account
                </b-button>
              </div>
            </b-form>
          </div>
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
