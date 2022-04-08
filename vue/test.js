let a = 'my'
const fn = {
    a: 'str',
    boo: emil => {
        this.a = emil
        console.log(this.a)
    }
}

fn.boo("new")
console.log(this.a)











