import React, { useContext } from "react";
import { Route, RouteComponentProps, Redirect } from "react-router-dom";

import { AuthContext } from "src/Auth";
import { validatorUser } from "src/utils";

interface IPrivateRouteProps {
	component: React.FC<RouteComponentProps>;
	path: string;
	exact?: boolean;
}

const PrivateRoute: React.FC<IPrivateRouteProps> = ({ component: Component, path, exact }) => {
	const user = useContext(AuthContext);

	return (
		<Route
			exact={exact}
			path={path}
			render={(props: RouteComponentProps) => {
				const isCorrect = validatorUser(user);
				return isCorrect ? <Component {...props} /> : <Redirect to={{ pathname: "/login" }} />;
			}}
		/>
	);
};

export default PrivateRoute;
