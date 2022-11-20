import React from "react";

const NewsItem=(props)=> {
    let {title , description ,imageUrl ,newsUrl,publish,author,source}=props;
    return (
      <div className="my-3">
        <div className="card">
          <img src={imageUrl} className="card-img-top" alt="..."  />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <h6><span className="badge text-bg-danger">{source}</span></h6>
            <p className="information text-muted"><strong><i>Author : {author}</i></strong><br/>
            <strong><i>Published At : {new Date(publish).toGMTString()}</i></strong> </p>
            <p className="card-text">
              {description}
            </p>
            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-dark btn-sm">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
}

export default NewsItem;
