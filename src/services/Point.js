import Api from "@/services/Api";
export default {
    getPoints() {
        const token = localStorage.getItem('token')
        return Api().get('api/point/show', {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
    },
    // getCurrent(){
    //     return Api.get('api/point/current')
    // }
}