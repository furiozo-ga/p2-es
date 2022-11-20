export default class feControls extends EventTarget{
    constructor(app,cont){
        super()
        this.app=app
        this.cont=cont
        cont.classList.add('feControls')
        setTimeout(()=>{ cont.parentElement.onclick=e=>this.app.element.focus()},0)
        cont.append(...parse(`
            <input id="size1" placeholder="size1" value=5 size=2 style="width:20px;">
            <input id="spew"  type=checkbox>
            <button id=addbox>add box</button>
            <button id=clrsel>clr sel</button>
            <br><button id=takectrl>take ctrl</button>
            <button id=comeback>come back</button>
            <pre id=debug style="text-align: left;width: 17em;"></pre>
        `))

        let $_=this.spew=cont.qs('#spew')
        $_.onchange=(e)=>{
            if(e.target.checked){ e.target.interval=setInterval(()=>this.addBox(),100)}
            else{clearInterval(e.target.interval)}
        }
        
        $_=this.b_addBox=cont.qs('#addbox')
        $_.onclick=this.addBox.bind(this)

        $_=this.b_clrsel=cont.qs('#clrsel')
        $_.onclick=()=>this.app.selected.splice(0)

        $_=this.b_takectrl=cont.qs('#takectrl')
        $_.onclick=this.takectrl.bind(this)

        $_=this.b_comeback=cont.qs('#comeback')
        $_.onclick=()=>{
            this.app.selected.forEach(b=>{;[0,1].forEach(i=>b.position[i]=0)})
        }

        this.f_debug=cont.qs('#debug')

        p2.Body.prototype.debugInfo = function(){
            // l(this.position)
            return {
                x: this.position[0].toFixed(4),
                y: this.position[1].toFixed(4),
                v: this.velocity,
            }
        }

        setInterval(this.showDebug.bind(this),200)
    }

    addBox(){
        // Create dynamic box
        let boxBody = new p2.Body({
            mass: 1,
            position: [-5, 2],
        })
        boxBody.addShape(new p2.Box({ width: 0.5, height: 0.5 }))
        this.app.world.addBody(boxBody)

    }

    showDebug(){
        let str='time: '+this.app.world.time.toFixed(1)+'\n'
          +'objects: '+this.app.world.bodies.length+'\n'
        for(let b of this.app.selected){
            str+=JSON.stringify(b.debugInfo(),null,1)
        }
        this.f_debug.innerText=str
    }

    takectrl(){
        if(this.app.selected.length===0) return
        if(this.ctrld){}
        this.app.selected.at(-1).control=this.app.keyControls
    }
}

