<template>
  <div class="file-upload-container">
    <h1>File Upload</h1>
    <label for="documentId">documentId:</label>
    <input type="text" id="title" v-model="documentId" />
    <br />
    <div v-for="(file, index) in files" :key="index" class="projects">
      <label for="fileInput" class="custom-file-input-label">
        Choose Files
      </label>
      <div v-for="point in points" :key="point.id">
        <input type="checkbox" v-model="file.isSelected[point.id]" :value="point.id">{{ point.code }}
      </div>
      <div class="form-group">
        <input type="file" id="fileInput"  ref="fileInput" @change="handleFileChange(index, $event)" multiple />
      </div>
      <div class="form-group">
        <label>Compressing:</label> <br>
        <select v-model="files[index].compressing">
          <option value=1>сжать</option>
          <option value=1>не сжать</option>
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


export default {
  data() {
    return {
      documentId: '',
      files: [
        { file: null, isSelected: {}, compressing:null }
      ],
      points: [],
    };
  },
  async mounted() {
    const point = await Point.getPoints();
    this.points = point.data;
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
      const file = event.target.files[0];
      this.files[index].file = file;
    },
    addFile() {
      this.files.push({  file: null, isSelected: {}, compressing: null });
    },
    removeFile(index) {
      this.files.splice(index, 1);
    },
    async uploadFiles() {
      try {
        const formData = new FormData();
        formData.append('documentId', this.documentId);

        for (const file of this.files) {
          for (const pointId in file.isSelected) {
            if (file.isSelected[pointId]) {
              formData.append('pointId', pointId);
              console.log(pointId)
            }
          }
        }
        for (const file of this.files) {
          formData.append('compressing', file.compressing)
          formData.append('files', file.file);
          console.log(file.compressing)
        }
        for (const file of this.files){
          const response = await File.AddFile(formData);
          console.log('Файлы успешно загружены:', response.data);
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