

function removeDuplicates(nums: Array<number>) {
  let n = nums.length;
  if (n === 0) {
    return 0;
  }
  let fast = 1, slow = 1;
  while (fast < n) {
    if (nums[fast] !== nums[fast - 1]) {
      nums[slow] = nums[fast];
      ++slow;
    }
    ++fast;
  }
  return slow;
}

var maxProfit = function (prices:Array<number>) {
  let time = 0
  let profit = 0
  let benj = 0
  let len = 0
  while (len < prices.length - 1) {
    if (prices[time] < prices[time + 1]) {
      profit = profit + prices[time + 1] - prices[time]
      console.log('买入利润', profit)
    }
    ++len
    ++time
  }
  return profit
};

var rotate = function (nums: Array<number>, k: number) {
  let newarr = nums.splice(nums.length - k, k)
  return newarr.concat(nums)
};

var containsDuplicate = function (nums: Array<number>) {
  let ind = 0
  // quickSort(nums)
  while (ind < nums.length) {
    if(nums[ind] === nums[ind+1]) {
      return true
    } else if (ind === nums.length -1) {
      // return false
    } else {
      ++ind
    }
    return false
  }
};

// var quickSort = function (arr) {
//   if (arr.length <= 1) { return arr; }
//   var pivotIndex = Math.floor(arr.length / 2);
//   var pivot = arr.splice(pivotIndex, 1)[0];
//   var left = [];
//   var right = [];
//   for (var i = 0; i < arr.length; i++) {
//     if (arr[i] < pivot) {
//       left.push(arr[i]);
//     } else {
//       right.push(arr[i]);
//     }
//   }
//   return quickSort(left).concat([pivot], quickSort(right));
// };

var intersect = function(nums1:Array<number>, nums2:Array<number>) {
  let setm = new Set()
  let hashnum = []
  let setm2 = new Set()
  for(const a of nums1) {
    setm.add(a)
  }
  for(const c of nums2) {
    setm2.add(c)
  }
  for(var b of Array.from(setm)) {
    if(setm2.has(b)) {
      hashnum.push(b)
    }
  }
  return setm2
};

var intersect2 = function(nums1:Array<number>, nums2:Array<number>) {
  let set = new Set()
  for(const x of nums1) {
    let comdio : boolean = false
    for(const i in set) {
      if((i[0] as unknown) === x) {
        console.log(i[0])
        comdio = true
      } else {
        comdio = false
      }
    }
    if(comdio) {
      // x[1]++
    } else {
      let k = 1
      set.add([x,k])
    }
  }
  return set
}

var intersect3 = function(nums1:Array<number>, nums2:Array<number>) {
  let map__ = new Map()
  let resarr = []
  for(const x of nums1) {
    if(map__.get(x)) {
      map__.set(x, map__.get(x) +1)
    } else {
      let ky = 1
      map__.set(x,ky)
    }
  }
  for(const y of nums2) {
    if(map__.get(y) && map__.get(y) !== 0) {
      map__.set(y,map__.get(y) -1)
      resarr.push(y)
    } else {

    }
  }
  return resarr
}

var plusOne = function(digits:Array<number>) {
  let strr :string= ''
  for(const x of digits) {
    strr = strr + (x as number).toString()
  }
  let arr = []
  let res = (BigInt(strr) + BigInt(1)).toString()
  for(let i = 0;i<res.length;i++) {
    arr.push(parseInt(res.slice(i,i+1)))
  }
  return arr
};

var moveZeroes = function(nums:any) {
  let left = 0
  let ri = 1
  let temp:number
  for(const x of nums) {
    if(ri>nums.length -1) {
      
    } else if(nums[left] === 0 && nums[ri] !==0) {
      temp = nums[left]
      nums[left] = nums[ri]
      nums[ri] = temp
      left++
      ri++
    } else if(nums[left] === 0 && nums[ri] ===0){
      ri++
    } else {
      left++
      ri++
    }
  }
  return nums
};

var twoSum = function(nums:Array<number>, target:number) {
  let set = new Set()
  let res:Array<number> = []
  for(const x of nums) {
    set.add(x)
  }
  for(const y of nums) {
    if(set.has(target-y)) {
      if(target-y!==y) {
        res.push(nums.indexOf(y))
        res.push(nums.indexOf(target-y))
        return res
      } else if(target-y===y){
        console.log(66)
        let n1 = nums.slice(0,nums.indexOf(y)).concat(nums.slice(nums.indexOf(y) +1,nums.length))
        for(const z of n1) {
          console.log(y,z)
          if(y === z) {
            res.push(nums.indexOf(y))
            res.push(n1.indexOf(y)+1)
            return res
          }
        }
      } 
    }
  }
  return res
};

var isValidSudoku = function(board:Array<Array<string>>) {
  let linearr: [[]]
  let collarr: [[]]
  let gridarr: [[]]
  for(const row of board) {
    let rowset = new Set()
    for(const col of row) {
      if(col === '.')
      continue
      if(rowset.has(col)) {
        return true
      }
    }
  }
};
var firstUniqChar = function(s:string) {
  let arr = Array.from(s)
  let set = new Set()
  for(const x of arr) {
    set.add(x)
  }
  for(let i =0;i<=s.length;i++) {
    if(set.has(arr[i])) {
      
    } else {

    }
  }
  return arr
};
