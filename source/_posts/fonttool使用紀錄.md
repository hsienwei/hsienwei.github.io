title: fonttool使用紀錄
date: 2021-04-24 11:57:54
tags: 
- python
- fonttool
---
# 簡介 
fonttools是目前用在專案上的一個字型工具包，repo URL如下
https://github.com/fonttools/fonttools

安裝了該python module就可以使用裡面好幾種的字型工具，目前有用到的有以下：

**pyftsubset**
簡單說就是從字型中取出需要的字元生成一個較小的字型檔，主要為了節省空間，目前主要用在中日文語系這種漢字較多的語系，由於這類語系字型動輒都好幾mb，為了減少讀取時間是有其必要性
可以使用以下選項
`--text-file` : 將想要的字放在文字檔
`--output-file` : 選擇輸出檔案的路徑

**ttx**
一個轉換格式的工具，可以將字型轉換成一個xml格式的文件(.ttx)
`ttx text.ttf`  
反之也可以再轉為其他的字型格式
`ttx -o font.woff  .\font.ttx`

# woff2支援
該工具支援轉換成woff2，由於使用了不同的壓縮方式會更小
要使用的話需要先安裝[Brotli](https://github.com/google/brotli) 
但這個module安裝的時候需要安裝C++ compiler，可以按照[連結](https://wiki.python.org/moin/WindowsCompilers#Which_Microsoft_Visual_C.2B-.2B-_compiler_to_use_with_a_specific_Python_version_.3F)依照自己的python版本，並且有相關安裝說明
https://wiki.python.org/moin/WindowsCompilers

# 文字剔除後的問題

目前看到有些地方會使用特定字元來做一些文字大小上的計算，故如果有用到這種方式需要將特定字元保留，以避免計算上的錯誤

https://stackoverflow.com/a/11688948
檢查字型是否已經讀取的一種作法
https://github.com/pixijs/pixi.js/blob/dev/packages/text/src/TextMetrics.ts#L652
pixi用於計算字型大小的做法