<template>
  <div class="file-upload-container">
    <h1>File Upload</h1>
    <label for="documentId">documentId:</label>
    <input type="text" id="title" v-model="documentId" />
    <br />
    <div v-for="point in points" :key="point.id">
      <input type="checkbox" v-model="isSelected[point.id]" :value="point.id">{{ point.code }}
    </div>
    <div v-for="(file, index) in files" :key="index" class="projects">
      <div class="form-group">
        <label for="fileInput" class="custom-file-input-label">
          Choose Files
        </label>
        <input type="file" id="fileInput" ref="fileInput" @change="handleFileChange(index, $event)" multiple />
      </div>
      <div class="form-group">
        <label>Compressing:</label> <br>
        <select v-model="file.compressing">
          <option value="1">сжать</option>
          <option value="0">не сжать</option>
        </select>
      </div>
      <button @click="removeFile(index)" class="btn btn-danger">Remove</button>
      <button @click="addFile" class="btn btn-success">Add File</button>
    </div>
    <button @click="uploadFiles()">Upload Files</button>
    </div>

</template>

<script>

import File from '@/services/File'
import Point from "@/services/Point";
import axios from "axios";


export default {
  data() {
    return {
      documentId: '',
      isSelected:{},
      files: [
        { file: null, compressing: [] }
      ],
      points: [],
      compressValues:[],
      base_url:''
    };
  },
  async mounted() {
    const point = await Point.getPoints();
    this.points = point.data;
    const userPoint = await File.getPoint()
    this.base_url = userPoint.data
    await this.loadPoints();
  },
  methods: {
    async loadPoints() {
      try {
        const point = await Point.getPoints();
        this.points = point.data;
      } catch (error) {
        console.error('Ошибка загрузки точек:', error);
      }
    },
    handleFileChange(index, event) {
      const files = event.target.files;
      if (files.length > 0) {
        this.files[index].file = files[0];
      }
    },
    addFile() {
      this.files.push({  file: null, compressing:[] });
    },
    removeFile(index) {
      this.files.splice(index, 1);
    },
    async uploadFiles() {
      try {
        const formData = new FormData();
        formData.append('documentId', this.documentId);

        // Добавляем выбранные pointId в formData
        for (const pointId in this.isSelected) {
          if (this.isSelected[pointId]) {
            formData.append('pointId', pointId);
            console.log("pointId is", pointId);
          }
        }

        // Добавляем значения сжатия для каждого файла в formData
        for (const file of this.files) {
          for (const comp of file.compressing) {
            formData.append('compressing', comp);
            console.log("compressing value is:", comp);
          }
        }

        // Добавляем файлы в formData
        for (const file of this.files) {
          formData.append('files', file.file);
        }
        for(const file of this.files){
          const token = localStorage.getItem('token');
          const response = await axios.post(`${this.base_url}/api/file/add`, formData, {
            headers: {
              Authorization: `Bearer ${token}`
            },
          });
          const responseData = response.data; // Распаковываем ответ в формате JSON
          console.log('Файлы успешно загружены:', responseData);
          console.log(file)
        }

      } catch (error) {
        console.error('Ошибка загрузки файлов:', error);
      }
    }
  }

}
</script>

<style scoped>
.file-upload-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  text-align: center;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

#title {
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
}

.projects {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 20px;
}
.custom-file-input-label {
  display: inline-block;
  background-color: #3498db;
  color: #fff;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 15px;
}

#fileInput {
  display: none;
}

button {
  background-color: #2ecc71;
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>