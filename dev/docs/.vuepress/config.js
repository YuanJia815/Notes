module.exports = {
    title: 'HI YuanJia',
    description: 'Just playing around',
    base:'/myNotes/',
    themeConfig: {
        sidebar: [
          '/',
          '/Category_1/',
          {
            title: '是喔',
            path: '/Category_2/',
            children: ['/Category_2/test1.md', '/Category_2/test2.md']
          }
          
        ]
      }
  }