import * as React from 'react';
import { Icon, Upload, Layout, message, Button } from 'antd';
import '../styles/dashboard.scss';
import { UploadChangeParam } from 'antd/es/upload';
import { UploadFile } from 'antd/es/upload/interface';
import { lazyInject } from '../../../IoC';
import { DashboardStore } from '../stores/DashboardStore';
import { AxiosWrapper } from '../../Shared/services/AxiosWrapper';

class DashboardContainer extends React.Component {

  @lazyInject(DashboardStore)
  private readonly store: DashboardStore;

  @lazyInject(AxiosWrapper)
  private readonly api: AxiosWrapper;

  private onUploadFiles = () => {
    console.log('files: ', this.store.fields.file);
  }

  private customRequest = async (info: any) => {
    const data = new FormData();
    data.append('file', info.file);

    try {
      await this.api.post(info.action, {file: data});
    } catch (e) {
      // TODO: error-log
    }
  }

  public render() {

    const props = {
      name: 'file',
      multiple: true,
      method: 'post',
      onChange(info: UploadChangeParam) {
        const { status } = info.file;
        console.log('file: ', info.file);
        if (status !== 'uploading') {
          // console.log(info.file, info.fileList);
        }
        if (status === 'done') {
          message.success(`${info.file.name} file uploaded successfully.`);
          this.store.fields.file.push(info.file);
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
          <Upload.Dragger
            accept='image/*'
            customRequest={this.customRequest}
            action='https://auth-diplom.herokuapp.com/upload'
          >
            <p className='ant-upload-drag-icon'>
              <Icon type='inbox' />
            </p>
            <p className='ant-upload-text'>Click or drag file to this area to upload</p>
            <p className='ant-upload-hint'>
              Support for a single or bulk upload. Strictly prohibit from uploading company data or other
              band files
            </p>
          </Upload.Dragger>
          {/*<Button style={{marginTop: '10px'}} onClick={this.onUploadFiles} type='primary'>Upload Files</Button>*/}
        </Layout.Content>
      </Layout>
    );
  }
}

export default DashboardContainer;
