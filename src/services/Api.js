import axios from 'axios'

// const config = {
//     port: process.env.PORT,
// }
export default () => {
    return axios.create({
        baseURL: `http://127.0.0.1:6001/`
    })

}