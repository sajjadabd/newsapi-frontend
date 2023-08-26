import React from 'react'
import { Badge, Card, Skeleton , Col, Row } from 'antd';
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
      
      <Row style={{ display : 'flex' , justifyContent : 'center' }} gutter={16}>
        {skeletons.map( () => 
          <Col style={{ margin : '10px' }} span={7}>
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
          </Col>
        )}
      </Row>
    </>
  )
}

export default NewsFeedLoader