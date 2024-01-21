<template>
  <div>
    <h1>Список реплицированных файлов</h1>
    <ul>
      <li v-for="fileReplica in file_replicas" :key="fileReplica.id">
        <div>
          <div v-if="fileReplica.files">
            <a :href="Rep(fileReplica.files.file, CurrentPoint.root_folder)" :download="getFileNameFromPath(fileReplica.files.file)">
              <img :src="Rep(fileReplica.files.file, CurrentPoint.root_folder)" alt="File Preview" />
            </a>
            <p>названия файла: {{fileReplica.files.name}}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>

import Replic from "@/services/Replic";
import axios from "axios";
export default {
  data() {
    return {
      CurrentPoint: {},
      file_replicas: []
    };
  },
  async mounted() {
    const documentId = this.$route.query.documentId;
    console.log(documentId);
    const response = await Replic.getRepByDocs(documentId);
    this.file_replicas = response.data;
    const Current = await axios.get('http://127.0.0.1:6001/api/point/current')
    this.CurrentPoint = Current.data;
  },
  methods: {
    isVideo(filePath) {
      // Пример: Проверяем, заканчивается ли расширение на видео
      return /\.(mp4|avi|mkv)$/i.test(filePath);
    },
    Rep(relativePath, folder) {
      const newPath = relativePath.substring(relativePath.indexOf("/") + 1)
      let path = newPath.split('\\').slice(1).join('\\');
      return `http://localhost:6001/${folder}/${path}`;
    },
    getFileNameFromPath(filePath) {
      const parts = filePath.split('/');
      return parts[parts.length - 1];
    },
  }
};
</script>

<style>
/* Ваши стили могут быть добавлены здесь */
</style>
