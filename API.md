`[get]` http://localhost:3000/todo/list/all

response:
```
{
  "statusCode": 200,
  "data": [
    {
      "_id": "59cb2f1b2b16ee12bce39423",
      "Title": "party",
      "CreateOn": "2017-09-27T04:54:16.826Z",
      "DoneOn": null,
      "IsDone": false
    },
    {
      "_id": "59cb2f1e2b16ee12bce39424",
      "Title": "meeting",
      "CreateOn": "2017-09-27T04:54:16.826Z",
      "DoneOn": null,
      "IsDone": false
    },
    {
      "_id": "59cb2f232b16ee12bce39425",
      "Title": "having dinner with boss",
      "CreateOn": "2017-09-27T04:54:16.826Z",
      "DoneOn": "2017-11-09T09:32:27.113Z",
      "IsDone": true
    },
    {
      "_id": "59cb2f2b2b16ee12bce39426",
      "Title": "happy day",
      "CreateOn": "2017-09-27T04:54:16.826Z",
      "DoneOn": null,
      "IsDone": false
    },
    {
      "_id": "59cb2f2e2b16ee12bce39427",
      "Title": "busy day",
      "CreateOn": "2017-09-27T04:54:16.826Z",
      "DoneOn": null,
      "IsDone": false
    },
    {
      "_id": "59cb2f312b16ee12bce39428",
      "Title": "due date",
      "CreateOn": "2017-09-27T04:54:16.826Z",
      "DoneOn": null,
      "IsDone": false
    },
    {
      "_id": "59cbd0e31c266407f01e5612",
      "Title": "project mush be finished",
      "CreateOn": "2017-09-27T16:24:13.069Z",
      "DoneOn": null,
      "IsDone": false
    },
    {
      "_id": "59cc46ad52233e0da06d33c0",
      "Title": "太陽公公出來了",
      "CreateOn": "2017-09-28T00:47:41.604Z",
      "DoneOn": "2017-11-09T09:32:17.715Z",
      "IsDone": true
    },
    {
      "_id": "59cc46c152233e0da06d33c1",
      "Title": "haha",
      "CreateOn": "2017-09-28T00:48:01.222Z",
      "DoneOn": null,
      "IsDone": false
    },
    {
      "_id": "59d3f034ed9d111694459c6d",
      "Title": "drinking day",
      "CreateOn": "2017-10-03T20:16:52.311Z",
      "DoneOn": null,
      "IsDone": false
    },
    {
      "_id": "59d3f036ed9d111694459c6e",
      "Title": "new comic book coming",
      "CreateOn": "2017-10-03T20:16:54.402Z",
      "DoneOn": null,
      "IsDone": false
    },
    {
      "_id": "59d3f044ed9d111694459c6f",
      "Title": "work~~!",
      "CreateOn": "2017-10-03T20:17:08.354Z",
      "DoneOn": null,
      "IsDone": false
    },
    {
      "_id": "59dd6a6239f2e920bc8b6913",
      "Title": "studying",
      "CreateOn": "2017-10-11T00:48:34.276Z",
      "DoneOn": null,
      "IsDone": false
    }
  ]
}
```

`[get]` http://localhost:3000/todo?Page=2&Limit=2&Sort=-Title

response:
```
{
  "statusCode": 200,
  "data": [
    {
      "_id": "59dd6a6239f2e920bc8b6913",
      "Title": "studying",
      "CreateOn": "2017-10-11T00:48:34.276Z",
      "DoneOn": null,
      "IsDone": false
    },
    {
      "_id": "59cbd0e31c266407f01e5612",
      "Title": "project mush be finished",
      "CreateOn": "2017-09-27T16:24:13.069Z",
      "DoneOn": null,
      "IsDone": false
    }
  ],
  "metadata": {
    "count": 13,
    "page": 2,
    "last": 7,
    "limit": 2,
    "sort": {
      "Title": -1
    },
    "links": {
      "first": "/todo?Page=1&Limit=2&Sort=-Title",
      "previous": "/todo?Page=1&Limit=2&Sort=-Title",
      "current": "/todo?Page=2&Limit=2&Sort=-Title",
      "next": "/todo?Page=3&Limit=2&Sort=-Title",
      "last": "/todo?Page=7&Limit=2&Sort=-Title"
    }
  }
}
```

`[post]` http://localhost:3000/todo

body:
```
{
  "Title": "important day"
}
```

response:
```
{
  "statusCode": 201,
  "data": {
    "insertedId": "5a04157a03db7f34d82dc424"
  }
}
```

`[put]` http://localhost:3000/todo/5a04157a03db7f34d82dc424

body:
```
{
  "Title": "important day!!!"
}
```

response:
```
{
  "statusCode": 201
}
```

`[get]` http://localhost:3000/todo/5a04157a03db7f34d82dc424

response:
```
{
  "statusCode": 200,
  "data": {
    "_id": "5a04157a03db7f34d82dc424",
    "Title": "important day!!!",
    "IsDone": false,
    "CreateOn": "Thu Nov 09 2017 00:44:42 GMT-0800 (太平洋標準時間)",
    "DoneOn": null
  }
}
```

`[put]` http://localhost:3000/todo/toggle/5a04157a03db7f34d82dc424

response:
```
{
  "statusCode": 200
}
```

`[delete]` http://localhost:3000/todo/5a04157a03db7f34d82dc424

response:
```
/* no content */
```

`[post]` http://localhost:3000/todo/multiRemove

body:
```
{
  "IDs": ["59e58fbbe569361e409bd0a8", "59e58fe8e569361e409bd0a9"]
}
```

response:
```
/* no content */
```
