使用了:
REACT、vite、TypeScript、React-Router、Tailwind、Redux-toolkit

分頁使用 react-paginate

時間表示用 date-fns
資料串https://jsonplaceholder.typicode.com/todos
原本資料沒有時間戳記，接進來以後自己加的，同時對資料進行排序。

比較值得記的，tailwind 的 active 用法，這邊用的地方在 '已完成'、'未完成'、'全部'，用'\[&.active]:'可以在有 active 這個屬性時加上對應的 class，可以應用在 react-router 的 NavLink，因為 NavLink 在對應的 Page 會自帶 active 這個屬性。
