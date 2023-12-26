import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../components/api/Auth.services"
export const fetchCategory = createAsyncThunk(
    "auth/fetchCategory",
    async (params) => {
        try {
            const response = await api.get("/categories", params);
            const data = response.data
            console.log(data);
            return data;
        } catch (error) {
            throw error;
        }
    }
  );


  export const deleteCategory = createAsyncThunk(
    "auth/fetchCategory",
    async (categoryId) =>  {
        try {
            const response = await api.delete(`/categories/${categoryId}`);
            const data = response.data
            console.log(data);
            return data;
        } catch (error) {
            throw error;
        } 
    }
  )
  export const createCategory = createAsyncThunk(
    "auth/fetchCategory",
    async (categoryId) =>  {
        try {
            const response = await api.post(`/categories/${categoryId}`);
            const data = response.data
            console.log(data);
            return data;
        } catch (error) {
            throw error;
        } 
    }
  )