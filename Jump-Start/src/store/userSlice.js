import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userDetails: {},
    userType: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserDetails(state, action) {
            state.userDetails = action.payload;
        },

        clearUserDetails(state) {
            state.userDetails = {};
        },


        setUserType(state, action) {
            state.userType = action.payload;
        },

        clearUserType(state) {
            state.userType = null;
        }
    }
})

export const userActions = userSlice.actions;

export default userSlice.reducer;