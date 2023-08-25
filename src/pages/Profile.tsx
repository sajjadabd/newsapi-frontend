import { Select, Space } from 'antd';
import type { SelectProps } from 'antd';
import { Button, Form, Input, Radio } from 'antd';
import { Divider } from 'antd';

const options: SelectProps['options'] = [];
type LayoutType = Parameters<typeof Form>[0]['layout'];

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

const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};


const handleChange = (value: string[]) => {
  console.log(`selected ${value}`);
};

export default function Profile () {
    return (
      <>
        {/* <div>Profile</div> */}
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
              defaultValue={['a10', 'c12']}
              onChange={handleChange}
              options={options}
            />
          </Form.Item>
          <Form.Item label="Categories">
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="Please select"
              defaultValue={['a10', 'c12']}
              onChange={handleChange}
              options={options}
            />
          </Form.Item>
          <Form.Item label="Countries">
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="Please select"
              defaultValue={['a10', 'c12']}
              onChange={handleChange}
              options={options}
            />
          </Form.Item>
          <Form.Item label="Authors">
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="Please select"
              defaultValue={['a10', 'c12']}
              onChange={handleChange}
              options={options}
            />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" >Save Changes</Button>
          </Form.Item>
        </Form>
      </>
    )
  }
  