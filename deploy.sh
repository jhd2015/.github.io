#!/bin/bash

# 设置分支名称
DEPLOY_BRANCH="page"

# 打包项目
npm run build:docs

# 拷贝打包后的文件到当前目录
cp -a dist/. .

# 暂存所有更改的文件到 Git 的 stash
git stash push -u

# 切换到部署分支
git checkout $DEPLOY_BRANCH

# 强行应用暂存的更改
git stash apply --index --quiet

# 提交更改
git commit -m "Deploy build at $(date '+%Y-%m-%d %H:%M:%S')"

# 推送到远程仓库
git push origin $DEPLOY_BRANCH

# 切换回原分支
git checkout -

# 丢弃工作目录中的所有更改
git reset --hard

# 强行应用原分支的暂存更改
git stash pop --index --quiet

# 可以选择删除 dist 目录
# rm -rf dist
