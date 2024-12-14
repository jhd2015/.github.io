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

# 尝试合并暂存的更改
if git merge --no-commit --no-ff stash^{/}; then
    # 如果没有冲突，则提交更改
    git commit -m "Deploy build at $(date '+%Y-%m-%d %H:%M:%S')"
    # 推送到远程仓库
    git push origin $DEPLOY_BRANCH
else
    # 如果有冲突，尝试自动解决，保留 stash 中的更改
    echo "Attempting to resolve conflicts by keeping stash changes..."
    git checkout stash^{/} -- .
    git add -A
    git commit -m "Resolved conflicts by keeping stash changes"
    git push origin $DEPLOY_BRANCH
fi

# 切换回原分支
git checkout -

# 应用原分支的暂存更改
git stash pop --index

# 可以选择删除 dist 目录
# rm -rf dist
