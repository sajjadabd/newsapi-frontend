import React, { useState, useEffect } from 'react';
import { Divider } from 'antd';
import axios from 'axios';
import { getUserArticles } from '../services/api';

import { Badge, Card, Skeleton , Col, Row } from 'antd';
import { ContentLoader, Spinner } from '../components/Loader/Loader';
import NewsFeedLoader from '../components/Loader/NewsFeedLoader';

const { Meta } = Card;


interface ArticleType {
  id : number ,
  title : string ,
  description : string ,
  source : string ,
}

export default function Home () {
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state
  

  useEffect(() => {
    // Fetch user preferences and articles when the component mounts
    const access_token = localStorage.getItem('access_token'); // Assuming you have a way to get the access token

    axios.post( getUserArticles , null, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    .then(response => {
      const { articles } = response.data;
      setArticles(articles);
    })
    .catch(AxiosError => {
      console.error('getArticles failed:', AxiosError.response?.request.response);
    })
    .catch(error => {
      console.error('getArticles failed:', error);
    })
    .finally( () => {
      setLoading(false);
    });

    return () => {
      // cleanup
    };

  }, []);
  
  
  if(loading) {
    return <NewsFeedLoader loading={loading} />
  }
  


  return (
    <>
      {/* <div>Home</div> */}
      <Divider orientation="left">News Feed</Divider>


      <Row gutter={16}>
        {articles.map( article => (
        
        <Col span={8}>
          <Card 
          loading={loading}
          style={{ padding : '10px' , margin : '10px' }}
          title={article.title}
          // bordered={true}
          >
            {article.description}
          </Card>
        </Col>
        
        ))}
      </Row>


      {/* <ul>
        {articles.map(article => (
          <li key={article.id}>
            <h2>{article.title}</h2>
            <div>{article.source}</div>
            <p>{article.description}</p>
          </li>
        ))}
      </ul> */}


    </>
  )
}
