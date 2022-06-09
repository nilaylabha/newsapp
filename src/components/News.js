import React, { Component } from 'react'
import axios from 'axios';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from 'prop-types';

export default class News extends Component {

  

  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general"
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props)
    this.state = {

      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)}-NewsForYou`
  }

  // API PASS USING FETCH API

  // async componentDidMount(){
  //   let url="https://newsapi.org/v2/top-headlines?country=${this.props.country}&country=${this.props.category}&apiKey=4948a030da3a4344b7a678d5ac469630&page=1";
  //   let data= await fetch(url);
  //   let parseData= await data.json()
  //   this.setState({articles: parseData.articles})
  // }


  // API PASS USING axios API

  componentDidMount() {
    axios.get(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pagesize=${this.props.pageSize}`)
    
      .then(response => {
        this.setState({ loading: true })
        const posts = response.data;
        this.setState({ articles: posts.articles, totalResults: posts.totalResults, loading: false });
      })
  }

  // handlePreclick = async () => {
  //   console.log("previous")
  //   axios.get(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4948a030da3a4344b7a678d5ac469630&page=${this.state.page - 1}&pagesize=${this.props.pageSize}`)

  //     .then(response => {
  //       this.setState({ loading: true })
  //       const posts = response.data;
  //       this.setState({
  //         page: this.state.page - 1,
  //         articles: posts.articles,
  //         loading: false,
  //         totalResults:posts.totalResults

  //       })
  //     })
  // }

  // handleNextclick = async () => {
  //   console.log("next")
  //   if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {

  //   }
  //   else {
  //     axios.get(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4948a030da3a4344b7a678d5ac469630&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`)

  //       .then(response => {
  //         this.setState({ loading: true })
  //         const posts = response.data;
  //         this.setState({
  //           page: this.state.page + 1,
  //           articles: posts.articles,
  //           loading: false,
  //           totalResults:posts.totalResults
  //         })
  //       })
  //   }

  // }

  fetchMoreData = () => {
    this.setState({ page: this.state.page + 1 })
    axios.get(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`)

      .then(response => {
        this.setState({ loading: true })
        const posts = response.data;
        this.setState({
          page: this.state.page + 1,
          articles: this.state.articles.concat(posts.articles),
          totalResults: posts.totalResults,
          loading: false,
        })
      })
  };

  render() {
    return (
      <>
        {/* headline of news items */}

        <h1 className='my-5 text-center text-decoration-underline'>NewsForYou - Top {this.capitalizeFirstLetter(this.props.category)} Headlines </h1>

        {/* Pass spinner Component */}
        {this.state.loading && <Spinner />}

        {/* New items container */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container my-3">
            <div className="row">
              {this.state.articles.map((element) => {

                return <div className="col-md-4" key={element.url}>
                  <NewsItem title={element.title ? element.title.slice(0, 30) : ""} description={element.description ? element.description.slice(0, 70) : ""} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* Button for previous and next? */}
        {/* <div className='container d-flex justify-content-between'>
            <button disabled={this.state.page <= 1} type="button" className="btn btn-dark mx-2" onClick={this.handlePreclick}> &larr; Previous</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextclick}>Next &rarr;</button>
          </div> */}


      </>
    )
  }
}
