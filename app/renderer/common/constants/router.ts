const ROUTER = {
    root: '/',
    home: '/home',
    finance: '/finance'
}

export const ROUTER_KEY = {
    root: 'root',
    home: 'home',
    finance: 'finance'
}

export const ROUTER_ENTRY: TSRouter.Item[] = [
    // {
    //     url: 'https://www.baidu.com',
    //     key: 'demo',
    //     text: 'demo'
    // },
    // {
    //     url: ROUTER.home,
    //     key: ROUTER_KEY.home,
    //     text: 'Home'
    // },
    {
        url: ROUTER.finance,
        key: ROUTER_KEY.finance,
        text: 'Finance'
    },
]

export default ROUTER;
