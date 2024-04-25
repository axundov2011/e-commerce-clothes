import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../components/api/Auth.services"
// import { param } from "../../../../backend/routes";
export const fetchRegister = createAsyncThunk(
    "auth/fetchRegister",
    async (params) => {
        const { data } = await api.post("/auth/register", params);
        console.log(data, "fetchRegisterData");
        return data;
    });

    export const upDatePassword = createAsyncThunk(
        "auth/upDateRegister",
        async (params) => {
          try {
            const { data } = await api.post("/auth/update", params);
            console.log(data, 'upDateRegisterData');
            return { payload: data }; // Ensure you return an object with a 'payload' key
          } catch (error) {
            throw error;
          }
        }
      );

export const fetchLogin = createAsyncThunk(
    "auth/fetchLogin",
async (params) => {
        try {
            const response  = await api.post("/auth/login", params);
            const data = response.data // Yalnızca gerekli verileri çıkarın
            console.log(data, 'fetchLoginData');
            return data;
        } catch (error) {
            throw error; // Rethrow the error to be handled in the component
        }
    });

  export const fetchUsers = createAsyncThunk(
    "auth/fetchUsers",
    async (params) => {
        try {
            const response = await api.get("/users", params);
            const data = response.data
            console.log(data, 'fetchUsers');
            return data;
        } catch (error) {
            throw error;
        }
    }
  )  
const initialState = {
    data: null,
    status: "loading",
    isAuthenticated: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login:(state, action) => {
            state.isAuthenticated = true;
        },
        logout: (state) => {
          state.isAuthenticated  = false;
          state.data = null // İsteğe bağlı olarak data alanını sıfırlayabilirsiniz
          state.status = "loading"
          state.error = null;
        },
    },
    extraReducers: {
        //Register

        [fetchRegister.pending]: (state) => {
            state.status = "loading";
            state.data = null;
        },
        [fetchRegister.fulfilled]: (state, action) => {
            state.status = "loaded";
            state.data = action.payload;
        },
        [fetchRegister.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
            state.isAuthenticated = false;  // Burada isAuthenticated'i false olarak güncelle
            state.error = action.error.message;

        },

        //Login
        [fetchLogin.pending]: (state) => {
            state.status = "loading";
            state.data = null;
            state.isAuthenticated = false;
        },
        [fetchLogin.fulfilled]: (state, action) => {
            state.status = "loaded";
            state.data = action.payload;
            state.isAuthenticated = true;
        },
        [fetchLogin.rejected]: (state) => {
            state.status = "error";
            state.data = null;
            state.isAuthenticated = true;
        }
    }
})
export const selecthAuth = (state) => Boolean(state.auth && state.auth.data);
// export const { login } = authSlice.action
export default authSlice;
export const {logout, login}  = authSlice.actions
export const authReducer = authSlice.reducer;
