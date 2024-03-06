import React, { createContext, useContext,useReducer,useRef,useEffect } from 'react';



function CreateTucky(options={}){
    const MyContext = createContext();

    Tucky.context = MyContext;
    
    function Provider(props){
        return <MyContext.Provider  
            value={props.value || {}}
        >
            {props.children}
        </MyContext.Provider>
    }

    let name = options.name || 'tucky_data';
    let initState = {};
    //初始化的时候，获取localhostStorage里面的数据
    if(localStorage.getItem(name)){
        try{
            initState = JSON.parse(localStorage.getItem(name));
        }catch{
            initState = options.initState;
        }
    }else{
        initState = options.initState;
    }

    return {
        Provider,
        name:name,
        value:{
            state:initState,
            dispatch:options.reducer || null
        },
        useTuckyReduce:function(){
            return useTuckyReduce.call(this)
        }
    };
}

function useTuckyReduce(){
    const [state, dispatch] = useReducer(this.value.dispatch,this.value.state);

    useEffect(()=>{
        try{
            let stateStr = JSON.stringify(state);
            localStorage.setItem(this.name,stateStr);
        }catch{
            console.error('state数据有问题')
        }
    },[state])

    return {
        state,
        dispatch:function(action){
            dispatch(...arguments);
        }
    }
}

const Tucky = {
    context:null,
    createTucky:CreateTucky,
    useTucky:function(){
        const data = useContext(Tucky.context);
        return data;
    },
}

export default Tucky;
