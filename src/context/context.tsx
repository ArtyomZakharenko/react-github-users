import { createContext, ReactNode, useState } from 'react';
import mockUser from "./mockData/mockUser";
import mockRepos from "./mockData/mockRepos";
import mockFollowers from "./mockData/mockFollowers";

const rootUrl = 'https://api.github.com';

const GithubContext = createContext(null);

const GithubProvider = ({ children }: { children: ReactNode }) => {
	const [githubUser, setGithubUser] = useState(mockUser);
	const [repos, setRepos] = useState(mockRepos);
	const [followers, setFollowers] = useState(mockFollowers);

	return <GithubContext.Provider value={{
		githubUser,
		repos,
		followers
	}}>
		{children}
	</GithubContext.Provider>
}

export { GithubContext, GithubProvider }

