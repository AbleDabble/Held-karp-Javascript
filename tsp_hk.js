function tsp_hk(dist){
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

/*
let city1 = [
    [0, 1, 999, 1],
    [1, 0, 1, 999],
    [999, 1, 0, 1],
    [1, 999, 1, 0]];

let city2 = [
    [0, 999, 1, 1],
    [999, 0, 2, 1],
    [5, 1, 0, 1],
    [3, 3, 999, 0]];

let city3 = [
    [0, 1, 9, 10],
    [1, 0, 7,  4],
    [9, 7, 0,  4],
    [10, 4, 4, 0]];

let city4 = [
    [0, 1],
    [2, 0]
];

let city5 = [
    [0, 3, 3],
    [1, 0, 2],
    [1, 1, 0]
];

function randomMatrix(n){
	var arr = [];
	for(var i = 0; i < n; i++){
		arr[i] = [];
		for(var j = 0; j < n; j++){
            if(j == i) {arr[j][i] = 0; continue;}
			arr[i][j] = Math.floor(Math.random() * 99) + 1;
		}
	}
	return arr;
}

console.log("answer:",tsp_hk(city1));
console.log("answer:",tsp_hk(city2));
console.log("answer:",tsp_hk(city3));
console.log("answer:",tsp_hk(city4));
console.log("answer:",tsp_hk(city5));
console.time();
console.log("answer:",tsp_hk(randomMatrix(25)));
console.timeEnd();*/