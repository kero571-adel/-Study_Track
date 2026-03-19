import { createSlice } from "@reduxjs/toolkit";

const notifications = [
  {
    id: 1,
    primary: "Photos",
    secondary: "Jan 9, 2014",
  },
  {
    id: 2,
    primary: "Photos",
    secondary: "Jan 9, 2014",
  },
  {
    id: 3,
    primary: "Photos",
    secondary: "Jan 9, 2014",
  },
  {
    id: 4,
    primary: "Photos",
    secondary: "Jan 9, 2014",
  },
  {
    id: 5,
    primary: "Photos",
    secondary: "Jan 9, 2014",
  },
  {
    id: 6,
    primary: "Photos",
    secondary: "Jan 9, 2014",
  },
];

const initialState = {
  value: notifications,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    notif: (state, action) => {
      state.value.push(action.payload);
    },
    toggleNotifications: (state, action) => {
      // Fixed: Removed direct localStorage access from reducer
      // localStorage should be handled in middleware or selectors
      return state;
    },
  },
});

export const { notif, toggleNotifications } = notificationSlice.actions;

export default notificationSlice.reducer;
