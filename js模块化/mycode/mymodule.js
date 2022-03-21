const lifeModule = (() => {
    let count = 0;
    return {
        increase: () => ++count,
        reset: () => count = 0
    }
})();

lifeModule.increase();