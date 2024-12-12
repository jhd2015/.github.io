#!/bin/bash

# 设置分支名称
DEPLOY_BRANCH="page"

# 打包项目
npm run build:docs

# 切换到部署分支
git checkout $DEPLOY_BRANCH

# 拷贝打包后的文件到当前目录
cp -a dist/. .

# 添加所有更改的文件到 Git
git add .

# 获取当前时间作为提交信息
COMMIT_MESSAGE="Deploy build at $(date '+%Y-%m-%d %H:%M:%S')"

# 提交更改
git commit -m "$COMMIT_MESSAGE"

# 推送到远程仓库
git push origin $DEPLOY_BRANCH

# 切换回原分支
git checkout -

# 可以选择删除 dist 目录
#rm -rf dist
