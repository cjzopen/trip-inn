const fs = require('fs')
const path = require('path')
const glob = require('glob')
const { execSync } = require('child_process')

const DOCS_DIR = path.resolve('docs')

// 生成輸出目錄（Nuxt 3 的靜態輸出）
const BUILD_DIR = path.join(__dirname, '..', '.output', 'public')
const BASE_PATH_PREFIX = '/trip-inn' // 你的 router base

const htmlFiles = glob.sync(`${BUILD_DIR}/**/*.html`)

for (const file of htmlFiles) {
  let content = fs.readFileSync(file, 'utf-8')

  const updated = content.replace(
    /<link\s+rel="stylesheet"\s+href="([^"]+\.css)"[^>]*?>/g,
    (match, href) => {
      // 如果是來自外部的 CSS，則不刪除
      if (href.startsWith('http')) {
        return match
      }
  
      const cleanHref = href.replace(BASE_PATH_PREFIX, '')
      const filePath = path.join(BUILD_DIR, cleanHref)
  
      if (!fs.existsSync(filePath)) {
        console.log(`❌ 移除不存在的 CSS: ${href}`)
        return ''
      }
  
      return match
    }
  )

  fs.writeFileSync(file, updated, 'utf-8')
}


// 刪除舊的 docs/
if (fs.existsSync(DOCS_DIR)) {
  console.log('🧹 Removing old docs directory...')
  fs.rmSync(DOCS_DIR, { recursive: true, force: true })
}

// 移動 build 輸出到 docs/
console.log('📦 Moving build output to docs/')
fs.renameSync(BUILD_DIR, DOCS_DIR)

// 建立 .nojekyll 檔
console.log('📄 Creating .nojekyll file')
fs.writeFileSync(path.join(DOCS_DIR, '.nojekyll'), '')