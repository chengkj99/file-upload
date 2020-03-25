# file-upload

File upload based on node multiparty.

## Usage

### Start server

```shell
git clone https://github.com/chengkj99/file-upload.git

npm install

npm start
```

### Upload file by curl

```shell
  curl -F 'uploadsh=@[path]'  http://127.0.0.1:9000/upload

  # for example
  curl -F 'img_avatar=@/home/petehouston/hello.txt'  http://127.0.0.1:9000/upload
```

### View file list

After starting the server，then visit http://127.0.0.1:9000
