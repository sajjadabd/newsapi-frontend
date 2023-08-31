import { useState, useEffect } from 'react';
import { Select } from 'antd';
import type { SelectProps } from 'antd';
import { Button, Form } from 'antd';
import { Divider } from 'antd';
import axios from 'axios';
import { getUserPrefrencesURL } from '../services/api';
import { ContentLoader, Spinner } from '../components/Loader/Loader';
import { Col, Row } from 'antd';
import { message } from 'antd';

const options: SelectProps['options'] = [];

for (let i = 10; i < 36; i++) {
  options.push({
    label: i.toString(36) + i,
    value: i.toString(36) + i,
  });
}


const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};



interface SourceType {
  id : number ,
  slug : string ,
  title : string ,
  description : string ,
}

interface CategoryType {
  id : number ,
  title : string 
}



export default function Profile () {

    const [sources, setSources] = useState([]);
    const [categories, setCategories] = useState([]);
    const [userSources, setUserSources] = useState<string[]>([]);
    const [userCategories, setUserCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [formSubmitLoading , setFormSubmitLoading] = useState(false);

    const [messageApi, contextHolder] = message.useMessage();

    const showSuccessMessage = () => {
      messageApi.success('Successfully Saved Changes!');
    };

    
    const handleSourcesChange = (value: string[]) => {
      //console.log(`selected ${value}`);
      setUserSources(value);
    };


    const handleCategoriesChange = (value: string[]) => {
      //console.log(`selected ${value}`);
      setUserCategories(value);
    };


    const handleSubmit = () => {
      setFormSubmitLoading(true);

      //console.log(`userSources : ` , userSources);
      //console.log(`userCategories : ` , userCategories);

      const access_token = localStorage.getItem('access_token');

      axios.put( getUserPrefrencesURL , {
        sources : userSources ,
        categories : userCategories ,
      } , {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }).then( (_) => { 
        //console.log(response.data);
        showSuccessMessage();
      }).catch(AxiosError => {
        console.error('updatePrefrences failed:', AxiosError.response?.request.response);
      })
      .catch(error => {
        console.error('updatePrefrences failed:', error);
      })
      .finally( () => {
        setFormSubmitLoading(false);
      });

      
    }


    useEffect(() => {
        const access_token = localStorage.getItem('access_token');

        axios.post( getUserPrefrencesURL , null, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then( response => {
            const { 
              sources , 
              categories , 
              user_sources , 
              user_categories 
            } = response.data;
            setSources(sources);
            setCategories(categories);
            setUserSources(user_sources.map((item : SourceType) => item.id));
            setUserCategories(user_categories.map((item : CategoryType) => item.id));

        })
        .catch(AxiosError => {
          console.error('getPrefrences failed:', AxiosError.response?.request.response);
        })
        .catch(error => {
          console.error('getPrefrences failed:', error);
        })
        .finally(() => {
          setLoading(false); 
        });


      

        return () => {
          // cleanup
        };


    }, []);
    

    if(loading) {
      return <>
        <Divider orientation="left">Profile Settings</Divider>
        <ContentLoader>
          <Spinner></Spinner>
        </ContentLoader>
      </>;
    }
    

    return (
      <>
        {contextHolder}
        <Divider orientation="left">Profile Settings</Divider>

        <Form
        {...layout}
        style={{ maxWidth: 600 }}
        >
          <Form.Item label="Sources">
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="Please select"
              defaultValue={userSources}
              onChange={handleSourcesChange}
              options={sources.map((source : SourceType) => ({ label: source.title, value: source.id }))}
            />
          </Form.Item>
          <Form.Item label="Categories">
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="Please select"
              defaultValue={userCategories}
              onChange={handleCategoriesChange}
              options={categories.map((category : CategoryType) => ({ label: category.title, value: category.id }))}
            />
          </Form.Item>
          
          <Form.Item>
            <Row gutter={16}>
              <Col xs={{ span : 0 }} sm={{ span : 6 }} ></Col>
              <Button 
              type="primary" 
              loading={formSubmitLoading}
              onClick={() => handleSubmit()}
              >
                Save Changes
              </Button>
            </Row>
          </Form.Item>
        </Form>
      </>
    )
  }
  