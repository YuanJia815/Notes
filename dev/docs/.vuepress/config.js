module.exports = {
    title: 'YuanJia\'s Notes',
    base:'/myNotes/',
    themeConfig: {
        sidebar: [
          '/',
          {
            title: '類別1',
            path: '/Category_1/',
            //children: ['/Category_1/test1.md', '/Category_1/test2.md'],
            children: [{title: '程式範例', path: '/Category_1/test1.md'}, '/Category_1/test2.md']
          } 
          
        ]
      },
  }

