import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../components/api/Auth.services"

export const fetchCategory = createAsyncThunk(
    "category/fetchCategory",
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
    "category/fetchCategory",
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
  export const updateCategory = createAsyncThunk(
    "category/fetchCategory",
    async ({categoryId,values}) => {
      try {
        const response = await api.put(`/categories/${categoryId}`,values);
        const data = response.data;
        console.log(data, 'updateCategoryData');
        return data;
      } catch (error) {
        throw error;
      }
    }
  );
  export const createCategory = createAsyncThunk(
    "category/fetchCategory",
    async (categoryData) =>  {
        try {
            const response = await api.post(`/categories`,categoryData);
            const data = response.data
            console.log(data);
            return data;
        } catch (error) {
            throw error;
        } 
    }
  )


  const initialState = {
    categories: [],
    singleCategory: null,
    status: 'idle',
    error: null,
  }


  const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},

  })

  export default categorySlice.reducer;
