import { createSlice } from "@reduxjs/toolkit";
import { getCookie } from "cookies-next";

interface InitialStateProps {
  locked: boolean;
}

const initialState: InitialStateProps = {
  locked: getCookie("app@locked")
    ? JSON.parse(getCookie("app@locked") as string).state
    : false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
});
