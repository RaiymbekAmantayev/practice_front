<template>
  <div>
    <h1>Список файлов по документу</h1>
    <ul>
      <li v-for="file in files" :key="file.id" @click="showFile(file.file)">
        <div>
          <p>{{file.name}}</p>
          <p>{{file.file}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
// import axios from "axios";
import File from "@/services/File";
import axios from "axios";
export default {
  data() {
    return {
      files: [],
      base_url: ''
    };
  },
 async mounted() {
    const documentId = this.$route.query.documentId;
    console.log(documentId);
    const response = await File.getByDocs(documentId);
    this.files = response.data;
   const userPoint = await File.getPoint()
   this.base_url = userPoint.data
    console.log(this.files);
  },
  methods: {
    getFullImageUrl(relativePath) {
      return `http://localhost:6001/${relativePath}`;
    },
    async showFile(filePath) {
      try {
        // Вызываем метод для загрузки файла
        const response = await axios.get(`${this.base_url}/api/file/show?filePath=${filePath}`);
        const blob = response.data;
        const url = window.URL.createObjectURL(blob);
        window.open(url);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching file:', error);
      }
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
