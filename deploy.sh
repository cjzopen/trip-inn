#!/bin/bash

# bash deploy.sh

# 刪除 docs 資料夾（如果存在）
Remove-Item ./docs -Recurse -Force

# 將 dist 資料夾改名為 docs
mv dist docs

# 在 docs 資料夾中創建 .nojekyll 文件
echo "" > docs/.nojekyll

# 提交並推送到 GitHub
git add docs
git commit -m "Deploy to GitHub Pages"
git push origin main