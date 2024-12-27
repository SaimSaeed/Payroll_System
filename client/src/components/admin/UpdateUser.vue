<script>
import authServices from "../../services/authServices";
import Loader from "../Loader.vue";
export default {
  name: "updateUser",
  components: {
    Loader,
  },
  data() {
    return {
      loadingUser: false,
      loading: false,
      username: "",
      email: "",
      phoneNumber: "",
      isAdmin: false,
    };
  },
  computed: {
    getUserId() {
      return this.$route.params.id;
    },
  },

  async mounted() {
    try {
      this.loadingUser = true;
      const res = await authServices.getSingleUser(this.getUserId);
      this.username = res.username;
      this.email = res.email;
      this.phoneNumber = res.phoneNumber;
      this.isAdmin = res.isAdmin;
      this.loadingUser = false;
    } catch (error) {
      this.$toast.error(error.response.data.message || error.error);
      console.log(error);
      this.loadingUser = false;
    }
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault();
      const userId = this.$route.params.id;

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
      try {
        this.loading = true;
        await authServices.UpdateSingleUser(
          {
            username: this.username,
            email: this.email,
            phoneNumber: this.phoneNumber,
            isAdmin: this.isAdmin,
          },
          this.getUserId
        );
        this.loading = false;
        this.$toast.success("User Updated!");
      } catch (error) {
        console.log(error);
        this.$toast.error(error.response.data.message || error.error);
        this.loading = false;
      }
    },
  },
};
</script>

<template>
  <div class="w-50">
    <div class="loader" v-if="loadingUser">
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
        <b-form-checkbox
          name="check-button"
          switch
          class="my-2"
          v-model="isAdmin"
        >
          Toggle Admin
        </b-form-checkbox>
        <b-button type="submit" variant="dark" :disabled="loading" class="my-2"
          >Update</b-button
        >
      </b-form>
    </div>
  </div>
</template>

<style scoped></style>
