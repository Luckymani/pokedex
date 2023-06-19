import React, { useState, useEffect } from "react";
import "../css/Card.css";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

function Card(props) {
	let { pokemonData } = props;
	const [liked, setLiked] = useState(false);

	const checkIfLiked = () => {
		const string = localStorage.getItem("favArray");
		if (!string) return;
		const favArray = JSON.parse(string);
		console.log(favArray);
		for (let i of favArray) {
			if (i === pokemonData.name) {
				setLiked(true);
				break;
			} else {
				setLiked(false);
			}
		}
	};
	useEffect(() => {
		checkIfLiked();
		console.log("helo");
	}, [pokemonData, liked]);

	console.log(liked, "liked");

	const addToFav = (name) => {
		const string = localStorage.getItem("favArray");

		if (string) {
			const favArray = JSON.parse(string);
			favArray.push(name);
			const stringform = JSON.stringify(favArray);
			localStorage.setItem("favArray", stringform);
			setLiked(true);
			console.log(string, favArray);
		} else {
			const favArray = [];
			favArray.push(name);
			const stringform = JSON.stringify(favArray);

			localStorage.setItem("favArray", stringform);
			setLiked(true);
		}
	};
	const removeFromFav = (name) => {
		const string = localStorage.getItem("favArray");

		const favArray = JSON.parse(string);
		const index = favArray.indexOf(name);
		// console.log("hello");
		favArray.splice(index, 1);
		const stringform = JSON.stringify(favArray);
		localStorage.setItem("favArray", stringform);
		setLiked(false);
		console.log(string, favArray);
	};

	// console.log(pokemonData);

	return (
		<div className="container">
			<div className="card">
				<div className="background-clip" style={{ background: pokemonData.color }}></div>
				<div className="imgBx">{<img src={pokemonData.image} />}</div>
				<div className="contentBx">
					<h2>
						{pokemonData.name} #{pokemonData.id}
					</h2>
					<div className="id">
						<p style={{ color: pokemonData.color }}>abilities:-</p>
						<div>
							{pokemonData.abilities.map((val, index) => (
								<span key={index}>{val}</span>
							))}
						</div>
					</div>
					<button id={pokemonData.id}>know more</button>
				</div>
				<div className="icons">
					{liked ? (
						<AiFillHeart
							className="icon"
							onClick={() => {
								removeFromFav(pokemonData.name);
							}}
						/>
					) : (
						<AiOutlineHeart
							className="icon"
							onClick={() => {
								addToFav(pokemonData.name);
							}}></AiOutlineHeart>
					)}
				</div>
			</div>
		</div>
	);
}

export default Card;
