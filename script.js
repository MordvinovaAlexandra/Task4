const b = require('crypto')
//key
class Ke {
    constructor() {
        this.key = b.randomBytes(64)
    }
}
//hmax
class HMAC {
    constructor(message, key) {
        this.key=key
        this.message=message
        this.hash = b.createHmac('sha512', key.key).update(message).digest('hex')
    }
}
//menu
class Mof {
    constructor(moves, rules) {
        this.moves = moves
        this.rules = rules
    }
    Opt() {
        console.log('Available moves')
        moves.forEach((item,index)=>{
            console.log(++index, item)
        })
        console.log('0 exit')
        console.log('? help')
    }
    Help() {
        let x = (this.moves.map((item)=>item.length))
        let y=Math.max(...x)
        //Метод repeat() конструирует и возвращает новую строку, содержащую указанное количество соединённых вместе копий строки, на которой он был вызван.
        let s = '═'.repeat(x)
        let j = 1;
       
        console.log('|---' + s + '-----' + s + '------|')
        console.log('| ' + ''.repeat((y - 1) / 2) + 'Win' + ' '.repeat(y / 2) + '|' + ' '.repeat((y - 1) / 2) + 'Lose' + '|')
        console.log('|______________|')
        console.log('' + s + '' + s + '')
        this.rules.map.forEach((value, key) => {
            value.forEach((e, i, a) => {
                console.log('|' + key + ' '.repeat(x - key.length) + '|' + e + ' '.repeat(x - e.length) + '|')
                if (j === this.rules.map.size && i === a.length - 1) {
                    console.log('-----' + s + '----' + s + '----')
                } else {
                    console.log('-----' + s + '----' + s + '----')
                }
            })
            j++;
        })
    }
}
////rules
class Pravila {
    constructor(moves) {
        this.map = new Map()
        let l = moves.length
        let half = l / 2 | 0
        moves = moves.concat(moves)
        for (let i = 0; i < l; ++i) {
            let j = (((i - half) % l) + l) % l
            this.map.set(moves[i], moves.slice(j, j + half))
        }
    }
    checkMove(l, r) {
        return (l === r) ? 'draw' : ((this.map.get(l).includes(r) ? 'win' : 'loss'))
    }}


let moves = process.argv.slice(2)
let stdin = process.openStdin()
f = () => {
    let x = Math.floor(Math.random() * moves.length)
    let k = new Ke()
    let h = new HMAC(moves[x], k)
    console.log('HMAC', h.hash)
    return x, k
}

let copy = moves.map(x => x.toLowerCase())
if (moves.length < 3 || !(moves.length % 2) || new Set(copy).size !== copy.length) {
    console.log('Please specify a number of unique moves that is more than 3 and is an odd number')
    process.exit()
}
let rules = new Pravila(moves)
let menu = new Mof(moves, rules)
menu.Opt()
let aiMove, key = f()
stdin.addListener('data', (data) => {
    var input = data.toString().trim()
    switch (input) {
        case '0': {
            process.exit()
          
        }
        case '?': {
            menu.Help()
            break
        }
        
        default: {
            let move = parseInt(input) - 1
            if (move in moves) {
                let mof = Math.floor(Math.random() * moves.length)
                console.log('Your move:', moves[move] + ',', 'computer\'s move:', moves[mof])
                console.log('It\'s a', rules.checkMove(moves[move], moves[mof]))
                console.log('key:', [...key.key].join(''))
                console.log('-----------------')
                 mof, key = f()
            }
        }
    }
    menu.Opt()
})