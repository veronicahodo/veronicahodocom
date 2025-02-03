import { DataUserInfo, DefaultDataUserInfo } from "./DataUserInfo";

export interface DataUser {
    id: number;
    email: string;
    verified: number;
    disabled: number;
    userInfo?: DataUserInfo;
}

export const DefaultDataUser: DataUser = {
    id: 0,
    email: "",
    verified: 0,
    disabled: 0,
    userInfo: DefaultDataUserInfo,
};
