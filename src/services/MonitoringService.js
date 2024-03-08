import Api from "@/services/Api";
export default {
    getMonitoring() {
        const token = localStorage.getItem('token')
        return Api().get('api/monitoring/show', {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
    },
    deleteFile(id){
        const token = localStorage.getItem('token')
        return Api().post(`api/monitoring/file/del/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
    }
}