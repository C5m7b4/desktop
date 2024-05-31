import { createSlice } from "@reduxjs/toolkit";
import { doesRowExist } from "../utils/arrayUtils";

export type IApp = {
  _uid: string;
  component: string;
  height: number;
  width: number;
  title?: string;
  name?: string;
};

export type IMiniApp = {
  _uid: string;
  name?: string;
  title?: string;
};

export type IAddApp = {
  payload: IApp;
};

interface IMinApp {
  payload: IMiniApp;
}

interface AppState {
  apps: IApp[];
  minimizedApps: IMiniApp[];
}

const initialState: AppState = {
  apps: [
    {
      _uid: "hkhwer98u987",
      component: "counter",
      height: 400,
      width: 400,
      title: "Counter",
      name: "Counter",
    },
    {
      _uid: "ff746354",
      component: "receiver",
      height: 200,
      width: 400,
      title: "Receiver",
      name: "Receiver",
    },
    // {
    //   _uid: "hsdkerer",
    //   component: "calculator",
    //   height: 200,
    //   width: 400,
    //   title: "Calculator",
    //   name: "Calculator",
    // },
  ],
  minimizedApps: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addApplication: (state, action: IAddApp) => {
      state.apps = [...state.apps, action.payload];
    },
    removeApplication: (state, action) => {
      const index = state.apps.findIndex((a) => a._uid === action.payload);
      const copy = [...state.apps];
      copy.splice(index, 1);
      state.apps = copy;
    },
    minimizeApplication: (state, action: IMinApp) => {
      if (
        !doesRowExist(state.minimizedApps, "_uid", action.payload._uid).found
      ) {
        const allMinimizedApps = [...state.minimizedApps, action.payload];
        state.minimizedApps = allMinimizedApps;
      }
    },
    maximizeApplication: (state, action) => {
      // get the index out of minimized apps and remove it
      const index = state.minimizedApps.findIndex((a) => a === action.payload);
      if (index) {
        const copy = [...state.minimizedApps];
        copy.splice(index, 1);
        state.minimizedApps = copy;
      }
    },
  },
});

export const {
  addApplication,
  maximizeApplication,
  minimizeApplication,
  removeApplication,
} = appSlice.actions;
export default appSlice.reducer;
