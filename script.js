
let html = document.getElementsByTagName("html")[0]
let person = {'name':'zo','house':['a','b','c'],'info':{'age':'12','sex':'male'}}
let command =  ["if", "else", "elif", "endif", "for", "endfor"]
var a = {"first":1,"second":2,"third":3};
for(let i = 0; i < a.length; i++){
    console.log(a[i])
}
let render = (obj, data) => {
    let tmpl = obj.innerHTML
    //let varRex = /\{\{([A-Za-z_\$]+(\.[A-Za-z_\$]+|[A-Za-z0-9_\$])*)\}\}/g
    let varRex = /\{\{.*\}\}/g
    let comRex = /\{\%.*\%\}/g
    let allRex = /((?:\{\{.*\}\})|(?:\{%.*%\}))/g

    parse = (t,p) => {
        let o = allRex.exec(tmpl)
        let c = o[0].trim()
        let n = o.index
        if(varRex.exec(c)){
            c = c.trim("\{\}\s");
        }else if(comRex.exec(c)){
            c = c.trim("\{\%\}\s")
            let d = c.trim('\(\)').split(' ')
            console.log(d)
            c = c.split('(')[0].trim()
            if(!command.contains(c)){ 
                console.error("unknow command:"+c);
                return
            }
            if("end".indexOf(c) > 0 && p == 0){
                console.error("The ending command first execute:"+$1)
                return
            }
            if(c == "end"+c){ //error
                let arr = data[d[2]]
                let it = document.createElement("div")
                t = t.substring(p,n)
                t.replace(varRex, ($, $1) => {
                    let idata = data;
                    let items = $1.trim().split('.')
                    for (let i = 0; i < items.length; i++) {
                        if(!idata[items[i]]) return $
                        idata = arr[i]
                    }
                    return idata  //返回数据给下次匹配
                })
                return {t,n+o[0].length}
            }else{
                parse(t,n+o[0].length)
            }
        }
    }
}


window.onload = () => {
	render(html,person)
}

Array.prototype.contains = function (obj) {  
    var i = this.length;  
    while (i--) {  
        if (this[i] === obj) {  
            return true;  
        }  
    }  
    return false;  
} 

String.prototype.trim = function (char, type) {
    if (char){
        console.log(char)
    return this.replace(new RegExp('['+char+']*', 'g'), '');
    }
    return this.replace(/^\s+|\s+$/g, '');
}

