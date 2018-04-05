title: 使用python + selenium 心得
date: 2018-03-20 14:05:00
tags: 
- python
- selenium
---

最近寫了一個幫助自己解決一個煩人雜事的小程式[gist連結](https://gist.github.com/hsienwei/233b85fbcccc47b23f27266317c6dfce)

這支程式主要工作如下：
登入公司的jira, 從手上的issue中找出指定符合父issue ID的所有issue, 統一填上註解並轉給指定的人。
寫的比較匆忙沒有加太多的例外判定, 目標是快速解決手邊的雜事。

之所以選擇[selenium](http://selenium-python.readthedocs.io/)主要還是看上他可以省去很多功, 以前寫的爬蟲主要還是使用mechanize + BeautifulSoup, 但是遇到js就會很麻煩, 後來使用selenium不只js部分的問題沒有了, 連BeautifulSoup都不需要了, 他的find方法已經足夠我使用。

事前selenium module的安裝就不提, 要注意的是webdriver供許多瀏覽器版本可以用, 我用的是chrome, 必須要事前下載 [chromedriver](https://sites.google.com/a/chromium.org/chromedriver/downloads) 使用, 並在使用時設置路徑, 如`webdriver.Chrome(executable_path=r'.\\chromedriver.exe')` 。

這支程式主要使用selenium幾個功能：

### find
[api](http://selenium-python.readthedocs.io/locating-elements.html)
selenium 提供了一系列的方法讓你去找到目標元件, 基本上都如同api所列的一樣, 你可以依照條件使用特定id或者class來查找, 唯獨比較特別的是如果id或class中間有空格的最好還是使用 `find_element_by_xpath` ,之前沒有看過XPath所以花了一點時間才清楚使用方法。

基本上消耗最多時間還是在翻網頁原始碼找特定元素的id或class, 找到後基本上都不會有太大的問題, 

### action

找到元素後可以做一些行為, 這裡比較常用的有
- click: 模擬點擊行為, 主要用在`a`跟`button`
- send_keys: 輸入的行為, 主要用在`input`
- submit: form的提交行為

### wait

有時候在進行一些動作後, 需要等待特定元件出現才可以進行下一個動作, 此時就需要用wait功能, 這裡有[一篇文章](https://huilansame.github.io/huilansame.github.io/archivers/sleep-implicitlywait-wait)提到使用方法, 寫的很詳細。
