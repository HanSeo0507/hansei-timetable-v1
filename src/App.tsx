import React from "react";
import { CookiesProvider } from "react-cookie";

import Router from "src/routes";
import AuthProvider from "src/Auth";
import { GlobalStyled } from "src/components";

const App: React.FC = () => {
	return (
		<CookiesProvider>
			<GlobalStyled />
			<AuthProvider>
				<Router />
			</AuthProvider>
		</CookiesProvider>
	);
};

export default App;
