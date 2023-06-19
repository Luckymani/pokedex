import React, { useState, useEffect, useRef } from "react";
import "../css/ListPage.css";
import axios from "axios";
import Card from "./Card";
import { useNavigate } from "react-router-dom";

function FavouritePage() {
	const [pokemonList, setPokemonList] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		try {
			async function fetchData() {
				const array = JSON.parse(localStorage.getItem("favArray"));
				console.log(array);

				for (let i = 0; i < array.length; i++) {
					// console.log("hello");
					const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${array[i]}`);
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
					setPokemonList((prev) => [...prev, emphtyObj]);
				}
			}
			fetchData();
		} catch (err) {
			console.log(err.message);
		}
	}, []);
	// useEffect(() => {
	// 	const debouncingFun = function () {
	// 		clearTimeout(timeOutRef.current);
	// 		const condition = document.documentElement.scrollHeight - (window.innerHeight + window.scrollY);
	// 		console.log(`${document.documentElement.scrollHeight}-${window.innerHeight}+${window.scrollY}`);
	// 		console.log(condition);
	// 		if (condition > 20) {
	// 			return;
	// 		}
	// 		timeOutRef.current = setTimeout(() => {
	// 			setFetch((prev) => prev + 1);
	// 		}, 500);
	// 	};
	// 	document.addEventListener("scroll", debouncingFun);
	// 	return () => {
	// 		document.removeEventListener("scroll", debouncingFun);
	// 	};
	// }, [scroll]);

	const handleButtonClick = (event) => {
		if (event.target.tagName === "BUTTON") {
			const buttonId = event.target.id;
			console.log(`Button ${buttonId} clicked!`);
			navigate(`/deatilspage/${buttonId}`);
		}
	};
	return (
		<section className="list-page" onClick={handleButtonClick}>
			{pokemonList.length > 0 &&
				pokemonList.map((pokemonData, index) => {
					return <Card key={index} pokemonData={pokemonData}></Card>;
				})}
		</section>
	);
}

export default FavouritePage;
