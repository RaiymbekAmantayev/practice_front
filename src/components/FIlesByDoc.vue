<template>
  <div>
    <h1>Список файлов по документу</h1>
    <ul>
      <li v-for="file in files" :key="file.id">
        <input type="hidden" v-model="fileId" />
        <div>
          <img v-if="(file.file)" :src="getFullImageUrl(file.file)" alt="File Preview" />
          <video v-else-if="isVideo(file.file)" controls>
            <source :src="getFullImageUrl(file.file)" type="video/mp4">
            Ваш браузер не поддерживает воспроизведение видео.
          </video>
          <p>Реплицировать на:</p>
          <div v-for="point in points" :key="point.id" >
            <input type="hidden" v-model="pointId"/>
            <button @click="replic(file.id, point.id)">{{point.code}}</button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
// import axios from "axios";
import File from "@/services/File";
import Point from "@/services/Point";
import Replic from "@/services/Replic";
export default {
  data() {
    return {
      files: [],
      points:[],
      fileId: null,
      pointId: null,
    };
  },
 async mounted() {
    const documentId = this.$route.query.documentId;
    console.log(documentId);
    const response = await File.getByDocs(documentId);
    this.files = response.data;
    console.log(this.files);
   const point = await Point.getPoints()
   this.points = point.data;
   const replic = await Replic.getReplicFile();
   this.file_replicas = replic.data
  },
  methods: {
    isVideo(filePath) {
      // Пример: Проверяем, заканчивается ли расширение на видео
      return /\.(mp4|avi|mkv)$/i.test(filePath);
    },
    getFullImageUrl(relativePath) {
      return `http://localhost:6001/${relativePath}`;
    },
    getFileNameFromPath(filePath) {
      const parts = filePath.split('/');
      return parts[parts.length - 1];
    },
    async replic(fileId, pointId) {
      console.log('fileId:', fileId);
      console.log('pointId:', pointId);


      try {
        const response = await Replic.AddRep({
          fileId: fileId,
          pointId: pointId
        });
        console.log('File replicated successful:', response.data);
      } catch (error) {
        console.error('Error rep files:', error);
      }
    }
  }
};
</script>

<style>
/* Ваши стили могут быть добавлены здесь */
</style>
