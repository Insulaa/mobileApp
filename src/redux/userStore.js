const userSlice = createSlice({
  name: 'userStore',
  initialState: userInitialState,
  reducers: {},
});

const userActionsCreators = userSlice.actions;

export const {reducer} = userSlice;

export const actions = {};
