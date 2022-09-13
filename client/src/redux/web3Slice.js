import { createSlice } from "@reduxjs/toolkit";

const web3ConfigSlice = createSlice({
    name: "web3Config",
    initialState: {
        provider: undefined,
        signer: undefined,
        contract: undefined,
        account: undefined
    },
    reducers: {
        setProvider: (state, action) => {
            const { provider } = action.payload;
            state.provider = provider;
        },
        setSigner: (state, action) => {
            const { signer } = action.payload;
            state.signer = signer;
        },
        setContract: (state, action) => {
            const { contract } = action.payload;
            state.contract = contract;
        },
        setAccount: (state, action) => {
            const { account } = action.payload;
            state.account = account;
        }
    }
});

export const { setProvider, setSigner, setContract, setAccount } = web3ConfigSlice.actions;
export default web3ConfigSlice.reducer;
