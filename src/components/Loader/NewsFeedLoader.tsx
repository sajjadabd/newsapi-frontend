import React from 'react'
import { Card, Skeleton , Col, Row } from 'antd';
import { Divider } from 'antd';

const { Meta } = Card;

interface Props {
  loading : boolean ,
}

const NewsFeedLoader : React.FC<Props> = ({loading}) => {

  const skeletons = [...Array(16).keys()].map(i => i + 1);


  return (
    <>
      <Divider orientation="left">News Feed</Divider>
      
      <Row style={{ display : 'flex' , justifyContent : 'center' }} gutter={30}>
        {skeletons.map( ( _ , index) => 
          <Col 
          key={index}
          style={{ margin : '10px' }} 
          xs={{ span : 24 }} 
          sm={{ span : 20 }}
          md={{ span : 11 }}
          lg={{ span : 7  }}
          >
          <div role="article">
            <Skeleton 
            style={{ padding : '10px' , margin : '10px' }}
            loading={loading} 
            active
            >
              <Meta
                title="Card title"
                description="This is the description"
              />
            </Skeleton>
          </div>
          </Col>
        )}
      </Row>
    </>
  )
}

export default NewsFeedLoader