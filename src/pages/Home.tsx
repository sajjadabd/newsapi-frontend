import { useState, useEffect } from 'react';
import { Divider } from 'antd';
import axios from 'axios';
import { getUserArticles } from '../services/api';

import { Badge, Card , Col, Row } from 'antd';
import NewsFeedLoader from '../components/Loader/NewsFeedLoader';


interface ArticleType {
  id : number ,
  title : string ,
  description : string ,
  source : string ,
}

export default function Home () {
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [loading, setLoading] = useState(true); 
  

  useEffect(() => {
    const access_token = localStorage.getItem('access_token'); 

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
    return <div data-testid="news-feed-loader">
      <NewsFeedLoader 
        loading={loading}
      />
    </div>
  }
  


  return (
    <>
      <Divider orientation="left">News Feed</Divider>


      <Row 
      style={{ display : 'flex' , justifyContent : 'center' }} 
      gutter={30}
      >
        {articles.map( article => (
        
        <Col 
        key={article.id}
        style={{ margin : '10px' }} 
        xs={{ span : 24 }} 
        sm={{ span : 20 }}
        md={{ span : 11 }}
        lg={{ span : 7  }}
        >
          <Badge.Ribbon  text={article.source} color="#6c757d">
          <Card 
          loading={loading}
          style={{ paddingTop : '20px' }}
          title={article.title}
          data-testid="article"
          >
            {article.description}
          </Card>
          </Badge.Ribbon>
        </Col>
        
        ))}
      </Row>

    </>
  )
}
