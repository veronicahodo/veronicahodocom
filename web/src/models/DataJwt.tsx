export interface DataJwt {
    user_id: string;
    first_name: string;
    last_name: string;
    display_name: string;
    email: string;
    roles: string[];
    exp: number;
    iat: number;
}

export const DefaultDataJwt: DataJwt = {
    user_id: "",
    first_name: "",
    last_name: "",
    display_name: "",
    email: "",
    roles: [],
    exp: 0,
    iat: 0,
};
