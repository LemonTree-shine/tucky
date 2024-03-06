
### app.js中的代码如下：

```javascript
import Tucky from 'tucky';

const initState = {
	userInfo:{
		name:'xxx',
	}
}

const reducer = (state, action) => {
	switch (action.type) {
		case 'set_userinfo':
			state.userInfo = {
				...state.userInfo,
				...action.value
			}
			return {
				...state
			}
		default:
			return state
	}
}

const TuckyStore=  Tucky.createTucky({
	initState,
	reducer,
	//name:'global-cms'    做为存入localstorage中的名称，可以不传
});

function App() {
	const value = TuckyStore.useTuckyReduce();

	return (
		<div className="App">
			<TuckyStore.Provider 
				value={value}
			>
				...(加载路由)
			</TuckyStore.Provider>
		</div>
	);
}
```

### 页面的js中获取到全局state和更新state数据
```javascript
import Tucky from 'tucky';

const {state,dispatch} = Tucky.useTucky();  //获取到数据

//更新数据如下
dispatch({
    type:'set_userinfo',
    value:{
        name:'test'
    }
})
```



