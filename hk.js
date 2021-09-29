//William Cary W09668836
//Ian Kelly W09686567
function tsp_hk(dist){
    if(dist.length < 2){
        console.log("MATRIX NOT LARGE ENOUGH");
        return -1;
    }
    let n = dist.length;
    let opt = [];
    for(let i = 0; i < n; i++){
        opt[i] = [];
        for(let j = 0; j < n; j++){
            if(i == j) continue;
            opt[i][[j]] = dist[i][j];
        }
    }
    //console.log(n);
    for(let subsetSize = 2; subsetSize < n; subsetSize++){
        let genCombos = combos(n, subsetSize);
        let genCombosRet = genCombos.next();
        //console.log(genCombosRet);
        while(genCombosRet.done == false){
            let combination = genCombosRet.value;
            for(i = 0; i < n; i++){
                if(combination.includes(i)) continue;
                opt[i][combination] = getMin(i, combination);
            }
            genCombosRet = genCombos.next();
        }
        //console.log(subsetSize);
    }

    function getMin(num, set){
        let lowest = 9999;
        for(let i = 0; i < set.length; i++){
            //if(i == num) continue;
            let tmpN = set.slice();
            let cIndex = set[i];
            tmpN.splice(tmpN.indexOf(cIndex), 1);
            let n = opt[cIndex][tmpN];
            if(n + dist[num][cIndex] < n + dist[cIndex][num]){
                n += dist[num][cIndex];
            } else n += dist[cIndex][num];

            if(n < lowest) lowest = n;
        }
        return lowest;
    }
    let min = 9999;
    for(let i = 0; i < n; i++){
        let combination = [...Array(n).keys()]; 
        let tmpCombination = combination.slice();
        tmpCombination.splice(tmpCombination.indexOf(i), 1);
        if(opt[i][tmpCombination] < min) min = opt[i][tmpCombination];
    }
    return min;
}

function*combos(n, subsetSize) {
    let pool = [...Array(n).keys()];
    let len = pool.length;
    if(subsetSize > len){
        console.log("subsetSize greater than array length");
        return;
    }
    let indices = [...Array(subsetSize).keys()]
    yield pool.slice(0, subsetSize);
    while(true){
        let ok = false;
        for(var i = indices.length-1; i >= 0; i--){
            if(indices[i] != i + n - subsetSize){
                ok = true;
                break;
            }
        }
        if(ok == false)
            return;
        indices[i] += 1;
        for(let j = i+1; j < subsetSize; j++){
            indices[j] = indices[j-1]+1;
        }
        let tmp = [];
        for(let val of indices)
            tmp.push(pool[val]);
        yield tmp;
    }
}

module.exports = {
    tsp_hk: function (matrix) {
        return tsp_hk(matrix);
    }
};
