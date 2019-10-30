title: 使用 BitBucket PullRequest API
date: 2019-10-30 11:35:15
tags: 
- git
- bitbucket
- python
---

# 前言
由於目前公司專案數量大約有幾十個
有一些共同的修正因為設計關係需要對所有專案都進行類似的修改
這類作業舉例來說會是一些換圖或者是一些檔案調整
目前大多是自己寫腳本來處理
流程一開始如下
開branch->修改->commit->push->提PR
由於一開始提PR這個流程沒有自動化
所以還是需要一些人工去處理

後來將流程改成
主branch修改->commit->push
這樣的風險在於腳本萬一處理有問題的話沒有檢查處理結果的機會
後來覺得應該還是要走PR的流程
所以需要將PR自動化


# App password
這是一個需要預先準備的東西
在bitbucket settings中可以找到這個選項
因為有的api需要你輸入使用username以及password
(官方給的curl範例是-u選項
postman中會是在Authorization分頁中使用Basic Auth)
此處的password是指App password
可以針對不同的權限需求使用不同的密碼

使用PR API需要的權限
Team membership     R
Pull requests     R/W

# curl 轉 python 
由於官方給的範例主要是curl
我自己用的是python
可以用以下網頁轉換
https://curl.trillworks.com/

如果用postman也會有提供轉換功能

# API

## 前置作業: 取得使用者資訊(uuid)

主要用於設定reviewer
在使用PR API時會需要對方的uuid

api page: 
https://developer.atlassian.com/bitbucket/api/2/reference/resource/users/%7Busername%7D

使用範例:
https://api.bitbucket.org/2.0/users/hsienwei

response 範例:
```
{"display_name": "hsienwei hsiang", "uuid": "{c56de9fd-b17b-4fd0-9d42-89a114ba839c}", "links": {"hooks": {"href": "https://api.bitbucket.org/2.0/users/%7Bc56de9fd-b17b-4fd0-9d42-89a114ba839c%7D/hooks"}, "self": {"href": "https://api.bitbucket.org/2.0/users/%7Bc56de9fd-b17b-4fd0-9d42-89a114ba839c%7D"}, "repositories": {"href": "https://api.bitbucket.org/2.0/repositories/%7Bc56de9fd-b17b-4fd0-9d42-89a114ba839c%7D"}, "html": {"href": "https://bitbucket.org/%7Bc56de9fd-b17b-4fd0-9d42-89a114ba839c%7D/"}, "avatar": {"href": "https://secure.gravatar.com/avatar/e75de8273492ae27638a55f7effc2f37?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FHH-6.png"}, "snippets": {"href": "https://api.bitbucket.org/2.0/snippets/%7Bc56de9fd-b17b-4fd0-9d42-89a114ba839c%7D"}}, "nickname": "hsienwei", "created_on": "2013-12-19T07:57:15.653135+00:00", "is_staff": false, "account_status": "active", "type": "user", "account_id": "557058:43f113de-285b-40cd-8271-e4a9e28f7331"}
```
這裡有一點需要注意，如果要使用uuid需要連左右大括弧一起使用，如上面範例的`{c56de9fd-b17b-4fd0-9d42-89a114ba839c}`

## 前置作業: 取得repo slug
一般來講repo slug就觀察來說應該就是你在網頁上看到的名稱，所以不太需要用API來看，但這裡有一個方法可以讓你看到指定team/user的所有repo資訊
api page:
https://developer.atlassian.com/bitbucket/api/2/reference/resource/teams/%7Busername%7D/repositories
使用範例:
https://api.bitbucket.org/2.0/repositories/hsienwei

需要使用username跟password才能取到private的資訊

如數量較多會分多頁顯示
會有幾個欄位提供如
- pagelen 有幾頁
- page 第幾頁
- next 下一頁網址
https://api.bitbucket.org/2.0/repositories/hsienwei?page=2

## Pull Request API
api page: 
https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Busername%7D/%7Brepo_slug%7D/pullrequests#post

# 簡易python範例

```
import requests
import json

headers = {
    'Content-Type': 'application/json',
}

data =  {
            'title': 'Just test',
            'source':
            {
                'branch':
                {
                    'name': 'source-branch-name'
                }
            },
            'destination':
            {
                'branch':
                {
                    'name': 'destination-branch-name'
                }
            },
            'reviewers': [
                {
                    'uuid': '{c56de9fd-b17b-4fd0-9d42-89a114ba839c}'
                }
            ],
            'description': 'aaa',
            'close_source_branch': True
        }


data_str = json.dumps(data)

response = requests.request("POST", 'https://api.bitbucket.org/2.0/repositories/username/reposlug/pullrequests'
    , headers=headers, data=data_str, auth=('username', 'password'))

print(response.text)
```

這裡需要給的資料大概就幾個
- title : PR的標題
- source > branch : 來源分支
- destination > branch : 目標分支
- reviewers : 這裡填的是reviewer的uuid
- description : 該PR的說明內容
- close_source_branch : 合併後是否關閉該分支