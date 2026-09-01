export type TestCase = {
    input: Record<string, any> | string;
    expectedOutput: string;
};

export type Example = {
    input: string;
    output: string;
};

export type Problem = {
    id: string;
    title: string;
    topic: string;
    difficulty: string;
    functionName?: string;
    parameters?: string[];
    description: string;
    examples: Example[];
    constraints: string[];
    testCases: TestCase[];
};

export const problem: Problem[] = [
    {
        id: "two-sum",
        title: "Two Sum",
        topic: "Array",
        difficulty: "Easy",

        functionName: "twoSum",
        parameters: ["nums", "target"],

        description:
            "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",

        examples: [
            {
                input: "nums = [2,7,11,15], target = 9",
                output: "[0,1]",
            },
            {
                input: "nums = [3,2,4], target = 6",
                output: "[1,2]",
            },
        ],

        constraints: [
            "2 <= nums.length <= 10000",
            "The answer is guaranteed to exist.",
        ],

        testCases: [
            {
                input: {
                    nums: [2, 7, 11, 15],
                    target: 9,
                },
                expectedOutput: "[0,1]",
            },

            {
                input: {
                    nums: [3, 2, 4],
                    target: 6,
                },
                expectedOutput: "[1,2]",
            },

            {
                input: {
                    nums: [3, 3],
                    target: 6,
                },
                expectedOutput: "[0,1]",
            },
        ],
    },
    {
        id: "maxium-subarray",
        title: "Maximum Subarray",
        topic: "Arrays",
        difficulty: "Medium",
        functionName: "maxSubArray",
        parameters: ["nums"],
        description:
            "Given an integer array nums, find the subarray with the largest sum and return its sum.",
        examples: [
            {
                input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
                output: "6",
            },
        ],
        constraints: [
            "1 <= nums.length <= 10^5",
            "-10^4 <= nums[i] <= 10^4",
        ],
        testCases: [
            {
                input: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4] },
                expectedOutput: "6",
            },
            {
                input: { nums: [1] },
                expectedOutput: "1",
            },
            {
                input: { nums: [5, 4, -1, 7, 8] },
                expectedOutput: "23",
            },
            {
                input: { nums: [-1] },
                expectedOutput: "-1",
            },
            {
                input: { nums: [-2, -1] },
                expectedOutput: "-1",
            },
            {
                input: { nums: [1, 2, 3, 4, 5] },
                expectedOutput: "15",
            },
            {
                input: { nums: [-5, -2, -8, -1] },
                expectedOutput: "-1",
            },
            {
                input: { nums: [8, -1, 2, 3, -9, 4] },
                expectedOutput: "12",
            },
            {
                input: { nums: [2, -1, 2, 3, 4, -5] },
                expectedOutput: "10",
            },
            {
                input: { nums: [1, -2, 3, 4, -1, 2, 1, -5, 4] },
                expectedOutput: "9",
            },
        ],
    },

    {
        id: "3sum",
        title: "3Sum",
        topic: "Two Pointers",
        difficulty: "Medium",
        functionName: "threeSum",
        parameters: ["nums"],
        description:
            "Given an integer array nums, return all unique triplets [nums[i], nums[j], nums[k]] such that the three numbers sum to zero.",
        examples: [
            {
                input: "nums = [-1,0,1,2,-1,-4]",
                output: "[[-1,-1,2],[-1,0,1]]",
            },
        ],
        constraints: [
            "3 <= nums.length <= 3000",
            "-10^5 <= nums[i] <= 10^5",
        ],
        testCases: [
            {
                input: { nums: [-1, 0, 1, 2, -1, -4] },
                expectedOutput: "[[-1,-1,2],[-1,0,1]]",
            },
            {
                input: { nums: [0, 1, 1] },
                expectedOutput: "[]",
            },
            {
                input: { nums: [0, 0, 0] },
                expectedOutput: "[[0,0,0]]",
            },
        ],
    },

    {
        id: "coin-change",
        title: "Coin Change",
        topic: "Dynamic Programming",
        difficulty: "Medium",
        functionName: "coinChange",
        parameters: ["coins", "amount"],
        description:
            "You are given an integer array coins representing coins of different denominations and an integer amount. Return the fewest number of coins needed to make up that amount.",
        examples: [
            {
                input: "coins = [1,2,5], amount = 11",
                output: "3",
            },
            {
                input: "coins = [2], amount = 3",
                output: "-1",
            },
        ],
        constraints: [
            "1 <= coins.length <= 12",
            "1 <= coins[i] <= 2^31 - 1",
            "0 <= amount <= 10^4",
        ],
        testCases: [
            {
                input: { coins: [1, 2, 5], amount: 11 },
                expectedOutput: "3",
            },
            {
                input: { coins: [2], amount: 3 },
                expectedOutput: "-1",
            },
            {
                input: { coins: [1], amount: 0 },
                expectedOutput: "0",
            },
        ],

    },
];