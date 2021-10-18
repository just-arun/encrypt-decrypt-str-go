const app = new Vue({
    el: "#app",
    data: {
        text: "",
        hash: "",
        char: [
            "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-",
            "+", "=", "{", "}", "[", "]", "|", "\\", ":", ";", "'", "\"",
            ",", "<", ".", ">", "/", "?",
            "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
            "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
            " ",
        ]
    },
    created() {
        let printArray = (arr, n) => {
            ans = '';
            for (let i = 0; i < n; i++) {
                ans += arr[i] + " ";
            }
            console.log(ans);
        }

        // A function to generate a random
        // permutation of arr
        let randomize = (arr, n) => {

            // Start from the last element and swap
            // one by one. We don't need to run for
            // the first element that's why i > 0
            for (let i = n - 1; i > 0; i--) {

                // Pick a random index from 0 to i
                let j = (Math.floor(Math.random()) * 10000000000) % (i + 1);

                // Swap arr[i] with the element
                // at random index
                let temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }

        // Driver Code
        let arr = [1, 2, 3, 4, 5, 6, 7, 8];
        let n = arr.length;
        randomize(arr, n);
        printArray(arr, n);

    },
    methods: {
        encrypt() {

        },
        decrypt() {

        }
    }
})