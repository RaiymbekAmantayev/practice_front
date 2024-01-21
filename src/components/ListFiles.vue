<template>
  <div>
    <h1>Список локальных файлов</h1>
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

import File from "@/services/File";
import Point from "@/services/Point";
import Replic from "@/services/Replic";
import axios from "axios";


export default {
  data() {
    return {
      files: [],
      points:[],
      fileId: null,
      pointId: null,
      CurrentPoint: {},
      file_replicas: []
    }
  },
  async mounted() {

    try {
      const response = await File.getLocalFile();
      this.files = response.data;
      const point = await Point.getPoints()
      this.points = point.data;
      const replic = await Replic.getReplicFile();
      this.file_replicas = replic.data
      const Current = await axios.get('http://127.0.0.1:6001/api/point/current')
      this.CurrentPoint = Current.data;
      console.log(this.files);
      console.log(this.points)
      console.log(this.file_replicas)
      console.log(this.CurrentPoint)
    } catch (error) {
      console.error('Error fetching repl:', error);
    }
  },
  methods: {
    isVideo(filePath) {
      // Пример: Проверяем, заканчивается ли расширение на видео
      return /\.(mp4|avi|mkv)$/i.test(filePath);
    },
    getFullImageUrl(relativePath) {
      return `http://localhost:6001/${relativePath}`;
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
