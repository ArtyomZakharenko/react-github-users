import { Info, Navbar, Repos, Search, User } from "../components";
import { GithubContext } from "../context/context";
import { useContext } from "react";
import loadingImage from '../images/preloader.gif';

const Dashboard = () => {
	const { isLoading } = useContext(GithubContext) as { isLoading: boolean };
	if (isLoading) {
		return (
			<main>
				<Navbar />
				<Search />
				<img src={loadingImage} className='loading-img' alt='loding' />
			</main>
		);
	}
	return (
		<main>
			<Navbar></Navbar>
			<Search />
			<Info />
			<User />
			<Repos />
		</main>
	);
};

export default Dashboard;
