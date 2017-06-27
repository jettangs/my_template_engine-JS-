
let html = document.getElementsByTagName("html")[0]

let render = (obj,data) => {
    let template = obj.innerHTML
    let varRex = /\{\{([A-Za-z_\$]+(\.[A-Za-z_\$]+|[A-Za-z0-9_\$])*)\}\}/g
    let tagRex = /\{\%(.+)\%\}/g
    let com = ["if", "else", "elif", "endif", "for", "endfor"]
    obj.innerHTML = template.replace(varRex, ($, $1) => {
        let innerdata = data;
        let items = $1.trim().split('.')
        for (let i = 0; i < items.length; i++) {
            if(!innerdata[items[i]]) return $
            innerdata = innerdata[items[i]]
        }
        return innerdata  //返回数据给下次匹配
    })

    let flows = []
        // if("end".indexOf(p) > 0){
            // console.error("The ending command first execute:"+$1);
        // }
    //let buf = document.createElement("div");
    obj.innerHTML = template.replace(tagRex, ($, $1, $3) => {
        console.log($)
        let p = $1.trim().split('(')[0].trim()
        if(!com.contains(p)){ 
            console.error("unknow command:"+$1);
            return
        }
        
        let f = {}
        f['c'] = p
        f['s'] = $3
        flows.push(f)
        flows.push({})
    })
    console.log(flows)
    // let len = flows.length
    // for(let i = 0; i < len/2; i+=2)
    // {
        // flows[i+1] = flows[len-2-i]
        // //console.log(i)
    // }
    //console.log(flows.slice(0,len/2))
}

//let person = {'name':'zo','info':{'age':'12','sex':'male'}}

window.onload = () => {
	fetch("/srt/V_for_Vendetta", {
		method: 'GET',
	})
	.then(res => res.json())
	.then(data=>{
		render(html,data)
	})
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

