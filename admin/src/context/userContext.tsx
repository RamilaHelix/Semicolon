import * as React from 'react';

import { User } from '../model/User.model';

interface UserContextData {
    user?: User;
}


export interface UserContext extends UserContextData {
    updateData: (update: User) => void;
}

const Context = React.createContext<UserContext>({ updateData: () => { } });
export const useUserContext = () => React.useContext(Context);


export const UserProvider: React.FC<UserContextData> = (props: any) => {

    const [user, setData] = React.useState<User>(props.user || {});
    React.useEffect(() => {
        if (props.user)
            setData(props.user);
    }, [props.user]);

    const updateData = React.useCallback((update: Partial<User>) => {
        const newData = {
            ...user,
            ...update
        };
        setData(newData);
    }, [user]);

    return (
        <Context.Provider value={{
            user,
            updateData
        }}>
            {props.children}
        </Context.Provider>
    );
}
