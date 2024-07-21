function solve(N, M, time) {
    let result = new Array(M);
    let counters = Array.from({length: N}, (_, i) => [0, i]); // [next available time, counter index]

    // Min-heap comparator function
    const compare = (a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0];

    // Function to sift down the heap
    const siftDown = (heap, start, end) => {
        let root = start;
        while (root * 2 + 1 <= end) {
            let child = root * 2 + 1;
            let toSwap = root;
            if (compare(heap[toSwap], heap[child]) > 0) toSwap = child;
            if (child + 1 <= end && compare(heap[toSwap], heap[child + 1]) > 0) toSwap = child + 1;
            if (toSwap === root) return;
            [heap[root], heap[toSwap]] = [heap[toSwap], heap[root]];
            root = toSwap;
        }
    };

    // Function to sift up the heap
    const siftUp = (heap, start) => {
        let child = start;
        while (child > 0) {
            let parent = Math.floor((child - 1) / 2);
            if (compare(heap[parent], heap[child]) <= 0) return;
            [heap[parent], heap[child]] = [heap[child], heap[parent]];
            child = parent;
        }
    };

    for (let i = 0; i < M; i++) {
        let [nextAvailableTime, counterIndex] = counters[0];
        let finishTime = Math.max(nextAvailableTime, time[i]) + 1;
        result[i] = finishTime;
        counters[0] = [finishTime, counterIndex];
        siftDown(counters, 0, N - 1);
    }

    return result;
}

// Example usage
const testCases = [
    {N: 2, M: 4, time: [0, 0, 0, 0], expected: [1, 1, 2, 2]},
    {N: 1, M: 5, time: [0, 1, 2, 3, 4], expected: [1, 2, 3, 4, 5]},
    {N: 3, M: 3, time: [1, 2, 3], expected: [2, 3, 4]},
    {N: 2, M: 4, time: [0, 1, 2, 3], expected: [1, 2, 3, 4]},
    {N: 3, M: 6, time: [0, 0, 1, 2, 3, 4], expected: [1, 1, 2, 3, 4, 5]},
    {N: 2, M: 2, time: [0, 1000000000], expected: [1, 1000000001]},
    {N: 2, M: 5, time: [0, 2, 4, 6, 8], expected: [1, 3, 5, 7, 9]}
];

for (let i = 0; i < testCases.length; i++) {
    const {N, M, time, expected} = testCases[i];
    const result = solve(N, M, time);
    console.log(`Test Case ${i + 1}:`, result.toString() === expected.toString() ? 'Passed' : 'Failed', `- Expected: ${expected}, Got: ${result}`);
}
