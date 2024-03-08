import Api from "@/services/Api";
export default {
    AddRep(credential) {
        const token = localStorage.getItem('token')
        return Api().post('api/rep/add', credential, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
    },
    getReplicFile() {
        const token = localStorage.getItem('token')
        return Api().get('api/rep/show', {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
    },
    getRepByDocs(documentId){
        const token = localStorage.getItem('token')
        return Api().get(   `/api/rep/showByDoc?documentId=${documentId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
    },
    TryAgain(id){
        const token = localStorage.getItem('token')
        return Api().put(   `/api/master/rep/waiting/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
    }
}