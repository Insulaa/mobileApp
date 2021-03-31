import UserService, {User} from '../api/userService'
import { AppThunk } from './store'

const doRegisterUserAsync = (props: {
    first_name: string; 
    last_name: string; 
    password: string; 
    email: string; 
    phone_number: string;
    userService: UserService;
}) : AppThunk => async (dispatch) => {
    const {
        first_name, last_name, password, email, phone_number, userService
    } = props;
    try {
        const response = await userService.registerUser({
            first_name,
            last_name,
            password,
            email, 
            phone_number
        });
    }
}