export const problem = [
    {
        id: "two-sum",
        title: "Two Sum",
        topic: "Arrays",
        difficulty: "Easy",
        description:
            "Given an array of integers nums and an integer target, return the indices of the two numbers such that they add up to target.",
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
            "2 <= nums.length <= 10^4",
            "-10^9 <= nums[i] <= 10^9",
            "-10^9 <= target <= 10^9",
        ],
    },

    {
        id: "maxium-subarray",
        title: "Maximum Subarray",
        topic: "Arrays",
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
    },

    {
        id: "3sum",
        title: "3Sum",
        topic: "Two Pointers",
        difficulty: "Medium",
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
    },

    {
        id: "coin-change",
        title: "Coin Change",
        topic: "Dynamic Programming",
        difficulty: "Medium",
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
    },
];