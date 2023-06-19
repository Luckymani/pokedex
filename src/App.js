import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import SearchPage from "./components/SearchPage";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ListPage from "./components/ListPage";
import DeatilsPage from "./components/DeatilsPage";
import FavouritePage from "./components/Favorates";

function App() {
	const [searchList, setSearchList] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		async function getSearchList() {
			await axios
				.get("https://pokeapi.co/api/v2/pokedex/1")
				.then((res) => {
					// console.log(res);
					const namesArray = [];
					res.data.pokemon_entries.forEach((element) => {
						namesArray.push(element.pokemon_species.name);
					});
					setSearchList(namesArray);
				})
				.catch((err) => window.alert("something went wrong"));
		}
		getSearchList();
	}, []);
	return (
		<div className="App">
			<div className="headder">
				<div className="logo" onClick={() => navigate("/")}>
					<span>
						<img style={{ width: "50px", height: "50px" }} src={"/images/pokemon-symbol-logo-png-31.png"} alt="logo"></img>
					</span>
					<h2>pokedex</h2>
				</div>
				{/* <h1>Search your pokemon</h1> */}
				<span className="nav-links">
					<h3 onClick={() => navigate("/pokemon-list")}>list</h3>
					<h3 onClick={() => navigate("/favourite")}>favouriate</h3>
				</span>
			</div>
			<div className="background-layer">
				<img src={"/images/pokemon-1.png"} alt="background"></img>
			</div>
			<Routes>
				<Route path="/" element={<SearchPage searchList={searchList} />}></Route>
				<Route path="/pokemon-list" element={<ListPage></ListPage>}></Route>
				<Route path="/deatilspage/:id" element={<DeatilsPage />}></Route>
				<Route path="/favourite" element={<FavouritePage />}></Route>
			</Routes>
		</div>
	);
}

export default App;
