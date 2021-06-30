import React, { useState, useEffect } from "react";
import {
  fetchMovieDetail,
  fetchMovieVideos,
  fetchMovieCredits,
  fetchSimilarMovie,

} from "../../service";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import { Modal } from "react-bootstrap";
import ReactPlayer from "react-player";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import "../home/Aminition/Home.css";
import dateFormat from 'dateformat';


export function MovieDetail({ match }) {
  let params = match.params;
  let genres = [];
  const [isOpen, setIsOpen] = useState(false);
  const [detail, setDetail] = useState([]);
  const [video, setVideo] = useState([]);
  const [casts, setCasts] = useState([]);
  const [similarMovie, setSimilarMovie] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDetail(await fetchMovieDetail(params.id));
      setVideo(await fetchMovieVideos(params.id));
      setCasts(await fetchMovieCredits(params.id));
      setSimilarMovie(await fetchSimilarMovie(params.id));

    };

    fetchAPI();
  }, [params.id]);

  genres = detail.genres;

  const MoviePalyerModal = (props) => {
    const youtubeUrl = "https://www.youtube.com/watch?v=";
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ color: "#000000", fontWeight: "bolder" }}
          >
            {detail.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#000000" }}>
          <ReactPlayer
            className="container-fluid"
            url={youtubeUrl + video.key}
            playing
            width="100%"
          ></ReactPlayer>
        </Modal.Body>
      </Modal>
    );
  };

  let genresList;
  if (genres) {
    genresList = genres.map((g, i) => {
      return (
        <li className="list-inline-item" key={i}>
          <button type="button" className="btn btn-outline-info">
            {g.name}
          </button>
        </li>
      );
    });
  }


  const listCredits = casts.slice(0, 20).map((c, i) => {
    return (
      <div className="col-md-2 text-center" key={i}>
        <Link to={`/person/${c.id}`}>
          <img
            className="img-person"
            src={c.img}
            alt={c.name}
          />
        </Link>
        <p className="font-weight-bold text-center">{c.name}</p>
        <p
          className="font-weight-light text-center"
          style={{ color: "#5a606b" }}
        >
          {c.character}
        </p>
      </div>
    );
  });
  const similarMovieList = similarMovie.slice(0, 30).map((item, index) => {
    return (
      <div className="col-md-2 col-sm-6" key={index}>
        <div className="card-img">
          <Link to={`/movie/${item.id}`}>
            <img className="img-fluids" src={item.poster} alt={item.title}></img>
          </Link>
        </div>
        <div className="mt-3">
          <p style={{ fontWeight: "bolder" }}>{item.title}</p>
          <p>Rated: {item.rating}</p>
          <ReactStars
            count={item.rating}
            size={20}
            color1={"#f4c10f"}
          ></ReactStars>
        </div>
      </div>
    );
  });

  return (
    <div className="main-container">

      <div className="hearder">
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

      {/* Chi tiết phim */}
      <div className="movie-trailer">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <MoviePalyerModal
                show={isOpen}
                onHide={() => {
                  setIsOpen(false);
                }}
              ></MoviePalyerModal>
              <div className="text-center" style={{ width: "100%" }}>
                <img
                  className="img-fluid"
                  src={`http://image.tmdb.org/t/p/original/${detail.backdrop_path}`}
                  alt={detail.name}
                ></img>
                <div className="carousel-center">
                  <i
                    onClick={() => setIsOpen(true)}
                    className="far fa-play-circle"
                    style={{ fontSize: 95, color: "#f4c10f", cursor: "pointer" }}
                  ></i>
                </div>
                <div
                  className="carousel-caption"
                  style={{ textAlign: "center", fontSize: 40 }}
                >
                  {detail.name}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="detail-movie">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <p style={{ color: "#5a606b", fontWeight: "bolder", paddingTop: 20 }}>Thể Loại</p>
              <ul className="list-inline">{genresList}</ul>
            </div>
            <div className="col-md-4">
              <div className="first-date">
                <p style={{ color: "#5a606b", fontWeight: "bolder", paddingTop: 20 }}>Ngày phát hành</p>
                {dateFormat(detail.release_date)}
              </div>
            </div>
            <div className="col-md-4">
              <div className="first-date">
                <p style={{ color: "#5a606b", fontWeight: "bolder", paddingTop: 20 }}>Thời gian phát sóng</p>
                {detail.runtime} phút
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="test-rate">
                <p style={{ color: "#5a606b", fontWeight: "bolder", paddingTop: 20 }}>Đánh giá</p>
                <ReactStars
                  count={detail.vote_average}
                  size={20}
                  color1={"#f4c10f"}
                ></ReactStars>
              </div>
              <div className="test-count-rate">
                <p style={{ color: "#5a606b", fontWeight: "bolder", paddingTop: 20 }}>Thông kế đánh giá</p>
                {detail.vote_count} đánh giá
              </div>
            </div>
            <div className="col-md-4">
              <div className="vote">
                <p style={{ color: "#5a606b", fontWeight: "bolder", paddingTop: 20 }}>Phầm trăm Đánh giá</p>
                <div className="test-vote" style={{marginLeft: 50}}>
                  {detail.vote_average} %
                </div>

              </div>
            </div>
            <div className="col-md-4">
              <div className="revenue">
                <p style={{ color: "#5a606b", fontWeight: "bolder", paddingTop: 20 }}>Ngân sách</p>
                {detail.revenue}
              </div>
            </div>
          </div>
          <div className="oreview">
            <div className="row">
              <div className="col-md-12">
                <div className="mt-3">
                  <p style={{ color: "#5a606b", fontWeight: "bolder" }}>Mô Tả</p>
                  {detail.overview}
                </div>
              </div>
            </div>
          </div>
          <div className="detail-list-movie">
            <div className="row">
              <div className="col-md-8">
                <div className="tagline">
                  <p style={{ color: "#5a606b", fontWeight: "bolder", paddingTop: 20 }}>Khẩu hiệu</p>
                  {detail.tagline}
                </div>
              </div>
              <div className="col-md-4">
                <p style={{ color: "#5a606b", fontWeight: "bolder" }}>Trang chủ</p>
                <div className="btn-homegae">
                  <a href={`${detail.homepage}`} className="rainbow rainbow-1">Home page</a>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Danh sách tác giả */}

      <div className="person-list">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="person">
                <p style={{ color: "white", fontWeight: "bolder", margin: "20px auto" }}>Diễn viên</p>
                <div className="knowwn">
                  <div className="row">
                    <div className="list-person list-sroll">
                      {listCredits}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      {/* Phần hiện tại */}
      {/* <div className="person-list">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="person">
                <p style={{ color: "white", fontWeight: "bolder", margin: "20px auto" }}>Phần hiện tại</p>
              </div>
              <div className="person-session">
                {listSessionMovie}
              </div>
            </div>
          </div>
        </div>
      </div> */}


      {/* Danh sách phim tương tự */}
      <div className="person-list">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="person">
                <p style={{ color: "white", fontWeight: "bolder", margin: "20px auto" }}>Các phim liên quan</p>
                <div className="knowwn">
                  <div className="row">
                    <div className="list-similar list-sroll">
                      {similarMovieList}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="footer">
        <hr className="mt-5" style={{ borderTop: "5px solid #5a606b" }}></hr>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-sm-6">
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
            <div className="col-md-4 col-sm-6">
              <h3>KEEP IN TOUCH</h3>
              <ul className="list-unstyled">
                <li>
                  <p>
                    <strong>
                      <i className="fas fa-map-marker-alt"></i> Address:
                    </strong>{" "}
                    city, state, country
                  </p>
                </li>
                <li>
                  <p>
                    <strong>
                      <i className="fas fa-map-marker-alt"></i> Phone:
                    </strong>{" "}
                    +01 00 00 00
                  </p>
                </li>
                <li>
                  <p>
                    <strong>
                      <i className="fas fa-envelope"></i> Email:
                    </strong>{" "}
                    info@infomail.com
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
