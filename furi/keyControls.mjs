export default class keyControls{
    constructor(app){
        this.forward=false;
        this.left   =false;
        this.right  =false;
        this.back   =false;
        this.break  =false;
        this.app=app
        this.key_handler=this.handleKeyEvent.bind(this)
        app.on('keydown', this.key_handler)
        app.on('keyup'  , this.key_handler)
    }

    handleKeyEvent({originalEvent:e}){
        let On=e.type==='keydown'
        switch(e.code){
            case "Numpad8"   :
            case "ArrowUp"   :this.forward=On;break;
            case "Numpad2"   :
            case "ArrowDown" :this.back   =On;break;
            case "Numpad4"   :
            case "ArrowLeft" :this.turnl  =On;break;
            case "Numpad6"   :
            case "ArrowRight":this.turnr  =On;break;
            case "Numpad7"   :
            case "PageUp"    :this.left   =On;break;
            case "Numpad9"   :
            case "PageDown"  :this.right  =On;break;
            case "Numpad5"   :
            case "Space"     :this.break  =On;break;
        }
        l(e)
    }

    destroy(){
        this.app.off('keydown', this.kd_handler)
        this.app.off('keyup'  , this.ku_handler)
    }
}