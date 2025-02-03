export interface DataUser {
    id: number;
    email: string;
    verified: number;
    disabled: number;
    first_name?: string;
    last_name?: string;
    display_name?: string;
    theme?: string;
}

export const DefaultDataUser: DataUser = {
    id: 0,
    email: "",
    verified: 0,
    disabled: 0,
};
