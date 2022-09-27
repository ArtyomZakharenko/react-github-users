import { useContext } from "react";
import styled from 'styled-components';
import { GithubContext } from "../context/context";
import { Repository } from "../models/repository";
import { Pie, Column, Bar, Doughnut } from './Charts';


interface Language {
	[key: string]: { label: string; value: number; stars: number };
}

interface Star {
	label: string;
	value: number;
}

const Repos = () => {
	const { repos } = useContext(GithubContext) as { repos: Repository[] };

	const languages = repos.reduce((total: Language, item: Repository) => {
		const { language, stargazers_count } = item;
		if (!language) return total;
		if (!total[language]) {
			total[language] = { label: language, value: 1, stars: stargazers_count };
		} else {
			total[language] = {
				...total[language],
				value: total[language].value + 1,
				stars: total[language].stars + stargazers_count,
			};
		}
		return total;
	}, {} as Language);

	const mostUsed = Object.values(languages)
		.sort((a, b) => {
			return b.value - a.value;
		})
		.slice(0, 5);

	const mostPopular = Object.values(languages)
		.sort((a, b) => {
			return b.stars - a.stars;
		})
		.map((item) => {
			return { ...item, value: item.stars };
		})
		.slice(0, 5);

	let { stars, forks } = repos.reduce(
		(total: any, item) => {
			const { stargazers_count, name, forks } = item;
			total.stars[stargazers_count] = { label: name, value: stargazers_count };
			total.forks[forks] = { label: name, value: forks };

			return total;
		},
		{
			stars: {},
			forks: {},
		}
	);
	stars = Object.values(stars).slice(-5).reverse();
	forks = Object.values(forks).slice(-5).reverse();

	return (
		<section className='section'>
			<Wrapper className='section-center'>
				<Pie data={mostUsed} />
				<Column data={stars} />
				<Doughnut data={mostPopular} />
				<Bar data={forks} />
			</Wrapper>
		</section>
	);
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }

  .fusioncharts-container {
    width: 100% !important;
  }

  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
