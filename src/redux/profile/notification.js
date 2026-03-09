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
      state.notifications.push(action.payload);
    },
    toggleNotifications: (state,action) => {
      let userData = JSON.parse(localStorage.getItem("user"));
        
    },
  },
});

export const { notif, toggleNotifications } =
  notificationSlice.actions;

export default notificationSlice.reducer;
