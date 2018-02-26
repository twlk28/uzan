const log = console.log.bind(console)

const guaAsync = (fn, ts) => {
    setTimeout(function(){
        fn()
    }, ts)
}

export {
    log,
    guaAsync,
}

export default {
    log,
    guaAsync,
}
