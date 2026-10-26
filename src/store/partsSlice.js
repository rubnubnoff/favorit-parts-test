import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchManufacturers, fetchAnalogs } from '@/api/favoritApi';

const handleThunkError = (error, rejectWithValue) => {
  if (error.name === 'CanceledError' || error.message === 'canceled') {
    return rejectWithValue({ canceled: true });
  }
  return rejectWithValue(error.message);
};

export const getManufacturers = createAsyncThunk(
  'parts/getManufacturers',
  async ({ article, signal }, { rejectWithValue }) => {
    try {
      return await fetchManufacturers(article, signal);
    } catch (error) {
      return handleThunkError(error, rejectWithValue);
    }
  }
);

export const getAnalogs = createAsyncThunk(
  'parts/getAnalogs',
  async ({ article, brand, signal }, { rejectWithValue }) => {
    try {
      return await fetchAnalogs(article, brand, signal);
    } catch (error) {
      return handleThunkError(error, rejectWithValue);
    }
  }
);

const partsSlice = createSlice({
  name: 'parts',
  initialState: {
    article: '',
    manufacturers: [],
    analogs: [],
    selectedBrand: null,
    loadingManufacturers: false,
    loadingAnalogs: false,
    error: null,
  },
  reducers: {
    setArticle: (state, action) => {
      state.article = action.payload;
      state.manufacturers = [];
      state.analogs = [];
      state.selectedBrand = null;
      state.error = null;
      if (!action.payload) {
        state.loadingManufacturers = false;
        state.loadingAnalogs = false;
      }
    },
    setSelectedBrand: (state, action) => {
      state.selectedBrand = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearAnalogs: (state) => {
      state.analogs = [];
      state.selectedBrand = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getManufacturers.pending, (state) => {
        state.loadingManufacturers = true;
        state.error = null;
      })
      .addCase(getManufacturers.fulfilled, (state, action) => {
        state.loadingManufacturers = false;
        state.manufacturers = action.payload;
        if (action.payload.length === 0) {
          state.error = 'По вашему артикулу ничего не найдено.';
        }
      })
      .addCase(getManufacturers.rejected, (state, action) => {
        if (action.payload?.canceled) return;
        state.loadingManufacturers = false;
        state.error = action.payload;
      })
      .addCase(getAnalogs.pending, (state) => {
        state.loadingAnalogs = true;
        state.error = null;
      })
      .addCase(getAnalogs.fulfilled, (state, action) => {
        state.loadingAnalogs = false;
        state.analogs = action.payload;
      })
      .addCase(getAnalogs.rejected, (state, action) => {
        if (action.payload?.canceled) return;
        state.loadingAnalogs = false;
        state.error = action.payload;
      });
  },
});

export const { setArticle, setSelectedBrand, clearError, clearAnalogs } = partsSlice.actions;
export default partsSlice.reducer;