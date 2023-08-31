import { useState, useEffect } from 'react';
import { Divider } from 'antd';
import axios from 'axios';
import { getUserArticles } from '../services/api';

import _ from 'lodash';

import { Badge, Card , Col, Row } from 'antd';
import NewsFeedLoader from '../components/Loader/NewsFeedLoader';

import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';


import { Select } from 'antd';
import { DatePicker } from 'antd';
import { Empty } from 'antd';
import { Typography } from 'antd';

const { Paragraph, Title } = Typography;

const { RangePicker } = DatePicker;




interface ArticleType {
  id : number ,
  title : string ,
  description : string ,
  source : string ,
  urlToImage : string ,
  source_id : number ,
  publishedAt : string ,
  diffForHumans : string ,
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
  const [selectedSource, setSelectedSource] = useState(''); // 'all' indicates no source selected
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const access_token = localStorage.getItem('access_token'); 

    axios.post( getUserArticles , null, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    .then(response => {
      const { articles , userSources } = response.data;
      //console.log(response.data);
      setUserSources(userSources);
      setArticles(articles);
      setFilteredArticles(articles);
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



  const showNoData = () => {
    return <div style={{marginTop : '40px'}}>
      <Empty />
    </div>
  }


  const showArticles = (articles : ArticleType[]) => {

    return articles.map( article => (    
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
          <Paragraph>{article.diffForHumans}</Paragraph>
          <Title level={4} ellipsis={true}>{article.title}</Title>
          <Paragraph ellipsis={true}>{article.description}</Paragraph>
        </Card>
        </Badge.Ribbon>

      </Col>
      
      ))
  }
  

  

  const applySearchFilter = (searchValue : string) => {
    setSearchQuery(searchValue);
    applyAllFilters(searchValue , selectedSource , startDate , endDate);
  };

  const debouncedHandleSearchArticles = _.debounce(applySearchFilter, 100);
  
  const applyFilterSources = ( sourceValue ?: number ) => {
    if(sourceValue) {
      let source = sourceValue.toString();
      setSelectedSource(source);
      applyAllFilters(searchQuery , source , startDate , endDate);
    } else {
      setSelectedSource('');
      applyAllFilters(searchQuery , '' , startDate , endDate);
    }
  } 


  const applyDateFilter = ( 
      startDateValue : string , 
      endDateValue : string 
    ) => {
    setStartDate(startDateValue);
    setEndDate(endDateValue);
    applyAllFilters( 
      searchQuery , 
      selectedSource , 
      startDateValue , 
      endDateValue
    );
  }
 


  const applyAllFilters = (
      searchValue : string , 
      sourceValue : string , 
      startDate : string , 
      endDate : string
    ) => {
    const theFilteredArticles = articles.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchValue.toLowerCase());
      const matchesSource = sourceValue === '' || article.source_id.toString() === sourceValue;
      const matchesDate = (!startDate || new Date(article.publishedAt) >= new Date(startDate)) &&
                          (!endDate || new Date(article.publishedAt) <= new Date(endDate));
      return matchesSearch && matchesSource && matchesDate;
    });
    setFilteredArticles(theFilteredArticles);
    //console.log(theFilteredArticles);
  }

  
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
      
      {/* <button onClick={() => console.log(filteredArticles)}>print</button> */}

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
          sm={{ span : 20 }}
          md={{ span : 22 }}
          lg={{ span : 22  }}
        >
          <Input 
            allowClear
            size="large" 
            placeholder="search for news" 
            prefix={<SearchOutlined />} 
            onChange={e => debouncedHandleSearchArticles(e.target.value)}
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
                onChange={(value) => applyFilterSources(value)}
              />
            </Col>
            <Col>
              <RangePicker
                onChange={(_ , datesString) => {
                  applyDateFilter(datesString[0] , datesString[1])
                }}
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
        { filteredArticles.length > 0 ? showArticles(filteredArticles) : showNoData()}
      </Row>

    </>
  )
}
