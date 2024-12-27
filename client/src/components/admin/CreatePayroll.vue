<script>
import authServices from "../../services/authServices";
import payrollServies from "../../services/payrollServies";
import Loader from "../Loader.vue";
export default {
  name: "createPayroll",
  components: {
    Loader,
  },
  data() {
    return {
      loading: false,
      loadingUsers: false,
      users: [],
      selectedUserId: "",
      month: "",
      basicSalary: 0,
      bonus: 0,
      deductions: 0,
      options: [
        { value: "", text: "Please Select a Month" },
        { value: "January", text: "January" },
        { value: "February", text: "February" },
        { value: "March", text: "March" },
        { value: "April", text: "April" },
        { value: "May", text: "May" },
        { value: "June", text: "June" },
        { value: "July", text: "July" },
        { value: "August", text: "August" },
        { value: "September", text: "September" },
        { value: "October", text: "October" },
        { value: "November", text: "November" },
        { value: "December", text: "December" },
      ],
    };
  },

  async mounted() {
    try {
      this.loadingUsers = true;
      const res = await authServices.getAllUsers();
      this.users = res;
      this.loadingUsers = false;
    } catch (error) {
      console.log(error);
      this.$toast.error(error.response.data.message || error.error);
      this.loadingUsers = false;
    }
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault();
      try {
        this.loading = true;
        await payrollServies.CreatePayroll({
          userId: this.selectedUserId,
          month: this.month,
          basicSalary: this.basicSalary,
          bonus: this.bonus,
          deductions: this.deductions,
        });
        this.loading = false;
        this.$toast.success("Payroll Created!");
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
    <div class="loader" v-if="loadingUsers">
      <Loader />
    </div>
    <div class="profile" v-else>
      <b-form @submit="onSubmit" class="text-left">
        <b-form-group id="input-group-0" label="User:" label-for="input-0">
          <b-form-select
            v-model="selectedUserId"
            id="input-0"
            name="select"
            required
          >
            <option value="" disabled>Please Select a User</option>
            <option v-for="user in users" :key="user._id" :value="user._id">
              {{ user.username }}
            </option>
          </b-form-select>
        </b-form-group>
        <b-form-group id="input-group-1" label="Month:" label-for="input-1">
          <b-form-select
            id="input-1"
            v-model="month"
            :options="options"
            required
          ></b-form-select>
        </b-form-group>
        <b-form-group
          id="input-group-2"
          label="Basic Salary:"
          label-for="input-2"
        >
          <b-form-input
            id="input-2"
            v-model="basicSalary"
            type="number"
            placeholder="Basic Salary..."
            :min="0"
            requried
          />
        </b-form-group>
        <b-form-group id="input-group-3" label="Bonus:" label-for="input-3">
          <b-form-input
            id="input-3"
            v-model="bonus"
            type="number"
            placeholder="Bonus..."
            :min="0"
            requried
          />
        </b-form-group>
        <b-form-group id="input-group-4" label="Deduction:" label-for="input-4">
          <b-form-input
            id="input-4"
            v-model="deductions"
            type="number"
            placeholder="Deduction..."
            :min="0"
            requried
          />
        </b-form-group>

        <b-button type="submit" variant="dark" :disabled="loading" class="my-2"
          >Create</b-button
        >
      </b-form>
    </div>
  </div>
</template>
<style scoped></style>
