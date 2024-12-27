<script>
import payrollServies from "../services/payrollServies";
import Loader from "./Loader.vue";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { BIconFilePdf } from "bootstrap-vue";
export default {
  name: "historical",
  components: { Loader, BIconFilePdf },
  data() {
    return {
      payrolls: [],
      loading: false,
      selectedMonth: "",
      income: "",
    };
  },
  methods: {
    generatePDF() {
      const doc = new jsPDF();

      // Set font size for the title
      doc.setFontSize(20);
      doc.text("Payroll Report", 105, 20, null, null, "center");

      // Set columns for the table
      const columns = [
        { header: "User", dataKey: "user" },
        { header: "Month", dataKey: "month" },
        { header: "Basic Salary", dataKey: "basicSalary" },
        { header: "Bonus", dataKey: "bonus" },
        { header: "Deductions", dataKey: "deductions" },
        { header: "Net Salary", dataKey: "netSalary" },
      ];

      // Prepare data for the table
      let data = this.payrolls.map((payroll) => ({
        user: payroll.user,
        month: payroll.month,
        basicSalary: `$${payroll.basicSalary}`,
        bonus: `+ $${payroll.bonus}`,
        deductions: `- $${payroll.deductions}`,
        netSalary: `$${payroll.netSalary}`,
      }));

      // Create table
      doc.autoTable(columns, data, {
        startY: 30, // Position of the table
        theme: "striped", // Table theme (you can use 'striped', 'grid', 'plain', etc.)
        headStyles: {
          fillColor: [22, 160, 133], // Header background color
          textColor: [255, 255, 255], // Header text color
          fontSize: 12,
          fontStyle: "bold",
          halign: "center", // Horizontal alignment of headers
        },
        bodyStyles: {
          fontSize: 10,
          halign: "center", // Horizontal alignment of body text
        },
        columnStyles: {
          user: { halign: "left" }, // Align user name to the left
          month: { halign: "center" }, // Center the month column
        },
        margin: { top: 20, left: 10, right: 10, bottom: 10 }, // Table margin
        tableWidth: "auto", // Adjust width to fit content
        pageBreak: "auto", // Automatically add a new page if content overflows
      });

      // Save the PDF file with a name
      doc.save("payroll_report.pdf");
    },
  },
  computed: {
    filterByIncome() {
      if (!this.income) {
        return this.payrolls;
      }
      // Return a new sorted array based on the selected income filter
      return this.payrolls.sort((a, b) => {
        if (this.income === "netAsc") {
          return a.netSalary - b.netSalary;
        } else if (this.income === "netDesc") {
          return b.netSalary - a.netSalary;
        } else if (this.income === "bonusAsc") {
          return a.bonus - b.bonus;
        } else if (this.income === "bonusDesc") {
          return b.bonus - a.bonus;
        } else if (this.income === "dedAsc") {
          return a.deductions - b.deductions;
        } else if (this.income === "dedDesc") {
          return b.deductions - a.deductions;
        }
        return 0; // Default return if no income filter matches
      });
    },
    filterByMonth() {
      if (!this.selectedMonth) {
        return this.filterByIncome;
      } else {
        return this.filterByIncome.filter(
          (payroll) => payroll.month === this.selectedMonth
        );
      }
    },
    getuser() {
      return this.$store.state.user;
    },
  },
  async mounted() {
    try {
      this.loading = true;
      const res = await payrollServies.getUserPayRolls();
      console.log(res);
      this.payrolls = res;
      this.loading = false;
    } catch (error) {
      console.log(error);
      // this.$toast(error.response.data.message)
      this.loading = false;
    }
  },
};
</script>

<template>
  <div class="w-100 p-2">
    <div class="loader" v-if="loading">
      <Loader />
    </div>
    <div class="table" v-else>
      <div
        v-if="payrolls.length === 0"
        class="bg-dark text-white rounded w-50 mx-auto my-5"
      >
        <h1>No Payrolls Currently</h1>
      </div>
      <div class="content" v-else>
        <div class="topContainer container-fluid">
          <div class="row justify-content-end align-items-center">
            <div class="filters mx-2">
              <select v-model="selectedMonth" @change="filterByMonth">
                <option value="">All Months</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
              <select v-model="income" @change="filterByIncome">
                <option value="" selected>Filter Income</option>
                <option value="netAsc">Net Asc</option>
                <option value="netDesc">Net Desc</option>
                <option value="bonusAsc">Bonus Asc</option>
                <option value="bonusDesc">Bonus Desc</option>
                <option value="dedAsc">Deductions Asc</option>
                <option value="dedDesc">Deductions Desc</option>
              </select>
            </div>
            <div class="buttonContainer">
              <button
                class="btn btn-danger my-2 float-right"
                @click="generatePDF"
              >
                PDF <BIconFilePdf />
              </button>
            </div>
          </div>
        </div>

        <div class="tableContainer w-100">
          <b-table
            striped
            hover
            :items="filterByMonth"
            thead-class="bg-dark text-white text-uppercase"
          >
          </b-table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tableContainer {
  overflow: scroll;
  height: 60vh;
}
select {
  border-radius: 5px;
  outline: none;
  padding: 5px 2px 5px 2px;
}
</style>
