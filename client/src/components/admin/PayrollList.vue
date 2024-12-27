<script>
import payrollServies from "../../services/payrollServies";
import Loader from "../Loader.vue";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { BIconFilePdf, BIconPlusCircle } from "bootstrap-vue";
export default {
  name: "payrollList",
  components: { Loader, BIconFilePdf, BIconPlusCircle },
  data() {
    return {
      payrolls: [],
      loading: false,
      loadingDelete: false,
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
        user: payroll.username,
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
    async submitDelete(id) {
      try {
        const confirm = window.confirm("Are you sure?");
        if (confirm) {
          this.loadingDelete = true;
          await payrollServies.deletePayroll(id);
          window.location.reload();
          this.$toast.success("Payroll Deleted!");
          this.loadingDelete = false;
        }
      } catch (error) {
        console.log(error);
        this.$toast.error(error.response.data.message || error.error);
        this.loadingDelete = false;
      }
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
  },
  async mounted() {
    try {
      this.loading = true;
      const res = await payrollServies.getAllPayrolls();
      this.payrolls = res;
      this.loading = false;
    } catch (error) {
      this.$toast.error(error.response.data.message || error.error);
      console.log(error);
    }
  },
};
</script>

<template>
  <div class="w-100 p-2">
    <div class="loader" v-if="loading">
      <Loader />
    </div>
    <div class="table table-striped" v-else>
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
          <div
            class="buttonContainer d-flex align-items-center justify-content-between"
          >
            <router-link
              to="/home/admin/create"
              class="btn btn-dark mx-2 d-flex align-items-center justify-content-between"
              ><span class="mx-1">Create</span> <BIconPlusCircle class="mx-1"
            /></router-link>
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
        <!-- <b-table striped hover :items="payrolls" thead-class="bg-dark text-white text-uppercase">
        </b-table> -->
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">USERNAME</th>
              <th scope="col">MONTH</th>
              <th scope="col">BASIC</th>
              <th scope="col">BONUS</th>
              <th scope="col">DEDUCTIONS</th>
              <th scope="col">NET</th>
              <th scope="col">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="payroll in filterByMonth" :key="payroll._id">
              <td>{{ payroll._id }}</td>
              <td>{{ payroll.username }}</td>
              <td>{{ payroll.month }}</td>
              <td>{{ payroll.basicSalary }}</td>
              <td>{{ payroll.bonus }}</td>
              <td>{{ payroll.deductions }}</td>
              <td>{{ payroll.netSalary }}</td>

              <td>
                <router-link
                  :to="`/home/admin/${payroll._id}/updatepayroll`"
                  class="text-decoration-none text-dark"
                  ><BIconPencilSquare /></router-link
                ><button
                  class="btn text-danger"
                  @click="submitDelete(payroll._id)"
                  :disabled="loadingDelete"
                >
                  <BIconTrash />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tableContainer {
  height: 70vh;
  overflow: scroll;
}

select {
  border-radius: 5px;
  outline: none;
  padding: 5px 2px 5px 2px;
}
</style>
