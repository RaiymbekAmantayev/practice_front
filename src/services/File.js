import Api from "@/services/Api";
export default {
    AddFile(credential) {
        const token = localStorage.getItem('token')
        return Api().post('api/file/add', credential, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            },
        })
    },
    getLocalFile() {
        const token = localStorage.getItem('token')
        return Api().get('api/file/local', {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
    },
    getDocs() {
        const token = localStorage.getItem('token')
        return Api().get('api/file/docs', {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
    },
    getByDocs(documentId){
        const token = localStorage.getItem('token')
        return Api().get(   `/api/file/search?documentId=${documentId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
    },
    getFile(ids) {
        const token = localStorage.getItem('token');
        const idString = ids.join(','); // Convert the array of IDs to a comma-separated string
        return Api().get(`/api/file/${idString}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
    }
}