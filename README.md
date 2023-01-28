这是一个用Next.js创建的应用，可以在vercel或netlify上部署，数据库用的是mongodb，在部署时需要加上一个环境变量MONGO_URI=<你的mongodb网址>，用如下代码创建数据库索引：

    use content
    db.topics.createIndex({"id": 1}, {unique: true})

