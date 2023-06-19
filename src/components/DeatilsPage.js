import React, { useEffect, useState } from "react";
import "../css/DeatilsPage.css";
import axios from "axios";
import { useParams } from "react-router-dom";

function DeatilsPage() {
	const { id } = useParams();
	const [pokemonData, setPokemonData] = useState();
	useEffect(() => {
		const handleSearch = async () => {
			// e.preventDefault();
			try {
				const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
				const species = await axios.get(response.data.species.url);

				// console.log(response);
				const emphtyObj = {};
				emphtyObj.name = response.data.name;
				emphtyObj.id = response.data.id;
				emphtyObj.height = response.data.height;
				emphtyObj.weight = response.data.weight;
				emphtyObj.type = response.data.types.map((val) => val.type);
				emphtyObj.color = species.data.color.name;
				emphtyObj.image = response.data.sprites.other.dream_world.front_default;
				emphtyObj.abilities = response.data.abilities.map((val) => val.ability.name);
				emphtyObj.stats = response.data.stats.map((val) => {
					if (val.stat.name == "hp" || "attack" || "defense" || "speed") {
						return { stat: val.base_stat, stateName: val.stat.name };
					}
				});
				emphtyObj.shape = species.data.shape.name;
				setPokemonData(emphtyObj);
			} catch (error) {
				console.log(error.message);
			}
		};
		handleSearch();
	}, []);
	console.log(pokemonData);
	return (
		<section className="container">
			{pokemonData && (
				<div className="wrapper">
					<div className="image">
						<img src={pokemonData.image} alt="pokemon-image"></img>
					</div>
					<h1>{pokemonData.name}</h1>
					<div className="info">
						<div className="item1 items">
							<p style={{ color: "white" }}>height:</p>
							{pokemonData.height}
						</div>
						<div className="item2 items">
							<p style={{ color: "white" }}>weight:</p>
							{pokemonData.weight}
						</div>
						<div className="item3 items">
							<p style={{ color: "white" }}>color:</p>
							{pokemonData.color}
						</div>
						<div className="item4 items">
							<p style={{ color: "white" }}>type:</p>
							{pokemonData.type.map((val, index) => {
								return <p>{val.name}</p>;
							})}
						</div>
					</div>
					<div className="abilities">
						<p>abilities</p>
						<div>
							{pokemonData.abilities.map((value, index) => (
								<span key={index}>{value}</span>
							))}
						</div>
					</div>
					<div className="weakness">
						<p>weakness</p>
						<div>
							{pokemonData.abilities.map((value, index) => (
								<span key={index}>{value}</span>
							))}
						</div>
					</div>

					<div className="stats">
						<div>
							{pokemonData.stats.map((val) => {
								return (
									<div className="indication-bar">
										<div className="indicator">{val.stat}%</div>
										<p style={{ color: "white", fontSize: "18px" }}>{val.stateName}</p>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			)}
		</section>
	);
}

export default DeatilsPage;
