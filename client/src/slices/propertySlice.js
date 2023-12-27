import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  propertiesList: null,
  name: "Hello Property Slice",
};

const property = createSlice({
  name: "property",
  initialState,
  reducers: {
    setPropertiesList: (state, action) => {
      console.log(action.payload, " propsrties");
      state.propertiesList = action.payload;
    },
  },
});

export const { setPropertiesList } = property.actions;

export default property.reducer;
