export type TestCase = {
    input: Record<string, any>;
    expectedOutput: any;
};

export type Problem = {
    id: string;
    title: string;
    topic: string;
    difficulty: "Easy" | "Medium" | "Hard";
    description: string;

    examples: {
        input: string;
        output: string;
    }[];

    constraints: string[];

    functionName: string;
    parameters: string[];

    execution: {
        python: { mode: "function" };
        javascript: { mode: "function" };
        typescript: { mode: "function" };
        cpp: { mode: "stdin" };
        java: { mode: "stdin" };
    };

    // Public test cases → Run
    testCases: TestCase[];

    // Hidden test cases → Submit
    hiddenTestCases: TestCase[];
};

export const problem: Problem[] = [
    {
        id: "two-sum",
        title: "Two Sum",
        topic: "Array, Hash Map",
        difficulty: "Easy",

        description:
            "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",

        examples: [
            {
                input: 'nums = [2,7,11,15], target = 9',
                output: "[0,1]",
            },
            {
                input: "nums = [3,2,4], target = 6",
                output: "[1,2]",
            },
        ],

        constraints: [
            "2 <= nums.length <= 10^4",
            "-10^9 <= nums[i] <= 10^9",
            "-10^9 <= target <= 10^9",
            "Exactly one valid answer exists.",
        ],

        functionName: "twoSum",
        parameters: ["nums", "target"],

        execution: {
            python: { mode: "function" },
            javascript: { mode: "function" },
            typescript: { mode: "function" },
            cpp: { mode: "stdin" },
            java: { mode: "stdin" },
        },

        // 👇 User can see these
        testCases: [
            {
                input: {
                    nums: [2, 7, 11, 15],
                    target: 9,
                },
                expectedOutput: [0, 1],
            },
            {
                input: {
                    nums: [3, 2, 4],
                    target: 6,
                },
                expectedOutput: [1, 2],
            },
        ],

        // 👇 User should NOT see these
        hiddenTestCases: [
            {
                input: {
                    nums: [3, 3],
                    target: 6,
                },
                expectedOutput: [0, 1],
            },
            {
                input: {
                    nums: [1, 5, 8, 10],
                    target: 13,
                },
                expectedOutput: [1, 2],
            },
            {
                input: {
                    nums: [2, 4, 6, 8],
                    target: 14,
                },
                expectedOutput: [2, 3],
            },
        ],
    },

    {
        id: "maximum-subarray",
        title: "Maximum Subarray",
        topic: "Array, Dynamic Programming",
        difficulty: "Medium",

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

        functionName: "maxSubArray",
        parameters: ["nums"],

        execution: {
            python: { mode: "function" },
            javascript: { mode: "function" },
            typescript: { mode: "function" },
            cpp: { mode: "stdin" },
            java: { mode: "stdin" },
        },

        testCases: [
            {
                input: {
                    nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
                },
                expectedOutput: 6,
            },
            {
                input: {
                    nums: [1],
                },
                expectedOutput: 1,
            },
        ],

        hiddenTestCases: [
            {
                input: {
                    nums: [-1],
                },
                expectedOutput: -1,
            },
            {
                input: {
                    nums: [5, 4, -1, 7, 8],
                },
                expectedOutput: 23,
            },
            {
                input: {
                    nums: [-5, -2, -8, -1],
                },
                expectedOutput: -1,
            },
        ],
    },

    {
        id: "best-time-to-buy-and-sell-stock",
        title: "Best Time to Buy and Sell Stock",
        topic: "Array, Greedy",
        difficulty: "Easy",

        description:
            "Given an array prices where prices[i] is the price of a stock on the ith day, return the maximum profit you can achieve.",

        examples: [
            {
                input: "prices = [7,1,5,3,6,4]",
                output: "5",
            },
        ],

        constraints: [
            "1 <= prices.length <= 10^5",
            "0 <= prices[i] <= 10^4",
        ],

        functionName: "maxProfit",
        parameters: ["prices"],

        execution: {
            python: { mode: "function" },
            javascript: { mode: "function" },
            typescript: { mode: "function" },
            cpp: { mode: "stdin" },
            java: { mode: "stdin" },
        },

        testCases: [
            {
                input: {
                    prices: [7, 1, 5, 3, 6, 4],
                },
                expectedOutput: 5,
            },
            {
                input: {
                    prices: [7, 6, 4, 3, 1],
                },
                expectedOutput: 0,
            },
        ],

        hiddenTestCases: [
            {
                input: {
                    prices: [1, 2, 3, 4, 5],
                },
                expectedOutput: 4,
            },
            {
                input: {
                    prices: [2, 1, 2, 1, 0, 1, 2],
                },
                expectedOutput: 2,
            },
        ],
    },
];