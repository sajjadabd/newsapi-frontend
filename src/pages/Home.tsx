import React, { useState, useEffect } from 'react';
import { Divider } from 'antd';
import axios from 'axios';
import { getUserArticles } from '../services/api';


interface ArticleType {
  id : number ,
  title : string ,
  content : string ,
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
    <div>Loading...</div>
  }


  return (
    <>
      {/* <div>Home</div> */}
      <Divider orientation="left">Home</Divider>

      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <h2>{article.title}</h2>
            <p>{article.content}</p>
          </li>
        ))}
      </ul>


    </>
  )
}
