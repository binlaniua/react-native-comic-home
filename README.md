# react-native-comic-home
react native comic reader

## 基于react-native的漫画阅读器
用于抓取更大漫画网站的数据, 无后台, 纯前端抓取

## 注意
由于修改了react-native的源代码, 所以把node-module也提交了

## react-native 源代码修改处记录
 * RCTImageDownloader.m 支持复杂的URL请求
 * RCTCover.m 支持NSString -> NSURL的中文转换失败
 * RCTDataManager.m 支持GBK页面
 * RCTNetworkImageView.m, RCTNetworkImageView.m, image.ios.js 支持onLoadError, onLoadFinish事件

## 截图
![image](https://raw.githubusercontent.com/binlaniua/react-native-comic-home/master/doc/1.png)
![image](https://raw.githubusercontent.com/binlaniua/react-native-comic-home/master/doc/2.png)
![image](https://raw.githubusercontent.com/binlaniua/react-native-comic-home/master/doc/3.png)
![image](https://raw.githubusercontent.com/binlaniua/react-native-comic-home/master/doc/4.png)
![image](https://raw.githubusercontent.com/binlaniua/react-native-comic-home/master/doc/5.png)
![image](https://raw.githubusercontent.com/binlaniua/react-native-comic-home/master/doc/6.png)
