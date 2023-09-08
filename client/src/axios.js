// import axios from "axios";
// const instance = axios.create({
//   baseURL: "http://localhost:8000",
// });

// export default instance;

import axios from "axios";
const instance = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}`,
});

export default instance;
