import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
    name: "modal",
    initialState: {
        isUpdateModalOpen: false,
        isAddModalOpen: false,
    },
    reducers: {
        openUpdateModal: (state) => {
            state.isUpdateModalOpen = true;
        },
        closeUpdateModal: (state) => {
            state.isUpdateModalOpen = false;
        },
        openAddModal: (state) => {
            state.isAddModalOpen = true;
        },
        closeAddModal: (state) => {
            state.isAddModalOpen = false;
        },
    },
});

export const {
    openUpdateModal,
    closeUpdateModal,
    openAddModal,
    closeAddModal,
} = modalSlice.actions;

export default modalSlice.reducer;
