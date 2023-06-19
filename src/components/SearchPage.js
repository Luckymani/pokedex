import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "../css/SearchPage.css";
import { RiSearchLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Card from "./Card";

function SearchPage(props) {
	const { searchList } = props;
	const navigate = useNavigate();
	const [pokemonName, setPokemonName] = useState("");
	const [sorted, setSorted] = useState([]);
	const [showsuggestions, setShowSuggestions] = useState(false);
	const [showCard, setShowCard] = useState(false);
	const timeOutRef = useRef();
	const inputRef = useRef(null);
	const listRef = useRef(null);
	const [pokemonData, setPokemonData] = useState("");
	useEffect(() => {
		inputRef.current.focus();
		function closeFun(e) {
			if (!e.target.contains(inputRef.current) || e.target.contains(listRef.current)) return setShowSuggestions(false);
		}
		document.addEventListener("click", closeFun);
		return () => {
			document.removeEventListener("click", closeFun);
		};
	}, []);

	const handleSearch = async () => {
		// e.preventDefault();
		try {
			const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
			const species = await axios.get(response.data.species.url);

			// console.log(response);
			const emphtyObj = {};
			emphtyObj.name = response.data.name;
			emphtyObj.id = response.data.id;
			emphtyObj.color = species.data.color.name;
			emphtyObj.image = response.data.sprites.other.dream_world.front_default;
			emphtyObj.abilities = response.data.abilities.map((val) => val.ability.name);
			emphtyObj.stats = response.data.stats.map((val) => {
				return { stat: val.base_stat, stateName: val.stat.name };
			});
			emphtyObj.shape = species.data.shape.name;
			setPokemonData(emphtyObj);
		} catch (error) {
			console.log(error.message);
		}
	};

	// console.log(pokemonData);
	const debouncingFun = function () {
		clearTimeout(timeOutRef.current);
		timeOutRef.current = setTimeout(() => {
			filterSearchList();
		}, 400);
	};

	function filterSearchList() {
		const listed = searchList.filter((value) => value.includes(pokemonName));

		listed.sort((a, b) => {
			const aIndex = a.indexOf(pokemonName);
			const bIndex = b.indexOf(pokemonName);

			if (aIndex === bIndex) {
				return a.localeCompare(b);
			}

			return aIndex - bIndex;
		});

		//   return listed;
		setSorted(listed);
	}

	const handleKeyPress = (event) => {
		if (event.key === "Enter") {
			handleSearch();
		}
	};

	return (
		<section className="search-page">
			<div className="search-bar">
				<input type="text" value={pokemonName} onChange={(e) => setPokemonName(e.target.value)} placeholder="Search Pokémon name or by number" onKeyUp={() => debouncingFun()} onFocus={() => setShowSuggestions(true)} ref={inputRef} onKeyDown={handleKeyPress} />
				<button onClick={() => handleSearch()}>
					<RiSearchLine className="search-icon" />
				</button>
			</div>
			{/* {isLoading && <p>Loading...</p>}
			{error && <p>{error}</p>} */}
			{sorted.length > 0 && showsuggestions && (
				<ul className="search-result" ref={listRef}>
					{sorted.map((value, index) => {
						return (
							<li
								key={index}
								onClick={() => {
									setPokemonName(value);
								}}>
								{value}
							</li>
						);
					})}
				</ul>
			)}
			{pokemonData ? (
				<div className="card-wrapper">
					<Card pokemonData={pokemonData} />
				</div>
			) : (
				<div className="headding-wrapper">
					<h1 className={`headding ${showsuggestions && sorted.length > 0 && "dull"}`}>SEARCH POKEMON BY NAME</h1>
				</div>
			)}

			<button className="button" onClick={() => navigate("/pokemon-list")}>
				see all pokemons
			</button>
		</section>
	);
}

export default SearchPage;
