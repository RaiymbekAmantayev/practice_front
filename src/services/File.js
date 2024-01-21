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

}