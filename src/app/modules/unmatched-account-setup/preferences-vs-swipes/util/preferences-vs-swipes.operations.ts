/**
 *
 * @param elems
 * @param key
 * @returns Returns an array of string
 */
function separateToArray(elems: string[], key: string): string[] {
  const temp: string[] = [];
  for (const e of elems) {
    for (const f of e[key]) {
      temp.push(f);
    }
  }
  return temp;
}

/**
 *
 * @param array Takes an array of String exmaple ['hii', 'hello', 'hii']
 * @returns It returns the values with number of occurences { hii: 2, hello: 1 }
 * Counting the number of occurences of implicit preferences.
 */
function unique(array: string[]): Record<string, number> {
  const set: Set<string> = new Set();
  const payload = {};
  for (const e of array) {
    set.add(e);
  }
  for (const e of set) {
    let count = 0;
    for (const f of array) {
      if (e === f) {
        count++;
      }
    }
    payload[e] = count;
  }
  return payload;
}

/**
 * @param obj Takes the pair of key and number example: { key1: 2, key2: 1 }
 * @returns It return the sorted object, example: { key2: 1, key1: 2 }
 */
function sortByKeyPairDesc(obj: Record<string, number>): Record<string, number> {
  const temparr: Array<(string | number)[]> = [];
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      temparr.push([key, obj[key]]);
    }
  }

  const temp = temparr.sort((a, b): number => {
    if (a[1] > b[1]) return -1;
    return 0;
  });
  const object = {};
  for (const e of temp) {
    object[e[0]] = e[1];
  }
  return object;
}

/**
 *
 * @param obj Takes an object of string and number that is already sorted
 * @returns Returns an array of strings
 * It will return only three values maximum
 */
function firstThreeKeys(obj: Record<string, number>): string[] | undefined {
  const temp: string[] = [];
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      temp.push(key);
    }
  }

  if (temp.length === 1) {
    return [temp[0]];
  } else if (temp.length === 2) {
    return [temp[0], temp[1]];
  } else if (temp.length >= 3) {
    return [temp[0], temp[1], temp[2]];
  }
}

/**
 * This function returns the average of two numbers
 * @param num1 First Number
 * @param num2 Second Number
 * @return Returns the average of two numbers
 */
function averageTwoNum(num1: Number, num2: Number): Number {
  return Number((((num1?.valueOf() || 0) + (num2?.valueOf() || 0)) / (num1 && num2 ? 2 : 1)).toFixed(2));
}

export { separateToArray, unique, sortByKeyPairDesc, firstThreeKeys, averageTwoNum };
