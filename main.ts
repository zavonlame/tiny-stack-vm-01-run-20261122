import{mkdirSync as A,readFileSync as B,readdirSync as C,writeFileSync as D}from"node:fs";
const I=process.env.MAKEFUN_INPUT_DIR??"/input",O=process.env.MAKEFUN_OUTPUT_DIR??"/output";
const U="000112230000000022222221222122202220000000000000011000000000000012000000000000001101",V="011022330000000011111111111111101110000000000000000000000000000010000000000000000010";
function run(P,N){
const n=P.length,D=new Int32Array(256),E=new Int32Array(64),W=new Int32Array(256),o=new Uint8Array(65536);
let s=0,c=0,l=0,p=0,pc=0,t=0;
const d=e=>[Buffer.from(o.subarray(0,l)),e];
for(;;){
if(t==1e6)return d(10);
if(pc<0||pc>=n)return d(9);
const b=P[pc];
if(!(b<8||b>15&&b<31||b>31&&b<35||b>47&&b<53||b>63&&b<66||b>79&&b<84))return d(5);
const m=b==1?1:b==2?4:b>47&&b<52?2:0,u=U[b]|0,v=V[b]|0;
if(pc+m>=n)return d(9);
t++;
if(s<u)return d(2);
if(s-u+v>256)return d(3);
pc+=1+m;
switch(b){
case 0:return d(0);
case 1:D[s++]=P[pc-1]<<24>>24;break;
case 2:D[s++]=P[pc-4]|P[pc-3]<<8|P[pc-2]<<16|P[pc-1]<<24;break;
case 3:s--;break;
case 4:D[s]=D[s-1];s++;break;
case 5:{const x=D[s-1];D[s-1]=D[s-2];D[s-2]=x;break;}
case 6:D[s]=D[s-2];s++;break;
case 7:{const a=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=a;break;}
case 23:D[s-1]=-D[s-1]|0;break;
case 27:D[s-1]=~D[s-1];break;
case 48:case 49:case 50:{
const r=(P[pc-2]|P[pc-1]<<8)<<16>>16;
let k=1;
if(b!=48){const v=D[--s];k=b==49?v==0:v!=0;}
if(k)pc+=r;
break;}
case 51:
if(c==64)return d(7);
E[c++]=pc;
pc=P[pc-2]|P[pc-1]<<8;
break;
case 52:
if(c==0)return d(8);
pc=E[--c];
break;
case 64:{
const a=D[s-1];
if(a<0||a>255)return d(6);
D[s-1]=W[a];
break;}
case 65:{
const a=D[s-1],v=D[s-2];
if(a<0||a>255)return d(6);
s-=2;
W[a]=v;
break;}
case 80:{
const g=""+D[s-1];
if(l+g.length>65536)return d(11);
s--;
for(let i=0;i<g.length;i++)o[l++]=g.charCodeAt(i);
break;}
case 81:
if(l+1>65536)return d(11);
o[l++]=D[--s]&255;
break;
case 82:D[s++]=p<N.length?N[p++]:-1;break;
case 83:return d(D[--s]&255);
default:{
const y=D[s-1],x=D[s-2];
let r;
if(b==16)r=x+y|0;
else if(b==17)r=x-y|0;
else if(b==18)r=Math.imul(x,y);
else if(b==19){if(y==0)return d(4);r=x==-2147483648&&y==-1?x:x/y|0;}
else if(b==20){if(y==0)return d(4);r=y==-1?0:x%y|0;}
else if(b==21){if(y==0)return d(4);r=Math.floor((x>>>0)/(y>>>0))|0;}
else if(b==22){if(y==0)return d(4);r=(x>>>0)%(y>>>0)|0;}
else if(b==24)r=x&y;
else if(b==25)r=x|y;
else if(b==26)r=x^y;
else if(b==28)r=x<<(y&31);
else if(b==29)r=x>>(y&31);
else if(b==30)r=x>>>(y&31)|0;
else if(b==32)r=x==y?1:0;
else if(b==33)r=x<y?1:0;
else r=(x>>>0)<(y>>>0)?1:0;
s-=2;
D[s++]=r;
break;}
}
}
}
for(const q of C(I,{withFileTypes:true}).sort((a,b)=>a.name<b.name?-1:1)){
if(!q.isDirectory())continue;
const[a,e]=run(B(I+"/"+q.name+"/program.bin"),B(I+"/"+q.name+"/input.bin"));
A(O+"/"+q.name,{recursive:true});
D(O+"/"+q.name+"/stdout.bin",a);
D(O+"/"+q.name+"/exit.txt",e+"\n");
}
