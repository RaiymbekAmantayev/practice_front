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
    }
}