import axios, { AxiosResponse } from "axios";
import { createContext } from "react";

export const AuthContext = createContext({
  token: "",
  setToken: () => {},
  deleteToken: () => {}
  
});

const DataProvider = {
     getOne(  id, route ,token ) {
        return axios
            .get(`${route}/${id}`, {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.error(error);
                throw error;
            });
    },


     getList( route,token){
        return axios
            .get(`${route}`, {
                
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.error(error);
                throw error;
            });
    },

    getCusines(){
      
    },

     createOne(data, route, token) {
        return axios
            .post(`${route}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.error(error);
                throw error;
            });
    },
     updateOne(data,id, route,token) {
        return axios
            .put(`${route}/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.error(error);
                throw error;
            });
    },

     deleteOne(id, route, token) {
        return axios
            .delete(`${route}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.error(error);
                throw error;
            });
    }
  }

  export default DataProvider;