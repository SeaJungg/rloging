테스트용 mysql 만들기
```
docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d -p 3306:3306 mysql
mysql -pmy-secret-pw

CREATE USER 'sea'@'%' IDENTIFIED BY 'sea123';
GRANT ALL PRIVILEGES ON *.* TO 'sea'@'%';
FLUSH PRIVILEGES;
```

export NODE_ENV=development
export PORT=8000
export KAKAO_CLIENT_ID={KAKAO_CLIENT_ID}
export KAKAO_REDIRECT_URL=http://localhost:3000
brew install zbar
mkdir ~/lib
ln -s $(brew --prefix zbar)/lib/libzbar.dylib ~/lib/libzbar.dylib
npm install
npm run devStart