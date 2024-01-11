import React, { ReactNode, createContext, useContext, useState } from "react";

interface UserContextType {
	headerSearchBar: string;
	setHeaderSearchBar: React.Dispatch<React.SetStateAction<string>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{children: ReactNode}> = ({ children }) => {
	const [headerSearchBar, setHeaderSearchBar] = useState<string>("");

	return (
		<UserContext.Provider value={{ headerSearchBar, setHeaderSearchBar }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUserContext = () => {
	const context = useContext(UserContext);
	if (context === undefined) {
		throw new Error("useUserContext must be used within a UserProvider");
	}
	return context;
};
