function qieGe (data , num) {
    var arr = [];
    if(num > data.length) {
        // console.log('请您看一下，长度超过数组的长度了!');
        return 0;
    } else {
        for(var i = 0;i < num;i++) {
            arr.push(data[i]);
        }
    }
    return arr;
}

module.exports = {  //提供访问接口
  qieGe: qieGe  
}  