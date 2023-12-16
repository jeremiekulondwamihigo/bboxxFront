/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { lien } from 'static/Lien';
const initialState = {
  reponse: [],
  getReponse: '',
  getReponseError: '',
  postDemande: '',
  postDemandeError: ''
};
export const ReadReponse = createAsyncThunk('reponse/ReadReponse', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.get(lien + '/touteDemande/1');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const postReponse = createAsyncThunk('reponse/postDemande', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(lien + '/reponsedemande', data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const reponse = createSlice({
  name: 'reponse',
  initialState,
  reducers: {},
  extraReducers: {
    [ReadReponse.pending]: (state, action) => {
      return {
        ...state,
        getReponse: 'pending',
        getReponseError: '',
        postDemande: '',
        postDemandeError: ''
      };
    },

    [ReadReponse.fulfilled]: (state, action) => {
      return {
        reponse: action.payload,
        getReponse: 'success',
        getReponseError: '',
        postDemande: '',
        postDemandeError: ''
      };
    },
    [ReadReponse.rejected]: (state, action) => {
      return {
        ...state,
        getReponse: 'rejected',
        getReponseError: action.payload,
        postDemande: '',
        postDemandeError: ''
      };
    },
    [postReponse.pending]: (state, action) => {
      return {
        ...state,
        getReponse: '',
        getReponseError: '',
        postDemande: 'pending',
        postDemandeError: ''
      };
    },
    [postReponse.fulfilled]: (state, action) => {
      // const updatings = state.reponse.map((x) =>
      //   x.idDemande === action.payload.idDemande ? action.payload : x
      // );

      return {
        reponse: [action.payload, ...state.reponse],
        getReponse: '',
        getReponseError: '',
        postDemande: 'success',
        postDemandeError: ''
      };
    },
    [postReponse.rejected]: (state, action) => {
      return {
        ...state,
        getReponse: '',
        getReponseError: '',
        postDemande: 'rejected',
        postDemandeError: action.payload
      };
    }
  }
});

export default reponse.reducer;
