


# Quant Trading

* 해당 프로젝트는 개인적인 트레이딩 목적으로 만들어졌으며, 해당 프로젝트는 [JeonMun.Ga](https://jeonmun.ga/)에서 확인하실 수 있습니다.

## 기술 스택:
1. **AWS**: EC2, Route54, Cloudfront
2. **Backend**: NodeJS, Redis
3. **Front**: React (Redux)


## 설치 방법

*해당 repo 는 개인용 목적으로 만들어졌습니다.
1.  NodeJS 및 Yarn 설치
	```shell
	# nvm 설치
	brew install nvm

	# nvm 환경변수 추가
	vi ~/.bash_profile 혹은$ vi ~/.zshrc
	export NVM_DIR="$HOME/.nvm"source $(brew --prefix nvm)/nvm.sh
	
	# nodejs 설치
	nvm install 10
	nvm use 10
	```

3. Dependency 다운 및 설치
	```shell
	cd jeonmunga
	yarn deploy

	# 서버만 deploy 할시
	yarn deploy:server
	```
