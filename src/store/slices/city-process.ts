import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type CityProcessState = {
  city: string;
}

const initialState: CityProcessState = {
  city: 'Paris',
};

export const cityProcess = createSlice({
  name: 'cityProcess',
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
  },
});

export const {changeCity} = cityProcess.actions;
