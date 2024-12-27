<script>
import authServices from "../../services/authServices";
import Loader from "../Loader.vue";
import {
  BIconPencilSquare,
  BIconTrash,
  BIconXLg,
  BIconCheckLg,
} from "bootstrap-vue";
export default {
  name: "userList",
  components: { Loader, BIconPencilSquare, BIconTrash, BIconCheckLg, BIconXLg },
  data() {
    return {
      users: [],
      loading: false,
      loadingDelete: false,
      selectedMonth: "",
      income: "",
    };
  },
  async mounted() {
    try {
      this.loading = true;
      const res = await authServices.getAllUsers();
      this.users = res;
      this.loading = false;
    } catch (error) {
      console.log(error);
      this.$toast.error(error.response.data.message || error.error);
      this.loading = false;
    }
  },
  methods: {
    async submitDelete(id) {
      try {
        const confirm = window.confirm("Are you sure you want to delete?");
        if (confirm) {
          this.loadingDelete = true;
          await authServices.DeleteSingleUser(id);
          this.loadingDelete = false;
          this.$toast.success("User Deleted!")
          window.location.reload();
        }
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
  },
};
</script>

<template>
  <div class="w-100">
    <div class="loader" v-if="loading">
      <Loader />
    </div>
    <div class="table" v-else>
      <div class="tableContainer">
        <!-- <b-table striped hover :items="users" thead-class="bg-dark text-white text-uppercase">
        </b-table> -->
        <table class="table table-striped">
          <thead class="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">USERNAME</th>
              <th scope="col">EMAIL</th>
              <th scope="col">PHONE NO</th>
              <th scope="col">ADMIN</th>
              <th scope="col">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user._id">
              <td>{{ user._id }}</td>
              <td>{{ user.username }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.phoneNumber }}</td>
              <td>
                <span v-if="user.isAdmin">
                  <BIconCheckLg class="text-success" />
                </span>
                <span v-else>
                  <BIconXLg class="text-danger" />
                </span>
              </td>
              <td>
                <router-link
                  :to="`/home/admin/${user._id}/updateuser`"
                  class="text-decoration-none text-dark"
                  ><BIconPencilSquare /></router-link
                ><button
                  class="btn text-danger"
                  :disabled="loadingDelete"
                  @click="submitDelete(user._id)"
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
  height: 60vh;
  overflow: scroll;
}
</style>
