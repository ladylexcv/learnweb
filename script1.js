// js高程第三版 Ajax与Comet
  //序列化表单
  var form = document.querySelector('form'),
      formStr = new FormData(form);
  // 解决 url 字符串格式问题
  function addURlParm(url, name, value) {
    url += (url.indexOf('?') === -1) ? "?" : "&";
    url += encodeURIComponent(name) + '=' + encodeURIComponent(value);
    return url;
  }
  var str = addURlParm('search.php', 'id', '10101');
  console.log(str);
  // xhr.readyState
  // 0: 未初始化, 尚未调用open(),
  // 1: 启动，已调用open()但未调用send(),
  // 2: 发送, 已调用send()但未收到响应,
  // 3: 接受, 已接受到部分响应数据,
  // 4: 完成, 已收到全部响应数据,而且已在客户端使用

  // http头部信息
  // "Accept": "浏览器能够处理的内容",
  // "Accept-Charset": "浏览器能够显示的字符集",
  // "Accept-Encoding": "浏览器能够处理的压缩编码",
  // "Accept-Language": "浏览器当前设置的语言",
  // "Connection": "浏览器与服务器之间连接的类型",
  // "Cookie": "当前页面设置的任何cookie值",
  // "Referer": "发送请求的页面url",
  // "User-Agent": "浏览器的用户代理字符串"

  // setRequestHeader("头部字段名称","头部字段的值")  设置自定义请求头信息
  // 在open()之后send()之前调用 尽量不要 设置浏览器正常发送的字段 会影响服务器响应
  // getResponseHeader("头部字段") 取得相应头部信息
  // getAllResponseHeaders() 取得所有头部信息

  // FormData 序列化表单

  // overrideMimeType() 重写响应头MIME类型

  (function(){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if(xhr.readyState === 4) {
        try {
          if((xhr.status >= 200 && xhr.status <= 300) || xhr.status === 304) {
            console.log(xhr.responseText);
          }else {
            console.log(xhr.status);
          }
        }catch(ex){
          // do something
          // 假设由ontimeout 时间处理程序处理
        }
      }
    }
    xhr.open('get','js/info.json',true);
    //xhr.timeout = 1000 将超时设置为1秒
    //xhr.ontimeout = function() {
    //  console.log('未在一秒内返回');
    //}
    xhr.send();
  })();
  // 进度事件
  // loadstart: 在接受响应数据的第一个字符使触发
  // progress： 在接受响应期间持续不断的触发
  // error: 在请求发生错误时触发
  // abort: 在因为调用abort()时触发
  // load： 在接受完整的响应时触发
  // loadend： 在通信完成或触发error、abort或load事件后触发
  (function() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      if(xhr.status >= 200 && xhr <= 300 || xhr.status === 304) {
        console.log(xhr.responseText)
      }else {
        console.log(xhr.status);
      }
    }
    // onprogress() 接受一个event对象 其target属性是XHR对象
    // lengthComptable: 进度信息是否可用(布尔值)
    // position： 已接受到的字符数
    // tototalSize： 根据Content-Length响应头部确定的预期字节数
    xhr.onprogress = function(event) {
      var divStatus = docuement.querySelector('#status');
      if(event.lengthComptable) {
        divStatus.innerHtml = "Received" + event.position + "of" +
        event.totalSize + 'bytes';
      }
    }
    xhr.open('get', 'book.json', true);
    xhr.send(null);
  })();
  // XDomainRequest()
  //  cookie 不随请求发送, 也不随响应返回
  // 不能访问响应头部信息 只能请求头部信息中的 Content-Type字段
  // 只支持post和get
  // open("get[post]", url);
  // 只异步执行 请求返回触发load事件
  // 无法确定响应码 只能访问响应返回的原始文本 可以通过error事件 来检测错误
  // contentype： 发送数据的类型 影响头部的唯一方式

  function createCoRSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if("withCredentials" in xhr) {
      xhr.open(method, url, true);
    } else if(typeof XDomainRequest !== "undefined") {
      xhr = new XDomainRequest(method, url);
    } else {
      xhr = null;
    }
    return null;
  }
  var requst = createCoRSRequest("get", "book.json");
  if(requst) {
    requst.onload = function() {
      console.log(requst.responseText);
    }
    requst.send();
  }
