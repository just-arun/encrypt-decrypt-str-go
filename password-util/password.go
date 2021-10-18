package passwordutil

import (
	"strconv"
	"strings"
	"time"
)

var (
	char = []string{
		"n", "o", "p", "q", "r", "s",
		"0", "1", "2", "3", "4", "5",
		"M", "N", "O", "P",
		"6", "7", "8", "9", "~", "!",
		"t", "u", "v", "w", "x", "y",
		"@", "#", "$", "%", "^", "&",
		"Q", "R", "S", "T",
		"b", "c", "d", "e", "f", "g",
		"*", "(", ")", "_", "-", "+",
		"U", "V", "W", "X",
		"=", "{", "}", "[", "]", "|",
		"h", "i", "j", "k", "l", "m",
		"\\", ":", ";", "'", "\"", ",",
		"I", "J", "K", "L",
		"<", ".", ">", "/", "?", "a",
		"z", " ", "A", "B", "C", "D",
		"E", "F", "G", "H",
		"Y", "Z",
	}
)

type Password struct {
	Text       string
	Cipher     int
	Reparation int
}

func (p *Password) DecryptString() string {
	arr := strings.Split(p.Text, "")
	salt, err := strconv.Atoi(arr[0:1][0])
	if err != nil {
		return ""
	}
	p.Reparation = salt
	dcs := strings.Join(arr[1:len(arr)-1+1], "")
	for i := 0; i <= p.Reparation; i++ {
		dcs = p.decryptString(dcs)
	}
	return dcs
}

func (p *Password) EncryptString() string {
	p.Cipher, _ = strconv.Atoi(strings.Split(strconv.Itoa(time.Now().Second()), "")[0])
	ecs := p.Text
	for i := 0; i <= p.Reparation; i++ {
		ecs = p.encryptString(ecs)
	}
	return strconv.Itoa(p.Reparation) + ecs
}

func (p *Password) decryptString(text string) string {
	output := ""
	var cip int
	dArr := strings.Split(text, "")
	last := len(dArr) - 1
	d := dArr[len(dArr)-1]
	func() {
		for i, c := range char {
			if c == d {
				cip = i
				return
			}
		}
	}()
	newChar := getNewChar(cip)
	for i, c := range strings.Split(text, "") {
		if i != last {
			output += getCharMap(c, newChar, char, " ")
		}
	}

	return output
}

func (p *Password) encryptString(text string) string {
	newChar := getNewChar(p.Cipher)
	output := ""
	for _, c := range strings.Split(text, "") {
		output += getCharMap(c, char, newChar, "🤭")
	}
	output += char[p.Cipher]
	return output
}

func getNewChar(cipher int) (newChar []string) {
	for i := cipher; i < len(char); i++ {
		newChar = append(newChar, char[i])
	}
	for i := 0; i < cipher; i++ {
		newChar = append(newChar, char[i])
	}
	return
}

func getCharMap(c string, reference []string, target []string, space string) string {
	for i, ch := range reference {
		if ch == c {
			return target[i]
		}
	}
	return space
}
