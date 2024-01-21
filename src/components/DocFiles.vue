<template>
  <div style="align-content: center">
    <h1>Список локальных документов</h1>
        <div class="row">
          <div v-for="file in files" :key="file.id" class="col-sm-3">
            <div class="card">
              <div class="card-body">
                <p class="card-text">{{file.documentId}}</p>
                <router-link :to="{ path: '/filesByDoc', query: { documentId: file.documentId } }" class="btn btn-primary">
                  Посмотреть файлы
                </router-link>
              </div>
            </div>
          </div>
        </div>
  </div>
  <div style="align-content: center">
    <h1>Список реплицированных документов</h1>
    <div class="row">
      <div v-for="fileReplica in file_replicas" :key="fileReplica.id" class="col-sm-3">
        <div class="card">
          <div class="card-body">
            <p class="card-text">{{fileReplica.files.documentId}}</p>
            <router-link :to="{ path: '/repFilesByDoc', query: { documentId: fileReplica.files.documentId } }" class="btn btn-primary">
              Посмотреть файлы
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

import File from "@/services/File";
import Replic from "@/services/Replic";
export default {
  data() {
    return {
      files: [],
      file_replicas: []
    }
  },
  async mounted() {

    try {
      const response = await File.getDocs();
      this.files = response.data;
      const replic = await Replic.getReplicFile();
      this.file_replicas = replic.data
    } catch (error) {
      console.error('Error fetching repl:', error);
    }
  }
};

</script>
