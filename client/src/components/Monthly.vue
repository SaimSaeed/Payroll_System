<script>
import payrollServies from "../services/payrollServies";
import Loader from "./Loader.vue";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { BIconFilePdf } from "bootstrap-vue";
export default {
  name: "monthly",
  components: { Loader, BIconFilePdf },
  data() {
    return {
      payroll: null,
      payrolls: [],
      loading: false,
      filterLoading: false,
    };
  },
  methods: {
    async filterPayroll(id) {
      try {
        this.filterLoading = true;
        const res = await payrollServies.getSinglePayRoll(id);
        this.payroll = res;
        this.filterLoading = false;
      } catch (error) {
        this.$toast(error.response.data.message);
        this.loading = false;
      }
    },
    generatePDF() {
      const doc = new jsPDF();

      // Set font size for the title
      doc.setFontSize(20);
      doc.setFont("helvetica", "bold"); // Set font to Helvetica (optional)
      doc.text("Payroll Report", 105, 20, null, null, "center");

      // Set up the table columns and rows
      const columns = ["Field", "Details"];
      const rows = [
        ["User", this.payroll.user],
        ["Month", this.payroll.month],
        ["Basic Salary", `$${this.payroll.basicSalary}`],
        ["Bonus", `$${this.payroll.bonus}`],
        ["Deductions", `$${this.payroll.deductions}`],
        ["Net Salary", `$${this.payroll.netSalary}`],
      ];

      // Add table to the PDF
      doc.autoTable({
        startY: 30, // Start the table after the title
        head: [columns], // The table headers
        body: rows, // The table data rows
        theme: "striped", // Use a striped theme for readability
        headStyles: {
          fillColor: [22, 160, 133], // Green color for header
          textColor: [255, 255, 255], // White text color in header
          fontSize: 14,
          fontStyle: "bold",
        },
        bodyStyles: {
          fontSize: 12,
          textColor: [0, 0, 0], // Black text for body
        },
        margin: { top: 30, left: 10, right: 10, bottom: 20 }, // Adjust margins
        columnStyles: {
          0: { cellWidth: "auto" }, // Auto width for column 0 (Field)
          1: { cellWidth: "auto" }, // Auto width for column 1 (Details)
        },
      });

      // Save the PDF with a name based on the user and month
      doc.save(`${this.payroll.user}_${this.payroll.month}_payroll.pdf`);
    },
  },
  async mounted() {
    try {
      this.loading = true;
      const res = await payrollServies.getUserPayRolls();
      this.payrolls = res;
      this.loading = false;
    } catch (error) {
      this.$toast(error.response.data.message);
      this.loading = false;
    }
  },
};
</script>

<template>
  <div class="container-fluid">
    <div class="loader" v-if="loading">
      <Loader />
    </div>
    <div class="content" v-else>
      <div
        v-if="payrolls.length === 0"
        class="bg-dark text-white rounded w-50 mx-auto my-5"
      >
        <h1>No Monthly Data Currently</h1>
      </div>
      <div class="row d-flex flex-wrap justify-content-center pt-2" v-else>
        <!-- Loop through payrolls and display each one in a card -->
        <b-card
          no-body
          class="mb-3 col-md-12"
          v-for="payroll in payrolls"
          :key="payroll._id"
        >
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button
              block
              v-b-toggle="`accordion-${payroll._id}`"
              variant="dark"
              @click="filterPayroll(payroll._id)"
            >
              {{ payroll.month }}
            </b-button>
          </b-card-header>
          <b-collapse :id="`accordion-${payroll._id}`" role="tabpanel">
            <b-card-body>
              <b-card-text>
                <!-- Loader Component displayed when loading -->
                <div class="loader" v-if="filterLoading">
                  <Loader />
                </div>
                <!-- Payroll Info -->

                <div class="container">
                  <div class="row">
                    <!-- Left column with the image -->
                    <div class="left col-md-6">
                      <img
                        src="https://img.freepik.com/free-vector/mysterious-gangster-character_23-2148466806.jpg?t=st=1734606053~exp=1734609653~hmac=ba05279e4e14d1f2540c6bdc1de5ee15ac9f82aeeef025e7de30a7573ef4e600&w=740"
                        alt="Image"
                        class="img-fluid"
                      />
                    </div>

                    <!-- Right column with payroll information -->
                    <div
                      class="right col-md-6 d-flex flex-column justify-content-center align-items-center"
                    >
                      <h3>User: {{ payroll.user.toUpperCase() }}</h3>
                      <p><strong>Month:</strong> {{ payroll.month }}</p>
                      <p>
                        <strong>Basic Salary:</strong> ${{
                          payroll.basicSalary
                        }}
                      </p>
                      <p><strong>Bonus:</strong> + ${{ payroll.bonus }}</p>
                      <p>
                        <strong>Deductions:</strong> - ${{ payroll.deductions }}
                      </p>
                      <p>
                        <strong>Net Salary:</strong> ${{ payroll.netSalary }}
                      </p>
                      <b-button href="#" variant="danger" @click="generatePDF">
                        PDF <BIconFilePdf />
                      </b-button>
                    </div>
                  </div>
                </div>
              </b-card-text>
            </b-card-body>
          </b-collapse>
        </b-card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
}

.col-md-3 {
  width: 50%;
  padding: 20px;
}

@media (max-width: 768px) {
  .col-md-3 {
    width: 100%;
  }
}
</style>
