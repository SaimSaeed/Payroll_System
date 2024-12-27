<script>
import Sidebar from "./Sidebar.vue";
export default {
  name: "home",
  components: { Sidebar },
};
</script>

<template>
  <div class="h-screen w-screen homeContainer">
    <div class="container-fluid w-100 h-100">
      <div class="row h-100">
        <div class="col-md-2 sidebar-main">
          <div class="sidebarContainer">
            <Sidebar />
          </div>
        </div>
        <div
          class="col-md-10 mainContainer d-flex justify-content-center align-items-center"
        >
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.homeContainer {
  height: 100vh;
}

.sidebar-main {
  background-color: #212529;
}
</style>
