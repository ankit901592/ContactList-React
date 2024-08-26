import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for fetching contact list
export const getContactListAsync = createAsyncThunk(
  "contacts/getContactListAsync",
  async (arg, thunkApi) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const postAddContactAsync = createAsyncThunk(
  "contacts/postAddContactAsync",
  async (payload, thunkApi) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      // Check if the response is ok (status in the range 200-299)
      if (!response.ok) {
        throw new Error("Failed to add contact");
      }

      const data = await response.json();
      return data; // Return the new contact data
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  list: [],
  favList: [
    {
      id: 1,
      name: "Ankit Chakraborty",
      phone: "9015928483",
    },
  ],
  editContactsData: {},
};

// Creating slice
const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    deleteContact: (state, action) => {
      state.list = state.list.filter((v, index) => v.id !== action.payload);
    },
    addEditdata: (state, action) => {
      state.editContactsData = { ...action.payload };
    },
    updateContactAsync: (state, action) => {
      const { id } = action.payload;
      const index = state.list.findIndex((i) => i.id ===id);
      state.list[index] = action.payload;
    },
    clearEditData: (state, action) => {
      state.editContactsData = "";
    },
    addToFavList: (state, action) => {
      let { name } = action.payload;
      const fav = state.favList.find((i) => i.name === name);

      // If the item is not found, add it to the favList
      if (!fav) {
        state.favList.push(action.payload);
      }
    },
    deletetoFav: (state, action) => {
      state.favList = state.favList.filter((i, idx) => i.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getContactListAsync.fulfilled, (state, action) => {
        // action.payload contains the fetched data
        state.list = action.payload; // Set the list state to the fetched data
      })
      .addCase(postAddContactAsync.fulfilled, (state, action) => {
        state.list.push(action.payload);
      });
  },
});

export const {
  addToFavList,
  deletetoFav,
  clearEditData,
  addContact,
  deleteContact,
  editContact,
  addEditdata,
  updateContactAsync,
} = contactSlice.actions;

export const selectContact = (state) => {
  return state.contacts.list;
}; // Assuming the slice is mounted at 'contacts'
export const selectContactFav = (state) => state.contacts.favList;
export const selecteditdata = (state) => state.contacts.editContactsData;
export const contactReducer = contactSlice.reducer;
