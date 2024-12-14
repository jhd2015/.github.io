#!/bin/bash

# 设置分支名称
DEPLOY_BRANCH="page"

# 打包项目
npm run build:docs

# 拷贝打包后的文件到当前目录
cp -a dist/. .

# 暂存所有更改的文件到 Git
git add .

# 保存当前分支的名称
CURRENT_BRANCH=$(git symbolic-ref --short HEAD)

# 切换到部署分支
git checkout $DEPLOY_BRANCH

# 应用暂存的更改
git commit -m "Deploy build at $(date '+%Y-%m-%d %H:%M:%S')"

# 推送到远程仓库
git push origin $DEPLOY_BRANCH

# 切换回原分支
git checkout $CURRENT_BRANCH

# 可以选择删除 dist 目录
# rm -rf dist
