import { User } from "src/users/user.entity"

export type AuthReqType = {
    user: Omit<User, 'senha'>
}