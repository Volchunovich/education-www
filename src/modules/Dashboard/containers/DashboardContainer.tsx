import * as React from 'react';
import { Icon, Upload, Layout, message } from 'antd';
import '../styles/dashboard.scss';

class DashboardContainer extends React.Component {
  public render() {

    const props = {
      name: 'file',
      multiple: false,
      onChange(info: any) {
        const { status } = info.file;
        if (status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (status === 'done') {
          message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };


    return (
      <Layout className='dashboard'>
        <Layout.Content>

          <div className='status'>
            Status: 
          </div>
          <Upload.Dragger {...props}>
            <p className='ant-upload-drag-icon'>
              <Icon type='inbox' />
            </p>
            <p className='ant-upload-text'>Click or drag file to this area to upload</p>
            <p className='ant-upload-hint'>
              Support for a single or bulk upload. Strictly prohibit from uploading company data or other
              band files
            </p>
          </Upload.Dragger>
        </Layout.Content>
      </Layout>
    );
  }
}

export default DashboardContainer;
