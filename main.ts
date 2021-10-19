import jsSha512 from 'js-sha512'

const char = ["n", "o", "p", "q", "r", "s", "0", "1", "2", "3", "4", "5", "M", "N", "O", "P", "6", "7", "8", "9", "~", "!", "t", "u", "v", "w", "x", "y", "@", "#", "$", "%", "^", "&", "Q", "R", "S", "T", "b", "c", "d", "e", "f", "g", "*", "(", ")", "_", "-", "+", "U", "V", "W", "X", "=", "{", "}", "[", "]", "|", "h", "i", "j", "k", "l", "m", "\\", ":", ";", "'", "\"", ",", "I", "J", "K", "L", "<", ".", ">", "/", "?", "a", "z", " ", "A", "B", "C", "D", "E", "F", "G", "H", "Y", "Z",]

interface EncryptProp {
	text: string;
	cipher: number;
	reparation: number;
}

export class Encrypt {
	text: string;
	cipher: number;
	reparation: number;
	constructor(data: EncryptProp) {
		this.text = data.text;
		this.cipher = data.cipher;
		this.reparation = data.reparation;
	}

	public encrypt() {
		let str = Date.now().toString()
		this.cipher = Number(str[str.length - 1]);
		this.reparation = Number(str[str.length - 1]);
		let ecs = this.text;
		for (let i = 0; i <= this.reparation; i++) {
			ecs = this.encryptString(ecs)
		}
		return String(this.reparation) + ecs
	}
	private encryptString(text: string): string {
		let newChar = this.getNewChar(this.cipher);
		let output = "";
		text.split("").forEach(c => {
			output += this.getCharMap(c, char, newChar, "🤭")
		})
		output += char[this.cipher];
		return output
	}
	private getCharMap(c: string, ref: string[], target: string[], space: string): string {
		for (let i = 0; i < ref.length; i++) {
			const ch = ref[i];
			if (ch == c) {
				return target[i];
			}
		}
		return space
	}
	private getNewChar(cipher: number): string[] {
		let newChar = [];
		for (let i = cipher; i < char.length; i++) {
			newChar.push(char[i])
		}
		for (let i = 0; i < cipher; i++) {
			newChar.push(char[i]);
		}
		return newChar;
	}
}


export const EncryptObject = (obj: any) => {
	let newObj: any = {};
	for (const key in obj) {
		if (key == "password") {
			let hash = jsSha512.sha512.update(obj[key])
			newObj[key] = hash.hex();
		} else {
			let text = new Encrypt({ text: obj[key], cipher: 0, reparation: 0 })
			newObj[key] = text.encrypt();
		}
	}
	return newObj;
}


const main = (arg: string) => {
	let data = {
		email: "user@mail.com",
		name: "user name",
		password: "pwd123"
	}
	let result = EncryptObject(data)
	console.log(result);
}
main("arunberry47@gmail.com");








