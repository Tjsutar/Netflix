import React, { useEffect, useState } from "react";
import "./Home.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { BiPlay} from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";

const apikey = "0a190d81d7414661053c7431e0c69bfe";
//const apikey = "d94e6bd1a3fbc2771ce1730336e44b17";
const url = "https://api.themoviedb.org/3/movie";
const imgUrl = "https://image.tmdb.org/t/p/original";
const upcoming = "upcoming";
const topRated= "top_rated";//https://api.themoviedb.org/3/movie/top_rated?api_key=<<api_key>>&language=en-US&page=1
const popular= "popular";//https://api.themoviedb.org/3/movie/popular?api_key=<<api_key>>&language=en-US&page=1
const nowPlaying = "now_playing";//https://api.themoviedb.org/3/movie/now_playing?api_key=<<api_key>>&language=en-US&page=1
const Card = ({ img }) => <img className="card" src={img} alt="cover" />;

const Row = ({ title, arr = [] }) => (
  <div className="row">
    <h2>{title}</h2>
    <div>
      { arr.map((item, index) => (
        <Card key={index} img={`${imgUrl}/${item.poster_path}`} />
      ))}
      
    </div>
    <hr/>
  </div>
);
const Home = () => {
  const [upcommingMovies, setUpcommingMovies] = useState([]);
  const [TopratedMovies , setTopRatedMovies] = useState([]);
  const [NowPlayingMovies , setNowPlayingMovies] = useState([]);
  const [popularMovies , setPopularMovies] = useState([]);
  const [genre,setGenre] = useState([]);
  useEffect(() => {
    const fetchUpcomming = async () => {   
       const { data } = await axios.get(`${url}/${upcoming}?api_key=${apikey}`);
      setUpcommingMovies(data.results);
    };

    const fetchTopRated = async () => {
        const {data} = await axios.get(`${url}/${topRated}?api_key=${apikey}`);
      setTopRatedMovies(data.results);
    };

    const fetchNowPlaying = async () =>{
        const {data} = await axios.get(`${url}/${nowPlaying}?api_key=${apikey}`);
      setNowPlayingMovies(data.results);
    };

    const fetchPopular = async() =>{
        const {data} = await axios.get(`${url}/${popular}?api_key=${apikey}&page=2`);
      setPopularMovies(data.results);
    };

    
//https://api.themoviedb.org/3/movie/now_playing?api_key=0a190d81d7414661053c7431e0c69bfe&language=en-US&page=1


    const getAllGenre = async() =>{
      const{
        data:{genres}
      } = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=0a190d81d7414661053c7431e0c69bfe&language=en-US`);
      setGenre(genres);
      console.log(genres);
    };  

    getAllGenre();

    fetchUpcomming();
    fetchTopRated();
    fetchNowPlaying();
    fetchPopular();
  }, []);
  return (
    <section className="home">
          <div className="banner" style={{
            backgroundImage:popularMovies[0] ? `url(${`${imgUrl}/${popularMovies[0].poster_path}`})`: "rgb(16,16,16)",
          }} >
                  {popularMovies[0] &&<h1> {popularMovies[0].title}</h1>}
                  {popularMovies[0] &&<p> {popularMovies[0].overview} </p>}

              <div className="btns">
                <button><BiPlay/>Play</button>
                <button>My list<AiOutlinePlus/></button>
              </div>

        </div>
      <Row title={"Upcomming Movies"} arr={upcommingMovies} />
      <Row title={"Top Rated"} arr={TopratedMovies} />
      <Row title={"Now Playing"} arr={NowPlayingMovies} />
      <Row title={"Popular"} arr={popularMovies} />

      <div className="genreBox">
      
          { genre.map((item) => (
                        
            <Link key={item.id} to={`/genre/${item.id}`} >{item.name}</Link>
             
          ))}
      </div>
    </section>
  );
};

export default Home;
