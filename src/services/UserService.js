import axios from "axios";


const USERS_REST_API_URL = "http:/localhost:8080/api/todos";

class UserService {

    getUsers(){
        axios.get(USERS_REST_API_URL);
    }
}

export default new UserService();