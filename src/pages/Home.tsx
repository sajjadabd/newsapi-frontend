import { useState, useEffect } from 'react';
import { Divider } from 'antd';
import axios from 'axios';
import { getUserArticles } from '../services/api';

import { Badge, Card , Col, Row } from 'antd';
import NewsFeedLoader from '../components/Loader/NewsFeedLoader';

import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';

import { Select, Space } from 'antd';
import { DatePicker } from 'antd';

import { Typography } from 'antd';

const { Paragraph, Title } = Typography;

const { RangePicker } = DatePicker;

interface ArticleType {
  id : number ,
  title : string ,
  description : string ,
  source : string ,
  urlToImage : string ,
}


interface SourceType {
  id : number ,
  slug : string ,
  title : string ,
  description : string ,
}



export default function Home () {
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [filteredArticles , setFilteredArticles] = useState<ArticleType[]>([]);
  const [userSources , setUserSources] = useState<SourceType[]>([]); 
  const [loading, setLoading] = useState(true); 
  const [searchQuery, setSearchQuery] = useState('');
  

  useEffect(() => {
    const access_token = localStorage.getItem('access_token'); 

    axios.post( getUserArticles , null, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    .then(response => {
      const { articles , userSources } = response.data;
      console.log(response.data);
      setUserSources(userSources);
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
  

  const searchArticles = ( value : string ) => {
    console.log(value);
  }

  const applyFilters = () => {
    // Filter articles and update state
    const filteredArticles = articles.filter((item , index) => item.title == searchQuery);
    setFilteredArticles(filteredArticles);
  };
  
  
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
      style={{ 
        display : 'flex' , 
        justifyContent : 'center' ,
        marginBottom : '20px' ,
      }} 
      gutter={30}
      >
        <Col
        xs={{ span : 24 }} 
        sm={{ span : 23 }}
        md={{ span : 22 }}
        lg={{ span : 22  }}
        >
          <Input 
            size="large" 
            value={searchQuery}
            placeholder="search for news" 
            prefix={<SearchOutlined />} 
            onChange={e => searchArticles(e.target.value)}
          />
          <Row 
          style={{ 
            display : 'flex' , 
            justifyContent : 'space-between' ,
            marginTop : '10px' ,
          }} 
          gutter={30}
          >
            <Col>
              <Select
                placeholder="source"
                style={{ width: 120 }}
                allowClear
                options={userSources.map((source : SourceType) => ({ label: source.title, value: source.id }))}
              />
            </Col>
            <Col>
              <RangePicker
                onChange={(e) => console.log(e)}
                allowClear
              />
            </Col>
          </Row>
        </Col>
      </Row>

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

          <Badge.Ribbon  text={article.source} color="#0d1b2a">
          <Card 
          loading={loading}
          // bodyStyle={{ padding: '0' }}
          bordered={true}
          cover={
            <img
              loading='lazy'
              alt={article.title}
              src={article.urlToImage}
            />
          }
          >
            <Title level={4} ellipsis={true}>{article.title}</Title>
            <Paragraph ellipsis={true}>{article.description}</Paragraph>
          </Card>
          </Badge.Ribbon>

        </Col>
        
        ))}
      </Row>

    </>
  )
}
