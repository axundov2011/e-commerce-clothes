import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../components/api/Auth.services"

export const fetchUsers = createAsyncThunk(
    "auth/fetchUsers",
    async (params) => {
        try {
            const response = await api.get("/users", params);
            const data = response.data
            console.log(data);
            return data;
        } catch (error) {
            throw error;
        }
    }
  );
  
  export const deleteUsers = createAsyncThunk(
    "auth/fetchUsers",
    async (userEmail) =>  {
        try {
            const response = await api.delete(`/users/${userEmail}`);
            const data = response.data
            console.log(data);
            return data;
        } catch (error) {
            throw error;
        } 
    }
  )


  
  