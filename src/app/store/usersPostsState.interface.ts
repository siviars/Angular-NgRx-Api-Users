import { User } from "src/app/store/user.interface";

export interface UsersPostsStateInterface {
    isLoading: boolean;
    users: User[];
    error: string | null;
}