
const countDown = (oparams) => {
    function cd() {
        let defaultParams = {
            time: 0, 
            beforeColdingFun: () => {}, 
            coldingFun: () => {}, 
            afterColdingFun: () => {}, 
            isColding: false
        }
        let params = Object.assign(defaultParams, oparams);
        if (!params.isColding) {
            params.beforeColdingFun();
            let sum = params.time;
            const interval =  setInterval(() => {
                try {
                    sum --;
                    params.coldingFun(sum);
                    if (sum <= 0) {
                        clearInterval(interval);
                        params.afterColdingFun();
                    }
                } catch(error) {
                    clearInterval(interval);
                }
            }, 1000);
        }
    }
    return cd();
}
export default countDown;