import axios from "axios";
import useAuth from "../hooks/useAuth";

const baseUrl=`${process.env.REACT_APP_SERVER_URL}`
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzemFpZDQ0NDY2NkBnbWFpbC5jb20iLCJpYXQiOjE3MzExNjU4MzMsImV4cCI6MTczMTE3NDIzM30.K_s1TpyFRKo-zYrT1U9_wMuRF82lTlHi_aWBaaYke6Z_9GGtzpxUlgJjkiNVdGQY25y2y_hvUtczGcddIRPNuQ'

export default axios.create({
    baseURL:baseUrl,
    headers: {
        // 'Authorization': 'Bearer yourToken',
        'Content-Type': 'application/json',
      }
})

export const PrivateComponent = () => {
  const {auth} = useAuth();

  const privateAxios = axios.create({
    baseURL: baseUrl,
    headers: {
      // 'Authorization': `Bearer ${auth.token}`,
      'x-auth-token': token,
    }
  });

  return privateAxios;
};

