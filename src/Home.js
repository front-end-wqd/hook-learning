import React, { useState, useEffect, useLayoutEffect, useContext, useRef, useReducer } from 'react';
import { Button, Input } from 'antd';
import './Home.css';

const theme = {
    a: {
        color: '#1890ff',
        background: '#ffffff',
    },
    b: {
        color: '#ffffff',
        background: '#1890ff',
    },
};
const ThemeContext = React.createContext();

const myReducer = (state, action) => {
    switch(action.type) {
        case "up":
            return {
                ...state,
                newCount: state.newCount + 1,
            }
        default:
            return state;
    }
}

function Home() {
    useEffect(() => {
        console.log('延迟执行');
    }, []); // 仅在组件挂载和卸载时执行

    useLayoutEffect(() => {
        console.log('同步执行');
    }, []);

    useEffect(() => {
        let a = setInterval(() => console.log('a'), 5000);
        return () => {
            // 清除
            clearInterval(a);
        }
    });

    return (
        <ThemeContext.Provider value={theme.a}>
            <ThemeButton></ThemeButton>
        </ThemeContext.Provider>
    );
}

function ThemeButton() {
    const [count, setCount] = useState(0);
    const theme = useContext(ThemeContext);
    const inputElement = useRef(null);
    const [state, dispatch] = useReducer(myReducer, { newCount: 100 });
    
    const handleClick = () => {
        setCount(count => count + 1);
        inputElement.current.focus();
    }

    useEffect(() => {
        document.title = count;
    }, [count]); // 仅在count更改时更新

    return (
        <div>
            <Button onClick={handleClick} style={{ margin: 10, color: theme.color, background: theme.background }}>
                {count}
            </Button>
            <Input ref={inputElement} style={{ width: 160 }}></Input>
            <Button onClick={() => dispatch({ type: "up" })} style={{ margin: 10, color: theme.color, background: theme.background }}>
                {state.newCount}
            </Button>
        </div>
    );
}

export default Home;