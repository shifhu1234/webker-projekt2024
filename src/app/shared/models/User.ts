export interface User {
    id: string;
    email: string;
    username: string;
    //password: string;
    name: {
        firstname: string;
        lastname: string;
    };
    points: number;
}
