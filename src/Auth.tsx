import React, { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

type IUser = {
	_class?: "H11" | "H12" | "H13" | "G11";
	number?: number;
	name?: string;
};

const AuthContext = createContext<IUser>({});

const AuthProvider: React.FC = (props) => {
	// eslint-disable-next-line
	const [cookies, setCookies] = useCookies(["userInfo"]);
	const [user, setUser] = useState({});
	const [init, setInit] = useState(false);

	useEffect(() => {
		if (cookies.userInfo) setUser(cookies.userInfo);
		setInit(true);
		// eslint-disable-next-line
	}, []);

	return <AuthContext.Provider value={user}>{init && props.children}</AuthContext.Provider>;
};

export default AuthProvider;
export { AuthContext };
