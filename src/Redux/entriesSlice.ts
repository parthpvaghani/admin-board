import { sampleData } from '../Component/Mock/sampleData';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PriceTemplateItemReadDto } from '../Component/Mock/types';

interface EntriesState {
  entries: PriceTemplateItemReadDto[];
  selectedEntry: PriceTemplateItemReadDto | null;
}

const initialState: EntriesState = {
  entries: sampleData,
  selectedEntry: null,
};

const entriesSlice = createSlice({
  name: 'entries',
  initialState,
  reducers: {
    selectEntry: (state, action: PayloadAction<string>) => {
      state.selectedEntry = state.entries.find((entry) => entry.id === action.payload) || null;
    },
    addEntry: (state, action: PayloadAction<PriceTemplateItemReadDto>) => {
      const newEntry = action.payload;
      state.entries.push(newEntry);
    },
    saveChanges: (state, action: PayloadAction<PriceTemplateItemReadDto>) => {
      const updatedEntry = action.payload;
      state.entries = state.entries.map((entry) =>
        entry.id === updatedEntry.id ? updatedEntry : entry
      );
      state.selectedEntry = null;
    },
    deleteEntry: (state, action: PayloadAction<string>) => {
      const entryId = action.payload;
      state.entries = state.entries.filter((entry) => entry.id !== entryId);
      if (state.selectedEntry?.id === entryId) {
        state.selectedEntry = null;
      }
    },
  },
});

export const { selectEntry,  addEntry ,saveChanges ,deleteEntry} = entriesSlice.actions;
export default entriesSlice.reducer;
