import { omit } from 'lodash';
import { ICloudiaryImage } from 'services/typings';

const sha1 = require('js-sha1');

class CloudiaryService {
  private readonly endpoint: string;
  private readonly config: any;
  constructor() {
    this.endpoint = 'https://api.cloudinary.com/v1_1/phucdang/image/upload';
    this.config = {
      cloud_name: 'phucdang',
      api_key: '811642628215828',
      api_secret: 'jyv1cB6HgxGVwWhJ74sHBNGEh4A'
    };
  }

  generateSignature(req: any): string {
    const request = omit(req, ['file', 'resource_type', 'api_key']) as any;
    const params = Object.keys(request)
      .sort()
      .reduce((accumulator: string, key: string) => {
        return `${accumulator}&${key}=${request[key]}`;
      }, '')
      .substr(1)
      .concat(this.config.api_secret);
    console.log(params);
    return sha1.hex(params);
  }

  uploadImage = async (image: string): Promise<ICloudiaryImage> => {
    const { api_key } = this.config;
    const req = {
      api_key,
      timestamp: new Date().getTime().toString(),
      file: image.startsWith('data:image/png;base64,')
        ? image
        : `data:image/png;base64,${image}`
    };
    const signature = this.generateSignature(req);
    const authRequest = { ...req, signature } as any;
    const formData = new FormData();
    for (const key in authRequest) {
      formData.append(key, authRequest[key]);
    }
    const res = await fetch(`${this.endpoint}`, {
      method: 'POST',
      headers: {
        'content-type': 'multipart/form-data'
      },
      body: formData
    });
    if (res.status === 200) {
      return res.json();
    } else {
      throw await res.json();
    }
  };
}

export const cloudiaryService = new CloudiaryService();
