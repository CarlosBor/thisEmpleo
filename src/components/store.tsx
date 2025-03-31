import { configureStore, createSlice } from '@reduxjs/toolkit';

type BoolState ={
    value: boolean,
}

// Define a simple slice (state and actions)
const displayLinkPromptSlice = createSlice({
  name: 'displayLinkPrompt',
  initialState: { value: false },
  reducers: {
    toggle: (state: BoolState) => {
      state.value = !state.value;
    }
  },
});

// Create the Redux store
export const store = configureStore({
  reducer: {
    displayLinkPrompt: displayLinkPromptSlice.reducer,
  },
});

//actions is automatically generated
export const { toggle } = displayLinkPromptSlice.actions;

// Infer the types of the store and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;