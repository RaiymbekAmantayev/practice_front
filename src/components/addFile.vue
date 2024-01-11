<template>
  <div class="file-upload-container">
    <h1>File Upload</h1>
    <label for="title">Title:</label>
    <input type="text" id="title" v-model="title" />
    <br />
    <label for="fileInput" class="custom-file-input-label">
      Choose Files
    </label>
    <input type="file" id="fileInput" ref="fileInput" @change="handleFileChange" multiple />
    <button @click="uploadFiles">Upload Files</button>
  </div>
</template>

<script>
// import axios from 'axios';
import File from '../services/File'
export default {
  data() {
    return {
      title: '',
      files: [],
    };
  },
  methods: {
    handleFileChange(e) {
      this.files = e.target.files;
    },
    async uploadFiles() {
      const formData = new FormData();
      formData.append('title', this.title);

      for (let i = 0; i < this.files.length; i++) {
        formData.append('file', this.files[i]);
      }

      try {
        // const token = localStorage.getItem('token')
        const response = await File.AddFile(formData)
        console.log('File upload successful:', response.data);
        formData.title = '';
        formData.files = [];
        // Handle the response as needed
      } catch (error) {
        console.error('Error uploading files:', error);
        // Handle the error as needed
      }
    },
  },
};
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