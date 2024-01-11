import Api from "@/services/Api";

export default {
    register(credential) {
        return Api().post('api/users/auth', credential)
    },
    login(credential){
        return Api().post('api/user/login', credential)
    }
}