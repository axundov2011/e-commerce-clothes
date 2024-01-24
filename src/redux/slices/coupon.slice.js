
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../components/api/Auth.services"

export const fetchCoupon = createAsyncThunk(
    "coupons/fetchCoupon",
    async (params) => {
        try {
            const response = await api.get('/coupons',params);
            const data = response.data
            console.log(data);
            return data;
        } catch (error) {
            throw error;
        }
    }
  );


  export const createCoupon = createAsyncThunk(
    "coupons/fetchCoupon",
    async (couponData) => {
        try {
            const response = await api.post("/coupons",couponData);
            const data = response.data;
            return data;
        } catch (error) {
            throw error
        }
    }
  );


  export const deleteCoupon = createAsyncThunk(
    "coupons/fetchCoupon",
    async (couponsId) => {
try {
    const response = await api.delete(`/coupons/${couponsId}`);
    const data = response.data;
    console.log(data);
    return data;
} catch (error) {
    throw error;
}
    }
  );


export const updateCoupons = createAsyncThunk(
    "coupons/fetchCoupon",
    async ({couponId, values}) => {
        try {
            const response = await api.put(`/coupons/${couponId}`,values);
            const data = response.data
            return data;
        } catch (error) {
            throw error
        }
    }
)
