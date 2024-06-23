import axios, { AxiosResponse } from "axios";
import { createContext } from "react";
import Alert from '@mui/material/Alert';

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
    
    addFav(dishId, route, token) {
      console.log(`${route}/${dishId}`, token); // Перевірка чи токен отримується
  
      return axios.patch(`${route}/${dishId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
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

    createOne(data, route, token) {
   
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    
      return axios
        .post(route, data, config) 
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.error('Error:', error);
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