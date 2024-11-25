export type JobProps = {
    id: number;
    title: String;
    description: String;
    date: String;
    phone: String;
    status: String;
    company: String;
};

export type RootStackParamList = {
    Login: undefined;
    FormScreen: undefined;
    Home: undefined;
    Profile: undefined;
    Details: { id: number };
};