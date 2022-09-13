import { createSlice } from "@reduxjs/toolkit";

const userDataSlice = createSlice({
    name: "userData",
    initialState: {
        landingSlug: undefined,
        JWT: undefined
    },
    reducers: {
        setLandingSlug: (state, action) => {
            const { landingSlug } = action.payload;
            state.landingSlug = landingSlug;
        },
        setJWT: (state, action) => {
            const { JWT } = action.payload;
            state.JWT = JWT;
        }
    }
});

export const { setLandingSlug, setJWT } = userDataSlice.actions;
export default userDataSlice.reducer;
