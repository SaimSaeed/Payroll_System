<script>
import payrollServies from "../../services/payrollServies";
import Loader from "../Loader.vue";
import { BIconArrowLeft } from "bootstrap-vue";
export default {
  name: "updatePayroll",
  components: { Loader, BIconArrowLeft },

  data() {
    return {
      loading: false,
      loadingPayroll: false,
      month: "",
      basicSalary: 0,
      bonus: 0,
      deductions: 0,
      netSalary: 0,
      options: [
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
  computed: {
    getPayrollId() {
      return this.$route.params.id;
    },
  },
  async mounted() {
    try {
      this.loadingPayroll = true;
      const res = await payrollServies.getSinglePayRoll(this.getPayrollId);
      this.month = res.month;
      this.basicSalary = res.basicSalary;
      this.bonus = res.bonus;
      this.deductions = res.deductions;
      this.netSalary = res.netSalary;
      this.loadingPayroll = false;
    } catch (error) {
      console.log(error);
      this.$toast.error(error.response.data.message || error.error);
      this.loadingPayroll = false;
    }
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault();
      try {
        this.loading = true;
        await payrollServies.UpdateSinglePayroll(
          {
            month: this.month,
            basicSalary: this.basicSalary,
            bonus: this.bonus,
            deductions: this.deductions,
          },
          this.getPayrollId
        );
        this.loading = false;
        this.$toast.success("Payroll Updated");
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
    <div class="loader" v-if="loadingPayroll">
      <Loader />
    </div>
    <div class="profile" v-else>
      <b-form @submit="onSubmit" class="text-left">
        <b-form-group id="input-group-1" label="Month:" label-for="input-1">
          <b-form-select
            id="input-1"
            v-model="month"
            :options="options"
            requried
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
            required
          />
        </b-form-group>
        <b-form-group id="input-group-3" label="Bonus:" label-for="input-3">
          <b-form-input
            id="input-3"
            v-model="bonus"
            type="number"
            placeholder="Bonus..."
            :min="0"
            required
          />
        </b-form-group>
        <b-form-group id="input-group-4" label="Deduction:" label-for="input-4">
          <b-form-input
            id="input-4"
            v-model="deductions"
            type="number"
            placeholder="Deduction..."
            :min="0"
            required
          />
        </b-form-group>

        <b-button type="submit" variant="dark" :disabled="loading" class="my-2"
          >Update</b-button
        >
      </b-form>
    </div>
  </div>
</template>

<style scoped></style>
