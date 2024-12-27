<script>
import authServices from "../services/authServices";
import {
  BIconBoxArrowLeft,
  BIconCalendar2Month,
  BIconClockHistory,
  BIconPerson,
  BIconPersonLinesFill,
  BIconCashCoin,
} from "bootstrap-vue";
export default {
  name: "sidebar",
  components: {
    BIconCalendar2Month,
    BIconBoxArrowLeft,
    BIconClockHistory,
    BIconPerson,
    BIconPersonLinesFill,
    BIconCashCoin,
  },
  methods: {
    async logOut() {
      try {
        const confirm = window.confirm("Are you sure you want to LogOut?");
        if (confirm) {
          await authServices.logOutUser();
          this.$store.dispatch("logOutUser");
          this.$router.push("/");
          this.$toast.success("Logged Out!");
        }
      } catch (error) {
        this.$toast(error);
      }
    },
  },
  computed: {
    getAdmin() {
      return this.$store.state.user.isAdmin;
    },
  },
};
</script>

<template>
  <div class="w-100">
    <div class="sidebar w-100">
      <b-list-group class="sidebar-list my-3 text-left">
        <b-list-group-item class="list-item"
          ><router-link to="/home/profile"
            ><BIconPerson class="mr-2" />Profile</router-link
          ></b-list-group-item
        >
        <b-list-group-item class="list-item"
          ><router-link to="/home"
            ><BIconClockHistory class="mr-2" />Historical Data</router-link
          ></b-list-group-item
        >
        <b-list-group-item class="list-item"
          ><router-link to="/home/monthly"
            ><BIconCalendar2Month class="mr-2" /> Monthly Data</router-link
          ></b-list-group-item
        >
        <b-list-group-item class="list-item" v-if="getAdmin"
          ><router-link to="/home/admin/userList"
            ><BIconPersonLinesFill class="mr-2" />User List</router-link
          ></b-list-group-item
        >
        <b-list-group-item class="list-item" v-if="getAdmin"
          ><router-link to="/home/admin/payrollList"
            ><BIconCashCoin class="mr-2" />Payroll List</router-link
          ></b-list-group-item
        >

        <b-list-group-item class="list-item"
          ><span @click="logOut" class="logout"
            ><BIconBoxArrowLeft class="mr-2" /> Log Out</span
          ></b-list-group-item
        >
      </b-list-group>
    </div>
  </div>
</template>

<style scoped>
.sidebar-list .list-item {
  border: none;
  background-color: #212529;
  color: white;
  border-radius: 10px;
}

.sidebar-list .list-item a {
  text-decoration: none;
  color: white;
}

.sidebar-list .list-item:hover {
  background-color: white;
  color: black;
}

.sidebar-list .list-item:hover a {
  color: black;
}

.logout {
  cursor: pointer;

  border: none;
  outline: none;
}
</style>
