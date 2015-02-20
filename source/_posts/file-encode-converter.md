title: 簡易文件編碼轉換工具
date: 2015-02-20 23:34:07
tags:
- python
- tool
---
## 原由
因為在工作上有需要將一些簡體編碼的程式碼文件轉換成utf格式，所以寫了這個小工具
該工具的作用:將目標資料夾下的指定副檔名文件的編碼改為utf
<strong>注意:目前無備份功能, 轉換前須自行備份</strong>

---
## 開發相關

####開發工具
``python 2.7`` + ``chardet`` + ``py2exe``
gui部分為內建的``tkinter``
py2exe_dist.zip是我自行用py2exe轉換的執行檔
如要自行產生請安裝py2exe module以及chardet並在專案目錄下執行
```python setup.py py2exe```

####基本原理
用chardet這個module來測文件的編碼
測出後將其解碼再轉碼為utf

####特殊例子
在測試時有遇到一個特殊狀況
就是當文件編碼為gb2312
但裡面又含有繁體字元
此時要改用gbk編碼來處理

github:
https://github.com/hsienwei/file_encode_to_utf_converter

![執行畫面](/2015/02/20/file-encode-converter/ui.jpg)