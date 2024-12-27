<script>
import authServices from "../services/authServices";
import Loader from "./Loader.vue";
export default {
  name: "profile",
  components: { Loader },
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

      if (this.password !== this.confirmPassword) {
        this.$toast("Passwords Do Not Match!");
        return;
      }

      try {
        this.loading = true;
        const res = await authServices.updateProfile({
          username: this.username,
          email: this.email,
          phoneNumber: this.phoneNumber,
          password: this.password,
        });
        this.$store.dispatch("setCredentials", res);
        this.$toast.success("Profile Updated!");
        this.loading = false;
      } catch (error) {
        this.$toast.error(error.response.data.message);
        this.loading = false;
      }
    },
  },
  computed: {
    getUserDetails() {
      return this.$store.state.user;
    },
  },
  watch: {
    getUserDetails(newVal) {
      if (newVal) {
        this.username = newVal.username || "";
        this.email = newVal.email || "";
        this.phoneNumber = newVal.phoneNumber || "";
      }
    },
  },
  mounted() {
    const user = this.getUserDetails;
    if (user) {
      this.username = user.username || "";
      this.email = user.email || "";
      this.phoneNumber = user.phoneNumber || "";
    }
  },
};
</script>

<template>
  <div class="w-50">
    <div class="loader" v-if="loading">
      <Loader />
    </div>
    <div class="profile" v-else>
      <b-form @submit="onSubmit" class="text-left">
        <b-form-group id="input-group-1" label="Username:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="username"
            type="text"
            placeholder="Username..."
            required
          />
        </b-form-group>
        <b-form-group id="input-group-2" label="Email:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="email"
            type="text"
            placeholder="Email..."
            required
          />
        </b-form-group>
        <b-form-group id="input-group-3" label="Phone No:" label-for="input-3">
          <b-form-input
            id="input-3"
            v-model="phoneNumber"
            type="text"
            placeholder="Phone..."
            required
          />
        </b-form-group>
        <b-form-group id="input-group-4" label="Password:" label-for="input-4">
          <b-form-input
            id="input-4"
            v-model="password"
            type="password"
            placeholder="Password..."
          />
        </b-form-group>
        <b-form-group
          id="input-group-5"
          label="Confirm Password:"
          label-for="input-5"
        >
          <b-form-input
            id="input-5"
            v-model="confirmPassword"
            type="password"
            placeholder=" Confirm Password..."
          />
        </b-form-group>
        <b-button type="submit" variant="dark" :disabled="loading"
          >Update</b-button
        >
      </b-form>
    </div>
  </div>
</template>

<style scoped></style>
