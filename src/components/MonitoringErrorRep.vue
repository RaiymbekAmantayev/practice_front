<template>
  <div>
    <h2>Мониторинг ошибок</h2>
    <table class="monitoring-table">
      <thead>
      <tr>
        <th>Id File</th>
        <th>File Name</th>
        <th>Type Error</th>
        <th>From</th>
        <th>To</th>
        <th>Try Again</th>
        <th>Action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in monitoring" :key="item.monitoring.id">
        <td>{{ item.monitoring.fileId }}</td>
        <td>{{ item.monitoring.file.name }}</td>
        <td>{{ item.monitoring.typeError }}</td>
        <td>{{ item.points.root_folder }}</td>
        <td>{{ item.toPoints.root_folder }}</td>
        <td><button @click="tryAgain(item.monitoring.id)" class="btn btn-success">Try Again</button></td>
        <td><button @click="deleteFile(item.monitoring.id)" class="btn btn-danger">Delete</button></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
import MonitoringService from "@/services/MonitoringService";
import Replic from "@/services/Replic";
export default {
  data() {
    return {
      monitoring: []
    };
  },
  async mounted() {
    const response = await MonitoringService.getMonitoring();
    this.monitoring = response.data.monitoring;
  },
  methods: {
    async tryAgain(id){
      const response = await Replic.TryAgain(id)
      this.refreshMonitoring()
      console.log(response.data)
    },
    async DeleteFile(id){
      const response = await MonitoringService.deleteFile(id)
      this.refreshMonitoring()
      console.log(response.data)
    },
    async refreshMonitoring() {
      try {
        const response = await MonitoringService.getMonitoring()
        this.monitoringList = response.data;

      } catch (error) {
        console.error('Error refreshing organizations:', error);
      }
    },
  }
};
</script>

<style scoped>
.monitoring-table {
  width: 100%;
  border-collapse: collapse;
}

.monitoring-table th,
.monitoring-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.monitoring-table th {
  background-color: #f2f2f2;
}

.monitoring-table tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

.monitoring-table tbody tr:hover {
  background-color: #ddd;
}
</style>
