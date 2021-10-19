package main

import (
	"bufio"
	"fmt"
	"math"
	"os"
	"strconv"
	"strings"
	"time"

	passwordutil "github.com/just-arun/thisistest/password-util"
)

var (
	char = []string{
		"0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-",
		"+", "=", "{", "}", "[", "]", "|", "\\", ":", ";", "'", "\"",
		",", "<", ".", ">", "/", "?",
		"a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
		"n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
		" ",
	}
	num = []string{
		"0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
	}
	sym = []string{
		"~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-",
		"+", "=", "{", "}", "[", "]", "|", "\\", ":", ";", "'", "\"",
		",", "<", ".", ">", "/", "?",
	}
	cipher  int
	salt    int
	newChar = []string{}
	input   = ""
	output  = ""
)

func getNewChar() {
	for i := cipher; i < len(char); i++ {
		newChar = append(newChar, char[i])
	}
	for i := 0; i < cipher; i++ {
		newChar = append(newChar, char[i])
	}
}

func getCharMap(c string, arr []string, space string) string {
	for i, ch := range char {
		if ch == c {
			return arr[i]
		}
	}
	return space
}

func EncryptString() {
	output = char[cipher]
	for _, c := range strings.Split(input, "") {
		output += getCharMap(c, newChar, "-")
	}
}

func DecryptString() {
	decrypt := ""
	d := strings.Split(output, "")[0]
	func() {
		for i, c := range char {
			if c == d {
				cipher = i
				return
			}
		}
	}()
	getNewChar()
	// fmt.Println(newChar)
	for _, c := range strings.Split(input, "") {
		decrypt += getCharMap(c, char, " ")
	}
	fmt.Println("\nDecrypt String is: ", decrypt)
}

func main() {
	fmt.Println(math.Phi, math.Pi)
	rangeCount := 5
	ar := strings.Split(fmt.Sprint(time.Now().Second()), "")
	if len(ar) > 1 {
		i, _ := strconv.Atoi(ar[1:2][0])
		if i != 0 {
			rangeCount = i
		}
	}
	var resultType string
	fmt.Print("Encrypt(e) of decrypt(d): ")
	fmt.Scan(&resultType)
	// getNewChar()
	if resultType == "e" {
		// fmt.Print("Salt: ")
		// fmt.Scan(&salt)
		fmt.Print("enter string to encrypt: ")
	} else {
		fmt.Print("enter string to decreption: ")
	}
	scanner := bufio.NewScanner(os.Stdin)
	scanner.Scan() // use `for scanner.Scan()` to keep reading
	input = scanner.Text()
	fmt.Println(rangeCount)
	// EncryptString()
	str := passwordutil.Password{
		Text:       input,
		Cipher:     cipher,
		Reparation: rangeCount,
	}
	if resultType == "e" {
		fmt.Println(str.EncryptString())
	}
	if resultType == "d" {
		fmt.Println(str.DecryptString())
	}
}
