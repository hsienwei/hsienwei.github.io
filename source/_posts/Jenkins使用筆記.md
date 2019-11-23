title: Jenkins使用筆記(Windows版)
date: 2019-11-24 01:08:09
tags: Jenkins
---
# 安裝
1. https://jenkins.io/download/ 下載windows Long-term Support version並安裝。
1. 安裝完後，瀏覽器會自動開啟 http://localhost:8080/ ，此時可以看到Jenkins正在工作中。
1. 之後Jenkins會要求你輸入一個在指定路徑檔案的密碼，路徑大概像是`C:\Program Files (x86)\Jenkins\secrets\initialAdminPassword` 。
1. 密碼輸入後，Jenkins會要你安裝建議的plugin或者是選擇你自己需要的plugin，由於之後還可以再設定，所以可以先使用建議的就可以，之後的安裝會花幾分鐘的時間。
1. 安裝完後，Jenkins會要求你輸入第一個管理者的資料，稍後可以再加入其他管理者的資料。
1. Jenkins會要求輸入使用的URL，可以使用預設設定，安裝程序結束後可以再設定。
1. 至此Jenkins已經設定完成，可以用左上角的 add job來增加建置job。

# 如何重啟或停止Jenkins服務
* 透過 http://localhost:8080/restart 或 http://localhost:8080/safeRestart 可以重啟jenkins服務。
(jenkins_url)/safeRestart - 允許所有正在進行的jobs完成，新的jobs會被保持在queue中等到重啟完成後再執行。
(jenkins_url)/restart - 強制重啟並不等待進行中的jobs完成。
* 直接執行command, 加上參數如下
( jenkins_path)/jenkins.exe stop
> 'install' - install the service to Windows Service Controller
> 'uninstall' - uninstall the service
> 'start' - start the service (must be installed before)
> 'stop' - stop the service
> 'restart' - restart the service
* 如果需要重開的理由是PATH的修改變動，必須要使用jenkins.exe來restart。

# How to add SSH key
如果需要透過 ssh方式連接到git或者是建置過程需要使用到ssh，就需要先設定ssh key。

按下 `Credentials`. 
![](https://i.imgur.com/fLlC09T.png)
按下 `System`.
![](https://i.imgur.com/O4VYtj8.png)
按下 `Global credentials (unrestricted)`. 
![](https://i.imgur.com/q5CoExt.png)
按下 `Add Credentials` . 選擇 `SSH Username with private key`.
複製 SSH private key 的全部內容到 private key 欄位
(ssh private key 的預設路徑 : C:\Users\user_name\\.ssh\id_rsa)
並輸入Username 與 passphrase (如果有的話).
![](https://i.imgur.com/X8yzK0d.png)

# Using ssh-agent in build process

https://plugins.jenkins.io/ssh-agent
如果建置過程需要使用到ssh-agent，可以安裝這個plugin來使用
在安裝之後，在建置環境中可以看到`SSH agent`選項，選取以設定ssh key

# Using Slack notification
https://plugins.jenkins.io/slack
slack是一個企業用的通訊軟體，如果剛好公司使用了這個軟體而且需要通知建置結果，除了使用api方式來通知，也可以透過這個plugin來處理。


# 我覺得好用的plugin 
- https://wiki.jenkins.io/display/JENKINS/Extended+Choice+Parameter+plugin
提供更多樣化的參數使用方式，像是選擇清單，讓參數輸入可以更方便

- https://wiki.jenkins.io/display/JENKINS/Mask+Passwords+Plugin
可以將console log中的參數給隱藏起來的plugin，可以避免被看到輸入的密碼參數

- https://wiki.jenkins.io/display/JENKINS/SCM+Sync+configuration+plugin
提供使用版控系統來備份jenkins設定的功能



