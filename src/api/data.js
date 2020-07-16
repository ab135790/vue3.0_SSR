const getData = () => new Promise((resolve) => {
   setTimeout(() => {
       resolve([
           {
               id: '1',
               msg: 'hello'
           },
           {
               id: '2',
               msg: 'hello2'
           }
       ])
   }, 2000)
});

export {
    getData
}
