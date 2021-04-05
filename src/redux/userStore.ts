import UserService, {User} from '../api/userService'
import { AppThunk } from './store'
import { strictEqual } from 'assert';

export type UserDataState = {
    user: User;
    token: string;
    isLoading: boolean;
    error: string | null;
};

const userInitialState: UserDataState = {
    user: {
        id: -1,
        first_name: '',
        last_name: '',
        password: '',
        email: '',
        phone_number: '',
    },
    token: "",
    isLoading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'userStore',
    initialState: userInitialState,
    reducers: {
        doSetUserFetchInProgress(state: UserDataState) {
            state.isLoading = true;
            state.error = null;
        }
        doSetUser(state: )
    }
})