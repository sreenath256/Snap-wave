import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  userId: null,
  token: null,
  isLoading: true,
  error: null,
  refresh:false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.user = null;
      state.token = null;
      localStorage.removeItem("user_id");
      localStorage.removeItem("token");
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setRefresh:(state)=>{
      state.refresh= !state.refresh;
    }
   
  },
});

export const {
  setUser,
  setUserId,
  clearUser,
  setLoading,
  setError,
  setToken,
  setRefresh,
} = userSlice.actions;
export default userSlice.reducer;
