<template>
  <div class="file-upload-container">
    <h1>File Upload</h1>
    <label for="documentId">documentId:</label>
    <input type="text" id="title" v-model="documentId" />
    <br />
    <label for="fileInput" class="custom-file-input-label">
      Choose Files
    </label>
    <div v-for="(point, index) in points" :key="point.id">
      <input type="checkbox" v-model="isSelected[index]" :value="point.code">{{ point.code }}/>
    </div>
    <input type="file" id="fileInput" ref="fileInput" @change="handleFileChange" multiple />
    <button @click="uploadFiles()">Upload Files</button>
  </div>
</template>

<script>

import File from '../services/File'
import Point from "@/services/Point";
import Replic from "@/services/Replic";

  export default {
    data() {
      return {
        isSelected: [],
        documentId: '',
        files: [],
        points: [],
      };
    },
    async mounted() {
      const point = await Point.getPoints();
      this.points = point.data;
    },
    methods: {
      handleFileChange(e) {
        this.files = e.target.files;
      },
      async uploadFiles() {
        try {
          const fileIds = [];
          const replicas=[]
          const formData = new FormData();
          formData.append('documentId', this.documentId);
          for (let i = 0; i < this.files.length; i++) {
            formData.append('files[]', this.files[i]);
          }
          const response = await File.AddFile(formData);
          console.log('Files upload successful:', response.data);

          if (Array.isArray(response.data) && response.data.length > 0) {
            for (let i = 0; i < response.data.length; i++) {
              const fileId = response.data[i].id;
              fileIds.push(fileId);
            }
            console.log(fileIds)
            const selectedPoints = this.isSelected.reduce((acc, isSelected, index) => {
              if (isSelected) {
                acc.push(this.points[index].id);
              }
              return acc;
            }, []);
            console.log('Selected Points IDs:', selectedPoints);

            for (let i = 0; i < fileIds.length; i++) {
              for (let j = 0; j < selectedPoints.length; j++) {
                replicas.push({
                  fileId: fileIds[i],
                  pointId: selectedPoints[j],
                });
              }
            }
            const requestData = {
              replicas: replicas
            };
            console.log('Request Data:', requestData);

            const replicResponse = await Replic.AddRep(requestData);
            console.log(replicResponse.data)
          } else {
            console.error('Unexpected response structure:', response.data);
          }

        } catch (error) {
          console.error('Error uploading or replicating files:', error);
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

#docId {
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
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