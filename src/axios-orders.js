import axios from 'axios';

const instance=axios.create({
    baseURL:'https://my-burger-30105.firebaseio.com/'
});
export default instance;