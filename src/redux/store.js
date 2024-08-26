import { configureStore } from "@reduxjs/toolkit";
import { contactReducer } from "./reducer/contacReducer";

export const store = configureStore({
  reducer: {
    contacts: contactReducer, // Assign the contactReducer to the "contacts" slice of state
  },
});
