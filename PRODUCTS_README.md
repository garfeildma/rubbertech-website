# RubberTech 产品数据

这个目录包含了从 https://rubbertechchina.com/product/ 抓取的所有产品数据。

## 数据文件说明

### 1. `products.json` (原始数据)
- **大小**: ~414KB
- **产品数**: 569个 (包含重复项)
- **描述**: 从网站抓取的原始数据，包含重复产品和所有详细信息

### 2. `products-optimized.json` (优化数据)
- **大小**: ~193KB  
- **产品数**: 261个 (去重后)
- **描述**: 去除重复产品后的完整数据，包含产品分类和详细信息

### 3. `products-simple.json` (简化数据) ⭐ 推荐使用
- **大小**: ~89KB
- **产品数**: 261个
- **描述**: 简化版数据结构，只包含最重要的产品信息，适合在网站中使用

## 产品分类统计

总共抓取了 **261个唯一产品**，分为以下8个类别：

| 分类 | 产品数量 |
|------|----------|
| Pneumatic Rubber Wheel (充气橡胶轮) | 92 |
| PU Wheel (PU轮) | 46 |
| Solid Wheel (实心轮) | 46 |
| Trolley (手推车) | 24 |
| Wheelbarrow (独轮车) | 18 |
| PVC Wheel (PVC轮) | 14 |
| Semi-Pneumatic Rubber Wheel (半充气橡胶轮) | 14 |
| Uncategorized (未分类) | 7 |

## 数据结构

### `products-simple.json` 结构 (推荐)

```json
{
  "meta": {
    "totalProducts": 261,
    "lastUpdated": "2025-09-02T14:07:45.321Z",
    "categories": ["PU Wheel", "PVC Wheel", ...]
  },
  "products": [
    {
      "id": "pr0601",
      "name": "PR0601",
      "category": "Pneumatic Rubber Wheel",
      "image": "https://rubbertechchina.com/wp-content/uploads/2021/02/1-PR0601.jpg",
      "thumbnail": "https://rubbertechchina.com/wp-content/uploads/2021/02/1-PR0601-300x300.jpg",
      "url": "https://rubbertechchina.com/product/pr0601/"
    }
  ]
}
```

## 脚本说明

### `scrape-products.js`
网页抓取主脚本，从原网站的16页产品页面抓取所有产品数据。

**使用方法**:
```bash
npm install axios cheerio
node scrape-products.js
```

### `optimize-products.js`
数据优化脚本，用于去重和生成不同格式的数据文件。

**使用方法**:
```bash
node optimize-products.js
```

## 图片说明

- 所有产品图片都直接使用原网站的链接
- 每个产品包含高质量原图和缩略图
- 图片格式为 JPG，存储在 `rubbertechchina.com` 域名下

## 使用建议

1. **网站展示**: 使用 `products-simple.json`，文件小，加载快
2. **数据分析**: 使用 `products-optimized.json`，包含完整信息
3. **开发调试**: 使用 `products.json`，查看原始抓取数据

## 更新数据

要获取最新的产品数据，重新运行抓取脚本：

```bash
node scrape-products.js
node optimize-products.js
```

**注意**: 抓取过程需要约15-20分钟，因为添加了延迟以避免对服务器造成过大压力。

---

数据抓取时间: 2025年9月2日  
数据来源: https://rubbertechchina.com/product/
