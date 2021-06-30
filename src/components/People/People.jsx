import React, { useState, useEffect } from "react";
import {
    // fetchMovieDetail,
    fetchPeople,
} from "../../service";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import { Link } from "react-router-dom";
import "./People.css";


export function People({ match }) {
    // let params = match.params;
    // const [setDetail] = useState([]);
    const [people, setPeople] = useState([]);
    useEffect(() => {
        const fetchAPI = async () => {
            // setDetail(await fetchMovieDetail(params.id));

            setPeople(await fetchPeople(28));
        };
        fetchAPI();
    }, []);

    const peopleList = people.slice(0, 20).map((value, i) => {
        return (
            <div className="col-md-3 col-sm-6" key={i}>
                <div className="cards-img">
                    <Link to={`/person/${value.id}`}>
                        <img className="images" src={value.img} alt={value.title}></img>
                    </Link>
                    <div className="overlay">
                        <a className="text" href={`/person/${value.id}`}>{value.title}</a>
                    </div>
                </div>
                <div className="d">
                    {value.name}
                </div>
            </div>
        );
    });






    return (

        <div className="main-container">
            <div className="header">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <nav>
                                <ul className="menu">
                                    <li className="nav-hover"><a href="/">Home</a></li>
                                    <li className="nav-hover"><a href="/trending/all/day">Trending</a></li>
                                    <li className="nav-hover"><a href="/discover/tv">TV Shows</a></li>
                                    <li className="nav-hover"><a href="/people/popular">People</a></li>
                                    <li className="nav-hover"><a href="/search">Search</a></li>
                                </ul>
                            </nav>
                        </div>


                    </div>
                </div>
            </div>

            <div className="list-people">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="list-movie">
                                <div className="row">
                                    {peopleList}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <hr className="mt-5" style={{ borderTop: "1px solid #5a606b" }}></hr>
            <div className="container">
                <div className="row mt-3 mb-5">
                    <div className="col-md-8 col-sm-6" style={{ color: "#5a606b" }}>
                        <h3>ABOUT ME</h3>
                        <p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi
                            error earum perspiciatis praesentium sint ipsum provident blanditiis
                            pariatur necessitatibus voluptas, cum, atque iste eligendi autem,
                            culpa cupiditate placeat facilis repellat.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus,
                            perspiciatis? Numquam, enim illo voluptatum neque facere aut sed ut
                            dolore nihil? Nulla sit, recusandae ea tenetur rerum deserunt sequi
                            earum?
                        </p>
                        <div className="button">
                            <div className="icon">
                                <i className="fab fa-facebook"></i>
                            </div>
                            <span>Facebook</span>
                        </div>
                        <div className="button">
                            <div className="icon">

                                <i className="fab fa-instagram"></i>

                            </div>
                            <span>Instagram</span>
                        </div>
                        <div className="button">
                            <div className="icon">

                                <i className="fab fa-twitter"></i>
                            </div>
                            <span>Twitter</span>
                        </div>

                        <div className="button">
                            <div className="icon">
                                <i className="fab fa-youtube"></i>
                            </div>
                            <span>Youtube</span>
                        </div>
                    </div>


                    <div className="col-md-4 col-sm-6" style={{ color: "#5a606b" }}>
                        <h3>KEEP IN TOUCH</h3>
                        <ul className="list-unstyled">
                            <li>
                                <p>
                                    <strong>
                                        <i className="fas fa-map-marker-alt"></i> Address:
                                    </strong>{" "}
                                    HoChiMinh city
                                </p>
                            </li>
                            <li>
                                <p>
                                    <strong>
                                        <i className="fas fa-map-marker-alt"></i> Phone:
                                    </strong>{" "}
                                    +84939461842
                                </p>
                            </li>
                            <li>
                                <p>
                                    <strong>
                                        <i className="fas fa-envelope"></i> Email:
                                    </strong>{" "}
                                    ngoctam2303001@gmail.com
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>


        </div>
    );
}
