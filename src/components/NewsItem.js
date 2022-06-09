import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let { title, description, imgUrl, newsUrl, author, date,source } = this.props
    return (

      <>
        <div className='my-3'>
          <div className="card mx-3" style={{width:"auto"}}>
            <div style={{display:'flex',justifyContent:'flex-end',position:'absolute',right:'0'}}>
            <span className=" badge rounded-pill bg-danger" >{source}</span>
            </div>
            <img src={!imgUrl ? 'https://www.nasa.gov/sites/default/files/thumbnails/image/bg.jpeg' : imgUrl} className="card-img-top" alt="img" />
            <div className="card-body">
              <h5 className="card-title">{title}...</h5>
              <p className="card-text">{description}...</p>
              <p className="card-text"><small className="text-muted">By {!author ? "unknown" : author} on {new Date(date).toGMTString()}</small></p>
              <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read More</a>
            </div>
          </div>
        </div>
      </>
    )
  }
}
