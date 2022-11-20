let g=globalThis
g.l=console.log
g.d=document

g.qs=Node.prototype.qs=function qs(n,multi=0){     
  let self = this===globalThis ? document : this
  if(multi) return self.querySelectorAll(n);
  return self.querySelector(n);
}

g.parse=function(str){
    return [...(new DOMParser()).parseFromString(str, "text/html").body.childNodes]
}