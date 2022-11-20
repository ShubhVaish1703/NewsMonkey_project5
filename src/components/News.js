import React ,{useEffect,useState}from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


const News=(props)=> {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)




  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
 
  const updateNews = async()=> {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;

    setLoading(true)
    props.setProgress(30);
    let data = await fetch(url);
    let parseData = await data.json();
    props.setProgress(60);
    setArticles( parseData.articles)
    setTotalResults(parseData.totalResults)
    setLoading(false)
    props.setProgress(100);
    
  }

  useEffect(() => {
  document.title = `NewsMonkey - ${capitalizeFirstLetter(props.category)}`;
    updateNews();
    // eslint-disable-next-line
  }, [])


  const fetchMoreData =async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1)
      let data = await fetch(url);
      let parseData = await data.json();

      setArticles(articles.concat(parseData.articles))
      setTotalResults(parseData.totalResults)
  };

  
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{marginTop:'4.5rem'}}>
          NewsMonkey - Top {capitalizeFirstLetter(props.category)}{" "}
          Headlines
        </h1>
        {loading && <Spinner/>}
          <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={(articles.length !== totalResults)}
            loader={<Spinner/>}
          >
            <div className="container">
              <div className="row">
                {articles.map((element) => {
                  return (
                    <div key={element.url} className="col-md-4 my-3">
                      <NewsItem
                        title={element.title ? element.title : ""}
                        description={element.description ? element.description : ""}
                        imageUrl={
                          element.urlToImage
                            ? element.urlToImage
                            : "http://narayanahealth.com.bd/wp-content/uploads/2020/03/News.jpg"
                        }
                        newsUrl={element.url}
                        publish={element.publishedAt}
                        author={element.author ? element.author : "Unknown"}
                        source={element.source.name}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </InfiniteScroll>
        </div>
    );
  
}

News.defaultProps = {
  country: "in",
  pageSize: 6,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;

