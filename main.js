'use strict'

const BUILD_BLOCKS = [];
const WORKING_AREA = [];

const GLOBAL_SETTINGS = {

    buildBlock: {
        width: 30,
        height: 30,
    },

    workingArea: {
        totalArea: 0,
        totalPrice: 0,
        totalBlocks: 0,
        maxArea: 10000,
        maxPrice: 10000,
        maxBlocks: 10000,
    },

    currentlySelectedBuildBlock: 0,
    currentlySelectedWorkingAreaBlock: 0,

    supportedMaterials: [
        'Construction',
        'Electronics',
        'Home',
        'Greens',
        'Other'
    ],

    filteringButtons: {
        numOfClicked: 0,
        btn1IsClicked: false,
        btn2IsClicked: false,
        btn3IsClicked: false,
        btn4IsClicked: false,
        btn5IsClicked: false,
    },

    project: {
        name: "",
        email: "",
        author: "",
        created: "",
        modified: "",
        rating: 0,
    },

    secretPassphrase: "J4Zb!WMfYDuFd*+B5+qU#KCS@CbPn$^8!DfSVRUcPn2kr4ktmRr2jTTTE7N+DTZB"
};

class Log {
    constructor() {
    }

    // DEBUG = 0,
    // INFO  = 1,
    // WARN  = 2,
    // ERROR = 3,

    toDLog(message) {
        this.toLog(message, 0, 'top-right');
    }

    toILog(message) {
        this.toLog(message, 1, 'top-right');
    }

    toWLog(message) {
        this.toLog(message, 2, 'top-right');
    }

    toELog(message) {
        this.toLog(message, 3, 'top-right');
    }

    toLog(message, level, pos) {
        let actionTextColor;
        switch (level) {
            case 0:
                actionTextColor = 'blue';
                break;
            case 1:
                actionTextColor = 'green';
                break;
            case 2:
                actionTextColor = 'yellow';
                break;
            default:
                actionTextColor = 'red';
                break;
        }
        Snackbar.show({
            text: message,
            pos: pos,
            showAction: true,
            actionText: 'Ok',
            actionTextColor: actionTextColor
        });
    }
}

class BuildBlock {
    constructor(tileId, name, price, materialId, available = 500) {
        this._available = available;
        this._name = name;
        this._price = price;
        this._tileId = tileId;
        this._materialId = materialId >= GLOBAL_SETTINGS.supportedMaterials.length ? 0 : materialId;
    }

    set name(name) {
        this._name = name;
    }

    set price(price) {
        this._price = price;
    }

    set available(available) {
        this._available = available;
    }

    set materialId(materialId) {
        this._materialId = materialId;
    }

    get name() {
        return this._name;
    }

    get width() {
        return GLOBAL_SETTINGS.buildBlock.width;
    }

    get price() {
        return this._price;
    }

    get tileId() {
        return this._tileId;
    }

    get square() {
        return 1;
    }

    get height() {
        return GLOBAL_SETTINGS.buildBlock.height;
    }

    get available() {
        return this._available;
    }

    get imageUrl() {
        return "url('./img/tiles/" + this._tileId + ".png')";
    }

    get materialId() {
        return this._materialId;
    }
}

class WorkingAreaBlock {
    constructor(id) {
        this._id = id;
        this._blocks = [483];
        this._rotateValue = 0;
    }

    set id(id) {
        this._id = id;
    }

    get id() {
        return this._id;
    }

    get width() {
        return GLOBAL_SETTINGS.buildBlock.width;
    }

    get height() {
        return GLOBAL_SETTINGS.buildBlock.height;
    }

    get imageUrl() {
        let url = "";
        for (let i = 0; i < this._blocks.length; ++i) {
            url += BUILD_BLOCKS[this._blocks[i]].imageUrl + ',';
        }
        return url.substring(url.length - 1, 0);
    }

    get rotateValue() {
        return this._rotateValue;
    }

    get blocks() {
        return this._blocks;
    }

    get blocksLength() {
        return this._blocks.length;
    }

    rotate() {
        this._rotateValue += 90;
        if (this._rotateValue === 360) {
            this._rotateValue = 0;
        }
    }

    popBlock() {
        if (this._blocks.length >= 2) {
            return this._blocks.shift();
        }
        return -1;
    }

    pushBlock(id) {
        this._blocks.unshift(id);
    }

    removeAllBlocks() {
        if (this._blocks.length >= 2) {
            const size = this._blocks.length;
            for (let i = 0; i < size; ++i) {
                this.popBlock();
            }
        }
    }
}

const log = new Log();

var CryptoJS=CryptoJS||function(u,p){var d={},l=d.lib={},s=function(){},t=l.Base={extend:function(a){s.prototype=this;var c=new s;a&&c.mixIn(a);c.hasOwnProperty("init")||(c.init=function(){c.$super.init.apply(this,arguments)});c.init.prototype=c;c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
r=l.WordArray=t.extend({init:function(a,c){a=this.words=a||[];this.sigBytes=c!=p?c:4*a.length},toString:function(a){return(a||v).stringify(this)},concat:function(a){var c=this.words,e=a.words,j=this.sigBytes;a=a.sigBytes;this.clamp();if(j%4)for(var k=0;k<a;k++)c[j+k>>>2]|=(e[k>>>2]>>>24-8*(k%4)&255)<<24-8*((j+k)%4);else if(65535<e.length)for(k=0;k<a;k+=4)c[j+k>>>2]=e[k>>>2];else c.push.apply(c,e);this.sigBytes+=a;return this},clamp:function(){var a=this.words,c=this.sigBytes;a[c>>>2]&=4294967295<<
32-8*(c%4);a.length=u.ceil(c/4)},clone:function(){var a=t.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var c=[],e=0;e<a;e+=4)c.push(4294967296*u.random()|0);return new r.init(c,a)}}),w=d.enc={},v=w.Hex={stringify:function(a){var c=a.words;a=a.sigBytes;for(var e=[],j=0;j<a;j++){var k=c[j>>>2]>>>24-8*(j%4)&255;e.push((k>>>4).toString(16));e.push((k&15).toString(16))}return e.join("")},parse:function(a){for(var c=a.length,e=[],j=0;j<c;j+=2)e[j>>>3]|=parseInt(a.substr(j,
2),16)<<24-4*(j%8);return new r.init(e,c/2)}},b=w.Latin1={stringify:function(a){var c=a.words;a=a.sigBytes;for(var e=[],j=0;j<a;j++)e.push(String.fromCharCode(c[j>>>2]>>>24-8*(j%4)&255));return e.join("")},parse:function(a){for(var c=a.length,e=[],j=0;j<c;j++)e[j>>>2]|=(a.charCodeAt(j)&255)<<24-8*(j%4);return new r.init(e,c)}},x=w.Utf8={stringify:function(a){try{return decodeURIComponent(escape(b.stringify(a)))}catch(c){throw Error("Malformed UTF-8 data");}},parse:function(a){return b.parse(unescape(encodeURIComponent(a)))}},
q=l.BufferedBlockAlgorithm=t.extend({reset:function(){this._data=new r.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=x.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var c=this._data,e=c.words,j=c.sigBytes,k=this.blockSize,b=j/(4*k),b=a?u.ceil(b):u.max((b|0)-this._minBufferSize,0);a=b*k;j=u.min(4*a,j);if(a){for(var q=0;q<a;q+=k)this._doProcessBlock(e,q);q=e.splice(0,a);c.sigBytes-=j}return new r.init(q,j)},clone:function(){var a=t.clone.call(this);
a._data=this._data.clone();return a},_minBufferSize:0});l.Hasher=q.extend({cfg:t.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){q.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(b,e){return(new a.init(e)).finalize(b)}},_createHmacHelper:function(a){return function(b,e){return(new n.HMAC.init(a,
e)).finalize(b)}}});var n=d.algo={};return d}(Math);
(function(){var u=CryptoJS,p=u.lib.WordArray;u.enc.Base64={stringify:function(d){var l=d.words,p=d.sigBytes,t=this._map;d.clamp();d=[];for(var r=0;r<p;r+=3)for(var w=(l[r>>>2]>>>24-8*(r%4)&255)<<16|(l[r+1>>>2]>>>24-8*((r+1)%4)&255)<<8|l[r+2>>>2]>>>24-8*((r+2)%4)&255,v=0;4>v&&r+0.75*v<p;v++)d.push(t.charAt(w>>>6*(3-v)&63));if(l=t.charAt(64))for(;d.length%4;)d.push(l);return d.join("")},parse:function(d){var l=d.length,s=this._map,t=s.charAt(64);t&&(t=d.indexOf(t),-1!=t&&(l=t));for(var t=[],r=0,w=0;w<
l;w++)if(w%4){var v=s.indexOf(d.charAt(w-1))<<2*(w%4),b=s.indexOf(d.charAt(w))>>>6-2*(w%4);t[r>>>2]|=(v|b)<<24-8*(r%4);r++}return p.create(t,r)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}})();
(function(u){function p(b,n,a,c,e,j,k){b=b+(n&a|~n&c)+e+k;return(b<<j|b>>>32-j)+n}function d(b,n,a,c,e,j,k){b=b+(n&c|a&~c)+e+k;return(b<<j|b>>>32-j)+n}function l(b,n,a,c,e,j,k){b=b+(n^a^c)+e+k;return(b<<j|b>>>32-j)+n}function s(b,n,a,c,e,j,k){b=b+(a^(n|~c))+e+k;return(b<<j|b>>>32-j)+n}for(var t=CryptoJS,r=t.lib,w=r.WordArray,v=r.Hasher,r=t.algo,b=[],x=0;64>x;x++)b[x]=4294967296*u.abs(u.sin(x+1))|0;r=r.MD5=v.extend({_doReset:function(){this._hash=new w.init([1732584193,4023233417,2562383102,271733878])},
_doProcessBlock:function(q,n){for(var a=0;16>a;a++){var c=n+a,e=q[c];q[c]=(e<<8|e>>>24)&16711935|(e<<24|e>>>8)&4278255360}var a=this._hash.words,c=q[n+0],e=q[n+1],j=q[n+2],k=q[n+3],z=q[n+4],r=q[n+5],t=q[n+6],w=q[n+7],v=q[n+8],A=q[n+9],B=q[n+10],C=q[n+11],u=q[n+12],D=q[n+13],E=q[n+14],x=q[n+15],f=a[0],m=a[1],g=a[2],h=a[3],f=p(f,m,g,h,c,7,b[0]),h=p(h,f,m,g,e,12,b[1]),g=p(g,h,f,m,j,17,b[2]),m=p(m,g,h,f,k,22,b[3]),f=p(f,m,g,h,z,7,b[4]),h=p(h,f,m,g,r,12,b[5]),g=p(g,h,f,m,t,17,b[6]),m=p(m,g,h,f,w,22,b[7]),
f=p(f,m,g,h,v,7,b[8]),h=p(h,f,m,g,A,12,b[9]),g=p(g,h,f,m,B,17,b[10]),m=p(m,g,h,f,C,22,b[11]),f=p(f,m,g,h,u,7,b[12]),h=p(h,f,m,g,D,12,b[13]),g=p(g,h,f,m,E,17,b[14]),m=p(m,g,h,f,x,22,b[15]),f=d(f,m,g,h,e,5,b[16]),h=d(h,f,m,g,t,9,b[17]),g=d(g,h,f,m,C,14,b[18]),m=d(m,g,h,f,c,20,b[19]),f=d(f,m,g,h,r,5,b[20]),h=d(h,f,m,g,B,9,b[21]),g=d(g,h,f,m,x,14,b[22]),m=d(m,g,h,f,z,20,b[23]),f=d(f,m,g,h,A,5,b[24]),h=d(h,f,m,g,E,9,b[25]),g=d(g,h,f,m,k,14,b[26]),m=d(m,g,h,f,v,20,b[27]),f=d(f,m,g,h,D,5,b[28]),h=d(h,f,
m,g,j,9,b[29]),g=d(g,h,f,m,w,14,b[30]),m=d(m,g,h,f,u,20,b[31]),f=l(f,m,g,h,r,4,b[32]),h=l(h,f,m,g,v,11,b[33]),g=l(g,h,f,m,C,16,b[34]),m=l(m,g,h,f,E,23,b[35]),f=l(f,m,g,h,e,4,b[36]),h=l(h,f,m,g,z,11,b[37]),g=l(g,h,f,m,w,16,b[38]),m=l(m,g,h,f,B,23,b[39]),f=l(f,m,g,h,D,4,b[40]),h=l(h,f,m,g,c,11,b[41]),g=l(g,h,f,m,k,16,b[42]),m=l(m,g,h,f,t,23,b[43]),f=l(f,m,g,h,A,4,b[44]),h=l(h,f,m,g,u,11,b[45]),g=l(g,h,f,m,x,16,b[46]),m=l(m,g,h,f,j,23,b[47]),f=s(f,m,g,h,c,6,b[48]),h=s(h,f,m,g,w,10,b[49]),g=s(g,h,f,m,
E,15,b[50]),m=s(m,g,h,f,r,21,b[51]),f=s(f,m,g,h,u,6,b[52]),h=s(h,f,m,g,k,10,b[53]),g=s(g,h,f,m,B,15,b[54]),m=s(m,g,h,f,e,21,b[55]),f=s(f,m,g,h,v,6,b[56]),h=s(h,f,m,g,x,10,b[57]),g=s(g,h,f,m,t,15,b[58]),m=s(m,g,h,f,D,21,b[59]),f=s(f,m,g,h,z,6,b[60]),h=s(h,f,m,g,C,10,b[61]),g=s(g,h,f,m,j,15,b[62]),m=s(m,g,h,f,A,21,b[63]);a[0]=a[0]+f|0;a[1]=a[1]+m|0;a[2]=a[2]+g|0;a[3]=a[3]+h|0},_doFinalize:function(){var b=this._data,n=b.words,a=8*this._nDataBytes,c=8*b.sigBytes;n[c>>>5]|=128<<24-c%32;var e=u.floor(a/
4294967296);n[(c+64>>>9<<4)+15]=(e<<8|e>>>24)&16711935|(e<<24|e>>>8)&4278255360;n[(c+64>>>9<<4)+14]=(a<<8|a>>>24)&16711935|(a<<24|a>>>8)&4278255360;b.sigBytes=4*(n.length+1);this._process();b=this._hash;n=b.words;for(a=0;4>a;a++)c=n[a],n[a]=(c<<8|c>>>24)&16711935|(c<<24|c>>>8)&4278255360;return b},clone:function(){var b=v.clone.call(this);b._hash=this._hash.clone();return b}});t.MD5=v._createHelper(r);t.HmacMD5=v._createHmacHelper(r)})(Math);
(function(){var u=CryptoJS,p=u.lib,d=p.Base,l=p.WordArray,p=u.algo,s=p.EvpKDF=d.extend({cfg:d.extend({keySize:4,hasher:p.MD5,iterations:1}),init:function(d){this.cfg=this.cfg.extend(d)},compute:function(d,r){for(var p=this.cfg,s=p.hasher.create(),b=l.create(),u=b.words,q=p.keySize,p=p.iterations;u.length<q;){n&&s.update(n);var n=s.update(d).finalize(r);s.reset();for(var a=1;a<p;a++)n=s.finalize(n),s.reset();b.concat(n)}b.sigBytes=4*q;return b}});u.EvpKDF=function(d,l,p){return s.create(p).compute(d,
l)}})();
CryptoJS.lib.Cipher||function(u){var p=CryptoJS,d=p.lib,l=d.Base,s=d.WordArray,t=d.BufferedBlockAlgorithm,r=p.enc.Base64,w=p.algo.EvpKDF,v=d.Cipher=t.extend({cfg:l.extend(),createEncryptor:function(e,a){return this.create(this._ENC_XFORM_MODE,e,a)},createDecryptor:function(e,a){return this.create(this._DEC_XFORM_MODE,e,a)},init:function(e,a,b){this.cfg=this.cfg.extend(b);this._xformMode=e;this._key=a;this.reset()},reset:function(){t.reset.call(this);this._doReset()},process:function(e){this._append(e);return this._process()},
finalize:function(e){e&&this._append(e);return this._doFinalize()},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(e){return{encrypt:function(b,k,d){return("string"==typeof k?c:a).encrypt(e,b,k,d)},decrypt:function(b,k,d){return("string"==typeof k?c:a).decrypt(e,b,k,d)}}}});d.StreamCipher=v.extend({_doFinalize:function(){return this._process(!0)},blockSize:1});var b=p.mode={},x=function(e,a,b){var c=this._iv;c?this._iv=u:c=this._prevBlock;for(var d=0;d<b;d++)e[a+d]^=
c[d]},q=(d.BlockCipherMode=l.extend({createEncryptor:function(e,a){return this.Encryptor.create(e,a)},createDecryptor:function(e,a){return this.Decryptor.create(e,a)},init:function(e,a){this._cipher=e;this._iv=a}})).extend();q.Encryptor=q.extend({processBlock:function(e,a){var b=this._cipher,c=b.blockSize;x.call(this,e,a,c);b.encryptBlock(e,a);this._prevBlock=e.slice(a,a+c)}});q.Decryptor=q.extend({processBlock:function(e,a){var b=this._cipher,c=b.blockSize,d=e.slice(a,a+c);b.decryptBlock(e,a);x.call(this,
e,a,c);this._prevBlock=d}});b=b.CBC=q;q=(p.pad={}).Pkcs7={pad:function(a,b){for(var c=4*b,c=c-a.sigBytes%c,d=c<<24|c<<16|c<<8|c,l=[],n=0;n<c;n+=4)l.push(d);c=s.create(l,c);a.concat(c)},unpad:function(a){a.sigBytes-=a.words[a.sigBytes-1>>>2]&255}};d.BlockCipher=v.extend({cfg:v.cfg.extend({mode:b,padding:q}),reset:function(){v.reset.call(this);var a=this.cfg,b=a.iv,a=a.mode;if(this._xformMode==this._ENC_XFORM_MODE)var c=a.createEncryptor;else c=a.createDecryptor,this._minBufferSize=1;this._mode=c.call(a,
this,b&&b.words)},_doProcessBlock:function(a,b){this._mode.processBlock(a,b)},_doFinalize:function(){var a=this.cfg.padding;if(this._xformMode==this._ENC_XFORM_MODE){a.pad(this._data,this.blockSize);var b=this._process(!0)}else b=this._process(!0),a.unpad(b);return b},blockSize:4});var n=d.CipherParams=l.extend({init:function(a){this.mixIn(a)},toString:function(a){return(a||this.formatter).stringify(this)}}),b=(p.format={}).OpenSSL={stringify:function(a){var b=a.ciphertext;a=a.salt;return(a?s.create([1398893684,
1701076831]).concat(a).concat(b):b).toString(r)},parse:function(a){a=r.parse(a);var b=a.words;if(1398893684==b[0]&&1701076831==b[1]){var c=s.create(b.slice(2,4));b.splice(0,4);a.sigBytes-=16}return n.create({ciphertext:a,salt:c})}},a=d.SerializableCipher=l.extend({cfg:l.extend({format:b}),encrypt:function(a,b,c,d){d=this.cfg.extend(d);var l=a.createEncryptor(c,d);b=l.finalize(b);l=l.cfg;return n.create({ciphertext:b,key:c,iv:l.iv,algorithm:a,mode:l.mode,padding:l.padding,blockSize:a.blockSize,formatter:d.format})},
decrypt:function(a,b,c,d){d=this.cfg.extend(d);b=this._parse(b,d.format);return a.createDecryptor(c,d).finalize(b.ciphertext)},_parse:function(a,b){return"string"==typeof a?b.parse(a,this):a}}),p=(p.kdf={}).OpenSSL={execute:function(a,b,c,d){d||(d=s.random(8));a=w.create({keySize:b+c}).compute(a,d);c=s.create(a.words.slice(b),4*c);a.sigBytes=4*b;return n.create({key:a,iv:c,salt:d})}},c=d.PasswordBasedCipher=a.extend({cfg:a.cfg.extend({kdf:p}),encrypt:function(b,c,d,l){l=this.cfg.extend(l);d=l.kdf.execute(d,
b.keySize,b.ivSize);l.iv=d.iv;b=a.encrypt.call(this,b,c,d.key,l);b.mixIn(d);return b},decrypt:function(b,c,d,l){l=this.cfg.extend(l);c=this._parse(c,l.format);d=l.kdf.execute(d,b.keySize,b.ivSize,c.salt);l.iv=d.iv;return a.decrypt.call(this,b,c,d.key,l)}})}();
(function(){for(var u=CryptoJS,p=u.lib.BlockCipher,d=u.algo,l=[],s=[],t=[],r=[],w=[],v=[],b=[],x=[],q=[],n=[],a=[],c=0;256>c;c++)a[c]=128>c?c<<1:c<<1^283;for(var e=0,j=0,c=0;256>c;c++){var k=j^j<<1^j<<2^j<<3^j<<4,k=k>>>8^k&255^99;l[e]=k;s[k]=e;var z=a[e],F=a[z],G=a[F],y=257*a[k]^16843008*k;t[e]=y<<24|y>>>8;r[e]=y<<16|y>>>16;w[e]=y<<8|y>>>24;v[e]=y;y=16843009*G^65537*F^257*z^16843008*e;b[k]=y<<24|y>>>8;x[k]=y<<16|y>>>16;q[k]=y<<8|y>>>24;n[k]=y;e?(e=z^a[a[a[G^z]]],j^=a[a[j]]):e=j=1}var H=[0,1,2,4,8,
16,32,64,128,27,54],d=d.AES=p.extend({_doReset:function(){for(var a=this._key,c=a.words,d=a.sigBytes/4,a=4*((this._nRounds=d+6)+1),e=this._keySchedule=[],j=0;j<a;j++)if(j<d)e[j]=c[j];else{var k=e[j-1];j%d?6<d&&4==j%d&&(k=l[k>>>24]<<24|l[k>>>16&255]<<16|l[k>>>8&255]<<8|l[k&255]):(k=k<<8|k>>>24,k=l[k>>>24]<<24|l[k>>>16&255]<<16|l[k>>>8&255]<<8|l[k&255],k^=H[j/d|0]<<24);e[j]=e[j-d]^k}c=this._invKeySchedule=[];for(d=0;d<a;d++)j=a-d,k=d%4?e[j]:e[j-4],c[d]=4>d||4>=j?k:b[l[k>>>24]]^x[l[k>>>16&255]]^q[l[k>>>
8&255]]^n[l[k&255]]},encryptBlock:function(a,b){this._doCryptBlock(a,b,this._keySchedule,t,r,w,v,l)},decryptBlock:function(a,c){var d=a[c+1];a[c+1]=a[c+3];a[c+3]=d;this._doCryptBlock(a,c,this._invKeySchedule,b,x,q,n,s);d=a[c+1];a[c+1]=a[c+3];a[c+3]=d},_doCryptBlock:function(a,b,c,d,e,j,l,f){for(var m=this._nRounds,g=a[b]^c[0],h=a[b+1]^c[1],k=a[b+2]^c[2],n=a[b+3]^c[3],p=4,r=1;r<m;r++)var q=d[g>>>24]^e[h>>>16&255]^j[k>>>8&255]^l[n&255]^c[p++],s=d[h>>>24]^e[k>>>16&255]^j[n>>>8&255]^l[g&255]^c[p++],t=
d[k>>>24]^e[n>>>16&255]^j[g>>>8&255]^l[h&255]^c[p++],n=d[n>>>24]^e[g>>>16&255]^j[h>>>8&255]^l[k&255]^c[p++],g=q,h=s,k=t;q=(f[g>>>24]<<24|f[h>>>16&255]<<16|f[k>>>8&255]<<8|f[n&255])^c[p++];s=(f[h>>>24]<<24|f[k>>>16&255]<<16|f[n>>>8&255]<<8|f[g&255])^c[p++];t=(f[k>>>24]<<24|f[n>>>16&255]<<16|f[g>>>8&255]<<8|f[h&255])^c[p++];n=(f[n>>>24]<<24|f[g>>>16&255]<<16|f[h>>>8&255]<<8|f[k&255])^c[p++];a[b]=q;a[b+1]=s;a[b+2]=t;a[b+3]=n},keySize:8});u.AES=p._createHelper(d)})();

function fillBuildBlocks() {
    BUILD_BLOCKS.push(new BuildBlock(509, "...", 1293, 1));
    BUILD_BLOCKS.push(new BuildBlock(510, "...", 957, 1));
    BUILD_BLOCKS.push(new BuildBlock(511, "...", 1741, 1));
    BUILD_BLOCKS.push(new BuildBlock(512, "...", 495, 1));
    BUILD_BLOCKS.push(new BuildBlock(513, "...", 470, 1));
    BUILD_BLOCKS.push(new BuildBlock(514, "...", 854, 1));
    BUILD_BLOCKS.push(new BuildBlock(515, "...", 1065, 1));
    BUILD_BLOCKS.push(new BuildBlock(516, "...", 704, 1));
    BUILD_BLOCKS.push(new BuildBlock(517, "...", 1344, 1));
    BUILD_BLOCKS.push(new BuildBlock(518, "...", 1223, 1));
    BUILD_BLOCKS.push(new BuildBlock(519, "...", 432, 1));
    BUILD_BLOCKS.push(new BuildBlock(520, "...", 1217, 1));
    BUILD_BLOCKS.push(new BuildBlock(521, "...", 1416, 1));
    BUILD_BLOCKS.push(new BuildBlock(522, "...", 1582, 1));
    BUILD_BLOCKS.push(new BuildBlock(523, "...", 985, 1));
    BUILD_BLOCKS.push(new BuildBlock(290, "...", 35, 4));
    BUILD_BLOCKS.push(new BuildBlock(291, "...", 32, 4));
    BUILD_BLOCKS.push(new BuildBlock(292, "...", 33, 4));
    BUILD_BLOCKS.push(new BuildBlock(293, "...", 35, 4));
    BUILD_BLOCKS.push(new BuildBlock(294, "...", 36, 4));
    BUILD_BLOCKS.push(new BuildBlock(295, "...", 36, 4));
    BUILD_BLOCKS.push(new BuildBlock(296, "...", 33, 4));
    BUILD_BLOCKS.push(new BuildBlock(297, "...", 32, 4));
    BUILD_BLOCKS.push(new BuildBlock(298, "...", 34, 4));
    BUILD_BLOCKS.push(new BuildBlock(299, "...", 39, 4));
    BUILD_BLOCKS.push(new BuildBlock(300, "...", 35, 4));
    BUILD_BLOCKS.push(new BuildBlock(301, "...", 34, 4));
    BUILD_BLOCKS.push(new BuildBlock(302, "...", 39, 4));
    BUILD_BLOCKS.push(new BuildBlock(303, "...", 39, 4));
    BUILD_BLOCKS.push(new BuildBlock(304, "...", 34, 4));
    BUILD_BLOCKS.push(new BuildBlock(305, "...", 38, 4));
    BUILD_BLOCKS.push(new BuildBlock(306, "...", 30, 4));
    BUILD_BLOCKS.push(new BuildBlock(307, "...", 39, 4));
    BUILD_BLOCKS.push(new BuildBlock(308, "...", 31, 4));
    BUILD_BLOCKS.push(new BuildBlock(309, "...", 33, 4));
    BUILD_BLOCKS.push(new BuildBlock(310, "...", 34, 4));
    BUILD_BLOCKS.push(new BuildBlock(311, "...", 30, 4));
    BUILD_BLOCKS.push(new BuildBlock(312, "...", 36, 4));
    BUILD_BLOCKS.push(new BuildBlock(313, "...", 30, 4));
    BUILD_BLOCKS.push(new BuildBlock(314, "...", 31, 4));
    BUILD_BLOCKS.push(new BuildBlock(315, "...", 39, 4));
    BUILD_BLOCKS.push(new BuildBlock(316, "...", 37, 4));
    BUILD_BLOCKS.push(new BuildBlock(317, "...", 38, 4));
    BUILD_BLOCKS.push(new BuildBlock(318, "...", 37, 4));
    BUILD_BLOCKS.push(new BuildBlock(319, "...", 30, 4));
    BUILD_BLOCKS.push(new BuildBlock(320, "...", 34, 4));
    BUILD_BLOCKS.push(new BuildBlock(321, "...", 33, 4));
    BUILD_BLOCKS.push(new BuildBlock(322, "...", 35, 4));
    BUILD_BLOCKS.push(new BuildBlock(323, "...", 34, 4));
    BUILD_BLOCKS.push(new BuildBlock(324, "...", 37, 4));
    BUILD_BLOCKS.push(new BuildBlock(325, "...", 33, 4));
    BUILD_BLOCKS.push(new BuildBlock(326, "...", 30, 4));
    BUILD_BLOCKS.push(new BuildBlock(327, "...", 35, 4));
    BUILD_BLOCKS.push(new BuildBlock(328, "...", 34, 4));
    BUILD_BLOCKS.push(new BuildBlock(329, "...", 38, 4));
    BUILD_BLOCKS.push(new BuildBlock(330, "...", 37, 4));
    BUILD_BLOCKS.push(new BuildBlock(331, "...", 31, 4));
    BUILD_BLOCKS.push(new BuildBlock(332, "...", 30, 4));
    BUILD_BLOCKS.push(new BuildBlock(333, "...", 36, 4));
    BUILD_BLOCKS.push(new BuildBlock(0, "...", 136, 0));
    BUILD_BLOCKS.push(new BuildBlock(1, "...", 46, 0));
    BUILD_BLOCKS.push(new BuildBlock(10, "...", 108, 0));
    BUILD_BLOCKS.push(new BuildBlock(100, "...", 107, 0));
    BUILD_BLOCKS.push(new BuildBlock(101, "...", 112, 0));
    BUILD_BLOCKS.push(new BuildBlock(102, "...", 95, 0));
    BUILD_BLOCKS.push(new BuildBlock(103, "...", 113, 0));
    BUILD_BLOCKS.push(new BuildBlock(104, "...", 83, 0));
    BUILD_BLOCKS.push(new BuildBlock(105, "...", 137, 0));
    BUILD_BLOCKS.push(new BuildBlock(106, "...", 138, 0));
    BUILD_BLOCKS.push(new BuildBlock(107, "...", 27, 0));
    BUILD_BLOCKS.push(new BuildBlock(108, "...", 81, 0));
    BUILD_BLOCKS.push(new BuildBlock(109, "...", 138, 0));
    BUILD_BLOCKS.push(new BuildBlock(11, "...", 29, 0));
    BUILD_BLOCKS.push(new BuildBlock(110, "...", 136, 0));
    BUILD_BLOCKS.push(new BuildBlock(111, "...", 54, 0));
    BUILD_BLOCKS.push(new BuildBlock(112, "...", 118, 0));
    BUILD_BLOCKS.push(new BuildBlock(113, "...", 60, 0));
    BUILD_BLOCKS.push(new BuildBlock(114, "...", 61, 0));
    BUILD_BLOCKS.push(new BuildBlock(115, "...", 111, 0));
    BUILD_BLOCKS.push(new BuildBlock(116, "...", 59, 0));
    BUILD_BLOCKS.push(new BuildBlock(117, "...", 89, 0));
    BUILD_BLOCKS.push(new BuildBlock(118, "...", 62, 0));
    BUILD_BLOCKS.push(new BuildBlock(119, "...", 32, 0));
    BUILD_BLOCKS.push(new BuildBlock(12, "...", 46, 0));
    BUILD_BLOCKS.push(new BuildBlock(120, "...", 132, 0));
    BUILD_BLOCKS.push(new BuildBlock(121, "...", 66, 0));
    BUILD_BLOCKS.push(new BuildBlock(122, "...", 72, 0));
    BUILD_BLOCKS.push(new BuildBlock(123, "...", 94, 0));
    BUILD_BLOCKS.push(new BuildBlock(124, "...", 104, 0));
    BUILD_BLOCKS.push(new BuildBlock(125, "...", 82, 0));
    BUILD_BLOCKS.push(new BuildBlock(126, "...", 119, 0));
    BUILD_BLOCKS.push(new BuildBlock(127, "...", 85, 0));
    BUILD_BLOCKS.push(new BuildBlock(128, "...", 27, 0));
    BUILD_BLOCKS.push(new BuildBlock(129, "...", 111, 0));
    BUILD_BLOCKS.push(new BuildBlock(13, "...", 97, 0));
    BUILD_BLOCKS.push(new BuildBlock(130, "...", 110, 0));
    BUILD_BLOCKS.push(new BuildBlock(131, "...", 93, 0));
    BUILD_BLOCKS.push(new BuildBlock(132, "...", 58, 0));
    BUILD_BLOCKS.push(new BuildBlock(133, "...", 54, 0));
    BUILD_BLOCKS.push(new BuildBlock(134, "...", 52, 0));
    BUILD_BLOCKS.push(new BuildBlock(135, "...", 121, 0));
    BUILD_BLOCKS.push(new BuildBlock(136, "...", 41, 0));
    BUILD_BLOCKS.push(new BuildBlock(137, "...", 95, 0));
    BUILD_BLOCKS.push(new BuildBlock(138, "...", 75, 0));
    BUILD_BLOCKS.push(new BuildBlock(139, "...", 87, 0));
    BUILD_BLOCKS.push(new BuildBlock(14, "...", 109, 0));
    BUILD_BLOCKS.push(new BuildBlock(140, "...", 92, 0));
    BUILD_BLOCKS.push(new BuildBlock(141, "...", 88, 0));
    BUILD_BLOCKS.push(new BuildBlock(142, "...", 33, 0));
    BUILD_BLOCKS.push(new BuildBlock(143, "...", 48, 0));
    BUILD_BLOCKS.push(new BuildBlock(144, "...", 84, 0));
    BUILD_BLOCKS.push(new BuildBlock(145, "...", 142, 0));
    BUILD_BLOCKS.push(new BuildBlock(146, "...", 74, 0));
    BUILD_BLOCKS.push(new BuildBlock(147, "...", 30, 0));
    BUILD_BLOCKS.push(new BuildBlock(148, "...", 77, 0));
    BUILD_BLOCKS.push(new BuildBlock(149, "...", 144, 0));
    BUILD_BLOCKS.push(new BuildBlock(15, "...", 120, 0));
    BUILD_BLOCKS.push(new BuildBlock(150, "...", 60, 0));
    BUILD_BLOCKS.push(new BuildBlock(151, "...", 26, 0));
    BUILD_BLOCKS.push(new BuildBlock(152, "...", 102, 0));
    BUILD_BLOCKS.push(new BuildBlock(153, "...", 107, 0));
    BUILD_BLOCKS.push(new BuildBlock(154, "...", 40, 0));
    BUILD_BLOCKS.push(new BuildBlock(155, "...", 79, 0));
    BUILD_BLOCKS.push(new BuildBlock(156, "...", 145, 0));
    BUILD_BLOCKS.push(new BuildBlock(157, "...", 99, 0));
    BUILD_BLOCKS.push(new BuildBlock(158, "...", 86, 0));
    BUILD_BLOCKS.push(new BuildBlock(159, "...", 72, 0));
    BUILD_BLOCKS.push(new BuildBlock(16, "...", 25, 0));
    BUILD_BLOCKS.push(new BuildBlock(160, "...", 69, 0));
    BUILD_BLOCKS.push(new BuildBlock(161, "...", 68, 0));
    BUILD_BLOCKS.push(new BuildBlock(162, "...", 60, 0));
    BUILD_BLOCKS.push(new BuildBlock(163, "...", 35, 0));
    BUILD_BLOCKS.push(new BuildBlock(164, "...", 33, 0));
    BUILD_BLOCKS.push(new BuildBlock(165, "...", 32, 0));
    BUILD_BLOCKS.push(new BuildBlock(166, "...", 40, 0));
    BUILD_BLOCKS.push(new BuildBlock(167, "...", 138, 0));
    BUILD_BLOCKS.push(new BuildBlock(168, "...", 54, 0));
    BUILD_BLOCKS.push(new BuildBlock(169, "...", 140, 0));
    BUILD_BLOCKS.push(new BuildBlock(17, "...", 88, 0));
    BUILD_BLOCKS.push(new BuildBlock(170, "...", 51, 0));
    BUILD_BLOCKS.push(new BuildBlock(171, "...", 145, 0));
    BUILD_BLOCKS.push(new BuildBlock(172, "...", 72, 0));
    BUILD_BLOCKS.push(new BuildBlock(173, "...", 115, 0));
    BUILD_BLOCKS.push(new BuildBlock(174, "...", 47, 0));
    BUILD_BLOCKS.push(new BuildBlock(175, "...", 57, 0));
    BUILD_BLOCKS.push(new BuildBlock(176, "...", 115, 0));
    BUILD_BLOCKS.push(new BuildBlock(177, "...", 67, 0));
    BUILD_BLOCKS.push(new BuildBlock(178, "...", 130, 0));
    BUILD_BLOCKS.push(new BuildBlock(179, "...", 71, 0));
    BUILD_BLOCKS.push(new BuildBlock(18, "...", 49, 0));
    BUILD_BLOCKS.push(new BuildBlock(180, "...", 118, 0));
    BUILD_BLOCKS.push(new BuildBlock(181, "...", 143, 0));
    BUILD_BLOCKS.push(new BuildBlock(182, "...", 44, 0));
    BUILD_BLOCKS.push(new BuildBlock(183, "...", 72, 0));
    BUILD_BLOCKS.push(new BuildBlock(184, "...", 34, 0));
    BUILD_BLOCKS.push(new BuildBlock(185, "...", 129, 0));
    BUILD_BLOCKS.push(new BuildBlock(186, "...", 86, 0));
    BUILD_BLOCKS.push(new BuildBlock(187, "...", 103, 0));
    BUILD_BLOCKS.push(new BuildBlock(188, "...", 126, 0));
    BUILD_BLOCKS.push(new BuildBlock(189, "...", 95, 0));
    BUILD_BLOCKS.push(new BuildBlock(19, "...", 34, 0));
    BUILD_BLOCKS.push(new BuildBlock(190, "...", 62, 0));
    BUILD_BLOCKS.push(new BuildBlock(191, "...", 34, 0));
    BUILD_BLOCKS.push(new BuildBlock(192, "...", 28, 0));
    BUILD_BLOCKS.push(new BuildBlock(193, "...", 58, 0));
    BUILD_BLOCKS.push(new BuildBlock(194, "...", 79, 0));
    BUILD_BLOCKS.push(new BuildBlock(195, "...", 85, 0));
    BUILD_BLOCKS.push(new BuildBlock(196, "...", 117, 0));
    BUILD_BLOCKS.push(new BuildBlock(197, "...", 137, 0));
    BUILD_BLOCKS.push(new BuildBlock(198, "...", 33, 0));
    BUILD_BLOCKS.push(new BuildBlock(199, "...", 64, 0));
    BUILD_BLOCKS.push(new BuildBlock(2, "...", 120, 0));
    BUILD_BLOCKS.push(new BuildBlock(20, "...", 113, 0));
    BUILD_BLOCKS.push(new BuildBlock(200, "...", 99, 0));
    BUILD_BLOCKS.push(new BuildBlock(201, "...", 94, 0));
    BUILD_BLOCKS.push(new BuildBlock(202, "...", 83, 0));
    BUILD_BLOCKS.push(new BuildBlock(203, "...", 148, 0));
    BUILD_BLOCKS.push(new BuildBlock(204, "...", 108, 0));
    BUILD_BLOCKS.push(new BuildBlock(205, "...", 74, 0));
    BUILD_BLOCKS.push(new BuildBlock(206, "...", 116, 0));
    BUILD_BLOCKS.push(new BuildBlock(207, "...", 142, 0));
    BUILD_BLOCKS.push(new BuildBlock(208, "...", 91, 0));
    BUILD_BLOCKS.push(new BuildBlock(209, "...", 37, 0));
    BUILD_BLOCKS.push(new BuildBlock(21, "...", 138, 0));
    BUILD_BLOCKS.push(new BuildBlock(210, "...", 100, 0));
    BUILD_BLOCKS.push(new BuildBlock(211, "...", 137, 0));
    BUILD_BLOCKS.push(new BuildBlock(212, "...", 114, 0));
    BUILD_BLOCKS.push(new BuildBlock(213, "...", 123, 0));
    BUILD_BLOCKS.push(new BuildBlock(214, "...", 80, 0));
    BUILD_BLOCKS.push(new BuildBlock(215, "...", 67, 0));
    BUILD_BLOCKS.push(new BuildBlock(216, "...", 100, 0));
    BUILD_BLOCKS.push(new BuildBlock(217, "...", 93, 0));
    BUILD_BLOCKS.push(new BuildBlock(218, "...", 95, 0));
    BUILD_BLOCKS.push(new BuildBlock(219, "...", 130, 0));
    BUILD_BLOCKS.push(new BuildBlock(22, "...", 85, 0));
    BUILD_BLOCKS.push(new BuildBlock(220, "...", 143, 0));
    BUILD_BLOCKS.push(new BuildBlock(221, "...", 120, 0));
    BUILD_BLOCKS.push(new BuildBlock(222, "...", 77, 0));
    BUILD_BLOCKS.push(new BuildBlock(223, "...", 117, 0));
    BUILD_BLOCKS.push(new BuildBlock(224, "...", 122, 0));
    BUILD_BLOCKS.push(new BuildBlock(225, "...", 78, 0));
    BUILD_BLOCKS.push(new BuildBlock(226, "...", 101, 0));
    BUILD_BLOCKS.push(new BuildBlock(227, "...", 39, 0));
    BUILD_BLOCKS.push(new BuildBlock(228, "...", 42, 0));
    BUILD_BLOCKS.push(new BuildBlock(229, "...", 120, 0));
    BUILD_BLOCKS.push(new BuildBlock(23, "...", 109, 0));
    BUILD_BLOCKS.push(new BuildBlock(230, "...", 50, 0));
    BUILD_BLOCKS.push(new BuildBlock(231, "...", 90, 0));
    BUILD_BLOCKS.push(new BuildBlock(232, "...", 34, 0));
    BUILD_BLOCKS.push(new BuildBlock(233, "...", 114, 0));
    BUILD_BLOCKS.push(new BuildBlock(234, "...", 81, 0));
    BUILD_BLOCKS.push(new BuildBlock(235, "...", 77, 0));
    BUILD_BLOCKS.push(new BuildBlock(236, "...", 25, 0));
    BUILD_BLOCKS.push(new BuildBlock(237, "...", 105, 0));
    BUILD_BLOCKS.push(new BuildBlock(238, "...", 77, 0));
    BUILD_BLOCKS.push(new BuildBlock(239, "...", 43, 0));
    BUILD_BLOCKS.push(new BuildBlock(24, "...", 28, 0));
    BUILD_BLOCKS.push(new BuildBlock(240, "...", 64, 0));
    BUILD_BLOCKS.push(new BuildBlock(241, "...", 123, 0));
    BUILD_BLOCKS.push(new BuildBlock(242, "...", 70, 0));
    BUILD_BLOCKS.push(new BuildBlock(243, "...", 111, 0));
    BUILD_BLOCKS.push(new BuildBlock(244, "...", 65, 0));
    BUILD_BLOCKS.push(new BuildBlock(245, "...", 56, 0));
    BUILD_BLOCKS.push(new BuildBlock(246, "...", 56, 0));
    BUILD_BLOCKS.push(new BuildBlock(247, "...", 102, 0));
    BUILD_BLOCKS.push(new BuildBlock(25, "...", 50, 0));
    BUILD_BLOCKS.push(new BuildBlock(26, "...", 56, 0));
    BUILD_BLOCKS.push(new BuildBlock(27, "...", 85, 0));
    BUILD_BLOCKS.push(new BuildBlock(28, "...", 77, 0));
    BUILD_BLOCKS.push(new BuildBlock(29, "...", 54, 0));
    BUILD_BLOCKS.push(new BuildBlock(3, "...", 36, 0));
    BUILD_BLOCKS.push(new BuildBlock(30, "...", 112, 0));
    BUILD_BLOCKS.push(new BuildBlock(31, "...", 75, 0));
    BUILD_BLOCKS.push(new BuildBlock(32, "...", 142, 0));
    BUILD_BLOCKS.push(new BuildBlock(33, "...", 99, 0));
    BUILD_BLOCKS.push(new BuildBlock(34, "...", 113, 0));
    BUILD_BLOCKS.push(new BuildBlock(35, "...", 88, 0));
    BUILD_BLOCKS.push(new BuildBlock(36, "...", 89, 0));
    BUILD_BLOCKS.push(new BuildBlock(37, "...", 140, 0));
    BUILD_BLOCKS.push(new BuildBlock(38, "...", 137, 0));
    BUILD_BLOCKS.push(new BuildBlock(39, "...", 77, 0));
    BUILD_BLOCKS.push(new BuildBlock(4, "...", 139, 0));
    BUILD_BLOCKS.push(new BuildBlock(40, "...", 92, 0));
    BUILD_BLOCKS.push(new BuildBlock(41, "...", 38, 0));
    BUILD_BLOCKS.push(new BuildBlock(42, "...", 51, 0));
    BUILD_BLOCKS.push(new BuildBlock(43, "...", 90, 0));
    BUILD_BLOCKS.push(new BuildBlock(44, "...", 39, 0));
    BUILD_BLOCKS.push(new BuildBlock(45, "...", 78, 0));
    BUILD_BLOCKS.push(new BuildBlock(46, "...", 30, 0));
    BUILD_BLOCKS.push(new BuildBlock(47, "...", 64, 0));
    BUILD_BLOCKS.push(new BuildBlock(48, "...", 96, 0));
    BUILD_BLOCKS.push(new BuildBlock(49, "...", 65, 0));
    BUILD_BLOCKS.push(new BuildBlock(5, "...", 127, 0));
    BUILD_BLOCKS.push(new BuildBlock(50, "...", 25, 0));
    BUILD_BLOCKS.push(new BuildBlock(51, "...", 125, 0));
    BUILD_BLOCKS.push(new BuildBlock(52, "...", 44, 0));
    BUILD_BLOCKS.push(new BuildBlock(53, "...", 66, 0));
    BUILD_BLOCKS.push(new BuildBlock(54, "...", 148, 0));
    BUILD_BLOCKS.push(new BuildBlock(55, "...", 34, 0));
    BUILD_BLOCKS.push(new BuildBlock(56, "...", 97, 0));
    BUILD_BLOCKS.push(new BuildBlock(57, "...", 49, 0));
    BUILD_BLOCKS.push(new BuildBlock(58, "...", 79, 0));
    BUILD_BLOCKS.push(new BuildBlock(59, "...", 59, 0));
    BUILD_BLOCKS.push(new BuildBlock(6, "...", 38, 0));
    BUILD_BLOCKS.push(new BuildBlock(60, "...", 90, 0));
    BUILD_BLOCKS.push(new BuildBlock(61, "...", 28, 0));
    BUILD_BLOCKS.push(new BuildBlock(62, "...", 88, 0));
    BUILD_BLOCKS.push(new BuildBlock(63, "...", 137, 0));
    BUILD_BLOCKS.push(new BuildBlock(64, "...", 27, 0));
    BUILD_BLOCKS.push(new BuildBlock(65, "...", 61, 0));
    BUILD_BLOCKS.push(new BuildBlock(66, "...", 54, 0));
    BUILD_BLOCKS.push(new BuildBlock(67, "...", 95, 0));
    BUILD_BLOCKS.push(new BuildBlock(68, "...", 103, 0));
    BUILD_BLOCKS.push(new BuildBlock(69, "...", 42, 0));
    BUILD_BLOCKS.push(new BuildBlock(7, "...", 74, 0));
    BUILD_BLOCKS.push(new BuildBlock(70, "...", 51, 0));
    BUILD_BLOCKS.push(new BuildBlock(71, "...", 95, 0));
    BUILD_BLOCKS.push(new BuildBlock(72, "...", 71, 0));
    BUILD_BLOCKS.push(new BuildBlock(73, "...", 54, 0));
    BUILD_BLOCKS.push(new BuildBlock(74, "...", 117, 0));
    BUILD_BLOCKS.push(new BuildBlock(75, "...", 148, 0));
    BUILD_BLOCKS.push(new BuildBlock(76, "...", 62, 0));
    BUILD_BLOCKS.push(new BuildBlock(77, "...", 146, 0));
    BUILD_BLOCKS.push(new BuildBlock(78, "...", 137, 0));
    BUILD_BLOCKS.push(new BuildBlock(79, "...", 46, 0));
    BUILD_BLOCKS.push(new BuildBlock(8, "...", 85, 0));
    BUILD_BLOCKS.push(new BuildBlock(80, "...", 137, 0));
    BUILD_BLOCKS.push(new BuildBlock(81, "...", 56, 0));
    BUILD_BLOCKS.push(new BuildBlock(82, "...", 30, 0));
    BUILD_BLOCKS.push(new BuildBlock(83, "...", 37, 0));
    BUILD_BLOCKS.push(new BuildBlock(84, "...", 126, 0));
    BUILD_BLOCKS.push(new BuildBlock(85, "...", 139, 0));
    BUILD_BLOCKS.push(new BuildBlock(86, "...", 112, 0));
    BUILD_BLOCKS.push(new BuildBlock(87, "...", 36, 0));
    BUILD_BLOCKS.push(new BuildBlock(88, "...", 93, 0));
    BUILD_BLOCKS.push(new BuildBlock(89, "...", 98, 0));
    BUILD_BLOCKS.push(new BuildBlock(9, "...", 31, 0));
    BUILD_BLOCKS.push(new BuildBlock(90, "...", 133, 0));
    BUILD_BLOCKS.push(new BuildBlock(91, "...", 67, 0));
    BUILD_BLOCKS.push(new BuildBlock(92, "...", 103, 0));
    BUILD_BLOCKS.push(new BuildBlock(93, "...", 85, 0));
    BUILD_BLOCKS.push(new BuildBlock(94, "...", 126, 0));
    BUILD_BLOCKS.push(new BuildBlock(95, "...", 52, 0));
    BUILD_BLOCKS.push(new BuildBlock(96, "...", 115, 0));
    BUILD_BLOCKS.push(new BuildBlock(97, "...", 77, 0));
    BUILD_BLOCKS.push(new BuildBlock(98, "...", 54, 0));
    BUILD_BLOCKS.push(new BuildBlock(99, "...", 33, 0));
    BUILD_BLOCKS.push(new BuildBlock(334, "...", 1167, 2));
    BUILD_BLOCKS.push(new BuildBlock(335, "...", 1118, 2));
    BUILD_BLOCKS.push(new BuildBlock(336, "...", 190, 2));
    BUILD_BLOCKS.push(new BuildBlock(337, "...", 1122, 2));
    BUILD_BLOCKS.push(new BuildBlock(338, "...", 505, 2));
    BUILD_BLOCKS.push(new BuildBlock(339, "...", 835, 2));
    BUILD_BLOCKS.push(new BuildBlock(340, "...", 1335, 2));
    BUILD_BLOCKS.push(new BuildBlock(341, "...", 1355, 2));
    BUILD_BLOCKS.push(new BuildBlock(342, "...", 1369, 2));
    BUILD_BLOCKS.push(new BuildBlock(343, "...", 362, 2));
    BUILD_BLOCKS.push(new BuildBlock(344, "...", 878, 2));
    BUILD_BLOCKS.push(new BuildBlock(345, "...", 345, 2));
    BUILD_BLOCKS.push(new BuildBlock(346, "...", 598, 2));
    BUILD_BLOCKS.push(new BuildBlock(347, "...", 784, 2));
    BUILD_BLOCKS.push(new BuildBlock(348, "...", 1483, 2));
    BUILD_BLOCKS.push(new BuildBlock(349, "...", 1132, 2));
    BUILD_BLOCKS.push(new BuildBlock(350, "...", 55, 2));
    BUILD_BLOCKS.push(new BuildBlock(351, "...", 385, 2));
    BUILD_BLOCKS.push(new BuildBlock(352, "...", 1368, 2));
    BUILD_BLOCKS.push(new BuildBlock(353, "...", 158, 2));
    BUILD_BLOCKS.push(new BuildBlock(354, "...", 1237, 2));
    BUILD_BLOCKS.push(new BuildBlock(355, "...", 1303, 2));
    BUILD_BLOCKS.push(new BuildBlock(356, "...", 606, 2));
    BUILD_BLOCKS.push(new BuildBlock(357, "...", 537, 2));
    BUILD_BLOCKS.push(new BuildBlock(358, "...", 580, 2));
    BUILD_BLOCKS.push(new BuildBlock(359, "...",
        251, 2));
    BUILD_BLOCKS.push(new BuildBlock(360, "...", 377, 2));
    BUILD_BLOCKS.push(new BuildBlock(361, "...", 213, 2));
    BUILD_BLOCKS.push(new BuildBlock(362, "...", 233, 2));
    BUILD_BLOCKS.push(new BuildBlock(363, "...", 1190, 2));
    BUILD_BLOCKS.push(new BuildBlock(364, "...", 322, 2));
    BUILD_BLOCKS.push(new BuildBlock(365, "...", 809, 2));
    BUILD_BLOCKS.push(new BuildBlock(366, "...", 519, 2));
    BUILD_BLOCKS.push(new BuildBlock(367, "...", 972, 2));
    BUILD_BLOCKS.push(new BuildBlock(368, "...", 961, 2));
    BUILD_BLOCKS.push(new BuildBlock(369, "...", 12, 2));
    BUILD_BLOCKS.push(new BuildBlock(370, "...", 714, 2));
    BUILD_BLOCKS.push(new BuildBlock(371, "...", 645, 2));
    BUILD_BLOCKS.push(new BuildBlock(372, "...", 970, 2));
    BUILD_BLOCKS.push(new BuildBlock(373, "...", 758, 2));
    BUILD_BLOCKS.push(new BuildBlock(374, "...", 283, 2));
    BUILD_BLOCKS.push(new BuildBlock(375, "...", 1033, 2));
    BUILD_BLOCKS.push(new BuildBlock(376, "...", 537, 2));
    BUILD_BLOCKS.push(new BuildBlock(377, "...", 1087, 2));
    BUILD_BLOCKS.push(new BuildBlock(378, "...", 363, 2));
    BUILD_BLOCKS.push(new BuildBlock(379, "...", 1020, 2));
    BUILD_BLOCKS.push(new BuildBlock(380, "...", 793, 2));
    BUILD_BLOCKS.push(new BuildBlock(381, "...", 544, 2));
    BUILD_BLOCKS.push(new BuildBlock(382, "...", 368, 2));
    BUILD_BLOCKS.push(new BuildBlock(383, "...", 1166, 2));
    BUILD_BLOCKS.push(new BuildBlock(384, "...", 94, 2));
    BUILD_BLOCKS.push(new BuildBlock(385, "...", 750, 2));
    BUILD_BLOCKS.push(new BuildBlock(386, "...", 1430, 2));
    BUILD_BLOCKS.push(new BuildBlock(387, "...", 1392, 2));
    BUILD_BLOCKS.push(new BuildBlock(388, "...", 1087, 2));
    BUILD_BLOCKS.push(new BuildBlock(389, "...", 1281, 2));
    BUILD_BLOCKS.push(new BuildBlock(390, "...", 368, 2));
    BUILD_BLOCKS.push(new BuildBlock(391, "...", 149, 2));
    BUILD_BLOCKS.push(new BuildBlock(392, "...", 1128, 2));
    BUILD_BLOCKS.push(new BuildBlock(393, "...", 375, 2));
    BUILD_BLOCKS.push(new BuildBlock(394, "...", 425, 2));
    BUILD_BLOCKS.push(new BuildBlock(395, "...", 106, 2));
    BUILD_BLOCKS.push(new BuildBlock(396, "...", 103, 2));
    BUILD_BLOCKS.push(new BuildBlock(397, "...", 336, 2));
    BUILD_BLOCKS.push(new BuildBlock(398, "...", 683, 2));
    BUILD_BLOCKS.push(new BuildBlock(399, "...", 254, 2));
    BUILD_BLOCKS.push(new BuildBlock(400, "...", 1275, 2));
    BUILD_BLOCKS.push(new BuildBlock(401, "...", 251, 2));
    BUILD_BLOCKS.push(new BuildBlock(402, "...", 513, 2));
    BUILD_BLOCKS.push(new BuildBlock(403, "...", 1440, 2));
    BUILD_BLOCKS.push(new BuildBlock(404, "...", 1119, 2));
    BUILD_BLOCKS.push(new BuildBlock(405, "...", 1496, 2));
    BUILD_BLOCKS.push(new BuildBlock(406, "...", 154, 2));
    BUILD_BLOCKS.push(new BuildBlock(407, "...", 594, 2));
    BUILD_BLOCKS.push(new BuildBlock(408, "...", 1359, 2));
    BUILD_BLOCKS.push(new BuildBlock(409, "...", 1115, 2));
    BUILD_BLOCKS.push(new BuildBlock(410, "...", 120, 2));
    BUILD_BLOCKS.push(new BuildBlock(411, "...", 1245, 2));
    BUILD_BLOCKS.push(new BuildBlock(412, "...", 1261, 2));
    BUILD_BLOCKS.push(new BuildBlock(413, "...", 605, 2));
    BUILD_BLOCKS.push(new BuildBlock(414, "...", 1490, 2));
    BUILD_BLOCKS.push(new BuildBlock(415, "...", 189, 2));
    BUILD_BLOCKS.push(new BuildBlock(416, "...", 1478, 2));
    BUILD_BLOCKS.push(new BuildBlock(417, "...", 1294, 2));
    BUILD_BLOCKS.push(new BuildBlock(418, "...", 38, 2));
    BUILD_BLOCKS.push(new BuildBlock(419, "...", 614, 2));
    BUILD_BLOCKS.push(new BuildBlock(420, "...", 424, 2));
    BUILD_BLOCKS.push(new BuildBlock(421, "...", 234, 2));
    BUILD_BLOCKS.push(new BuildBlock(422, "...", 214, 2));
    BUILD_BLOCKS.push(new BuildBlock(423, "...", 1238, 2));
    BUILD_BLOCKS.push(new BuildBlock(424, "...", 457, 2));
    BUILD_BLOCKS.push(new BuildBlock(425, "...", 870, 2));
    BUILD_BLOCKS.push(new BuildBlock(426, "...", 1001, 2));
    BUILD_BLOCKS.push(new BuildBlock(427, "...", 1017, 2));
    BUILD_BLOCKS.push(new BuildBlock(428, "...", 1202, 2));
    BUILD_BLOCKS.push(new BuildBlock(429, "...", 1068, 2));
    BUILD_BLOCKS.push(new BuildBlock(430, "...", 1424, 2));
    BUILD_BLOCKS.push(new BuildBlock(431, "...", 814, 2));
    BUILD_BLOCKS.push(new BuildBlock(432, "...", 1168, 2));
    BUILD_BLOCKS.push(new BuildBlock(433, "...", 359, 2));
    BUILD_BLOCKS.push(new BuildBlock(434, "...", 830, 2));
    BUILD_BLOCKS.push(new BuildBlock(435, "...", 1483, 2));
    BUILD_BLOCKS.push(new BuildBlock(436, "...", 709, 2));
    BUILD_BLOCKS.push(new BuildBlock(437, "...", 1084, 2));
    BUILD_BLOCKS.push(new BuildBlock(438, "...", 156, 2));
    BUILD_BLOCKS.push(new BuildBlock(439, "...", 1463, 2));
    BUILD_BLOCKS.push(new BuildBlock(440, "...", 1490, 2));
    BUILD_BLOCKS.push(new BuildBlock(441, "...", 1157, 2));
    BUILD_BLOCKS.push(new BuildBlock(442, "...", 1477, 2));
    BUILD_BLOCKS.push(new BuildBlock(443, "...", 428, 2));
    BUILD_BLOCKS.push(new BuildBlock(444, "...", 137, 2));
    BUILD_BLOCKS.push(new BuildBlock(445, "...", 912, 2));
    BUILD_BLOCKS.push(new BuildBlock(446, "...", 86, 2));
    BUILD_BLOCKS.push(new BuildBlock(447, "...", 421, 2));
    BUILD_BLOCKS.push(new BuildBlock(448, "...", 1349, 2));
    BUILD_BLOCKS.push(new BuildBlock(449, "...", 553, 2));
    BUILD_BLOCKS.push(new BuildBlock(450, "...", 66, 2));
    BUILD_BLOCKS.push(new BuildBlock(451, "...", 11, 2));
    BUILD_BLOCKS.push(new BuildBlock(452, "...", 89, 2));
    BUILD_BLOCKS.push(new BuildBlock(453, "...", 1202, 2));
    BUILD_BLOCKS.push(new BuildBlock(454, "...", 1045, 2));
    BUILD_BLOCKS.push(new BuildBlock(455, "...", 873, 2));
    BUILD_BLOCKS.push(new BuildBlock(456, "...", 679, 2));
    BUILD_BLOCKS.push(new BuildBlock(457, "...", 786, 2));
    BUILD_BLOCKS.push(new BuildBlock(458, "...", 523, 2));
    BUILD_BLOCKS.push(new BuildBlock(459, "...", 1366, 2));
    BUILD_BLOCKS.push(new BuildBlock(460, "...", 644, 2));
    BUILD_BLOCKS.push(new BuildBlock(461, "...", 685, 2));
    BUILD_BLOCKS.push(new BuildBlock(462, "...", 64, 2));
    BUILD_BLOCKS.push(new BuildBlock(463, "...", 615, 2));
    BUILD_BLOCKS.push(new BuildBlock(464, "...", 220, 2));
    BUILD_BLOCKS.push(new BuildBlock(465, "...", 1092, 2));
    BUILD_BLOCKS.push(new BuildBlock(466, "...", 1187, 2));
    BUILD_BLOCKS.push(new BuildBlock(467, "...", 733, 2));
    BUILD_BLOCKS.push(new BuildBlock(468, "...", 203, 2));
    BUILD_BLOCKS.push(new BuildBlock(469, "...", 1169, 2));
    BUILD_BLOCKS.push(new BuildBlock(470, "...", 909, 2));
    BUILD_BLOCKS.push(new BuildBlock(471, "...", 1347, 2));
    BUILD_BLOCKS.push(new BuildBlock(472, "...", 1396, 2));
    BUILD_BLOCKS.push(new BuildBlock(473, "...", 106, 2));
    BUILD_BLOCKS.push(new BuildBlock(474, "...", 450, 2));
    BUILD_BLOCKS.push(new BuildBlock(475, "...", 121, 2));
    BUILD_BLOCKS.push(new BuildBlock(476, "...", 1298, 2));
    BUILD_BLOCKS.push(new BuildBlock(477, "...", 990, 2));
    BUILD_BLOCKS.push(new BuildBlock(478, "...", 701, 2));
    BUILD_BLOCKS.push(new BuildBlock(479, "...", 964, 2));
    BUILD_BLOCKS.push(new BuildBlock(480, "...", 285, 2));
    BUILD_BLOCKS.push(new BuildBlock(481, "...", 1451, 2));
    BUILD_BLOCKS.push(new BuildBlock(482, "...", 1225, 2));
    BUILD_BLOCKS.push(new BuildBlock(483, "...", 1178, 2));
    BUILD_BLOCKS.push(new BuildBlock(484, "...", 1089, 2));
    BUILD_BLOCKS.push(new BuildBlock(485, "...", 585, 2));
    BUILD_BLOCKS.push(new BuildBlock(486, "...", 661, 2));
    BUILD_BLOCKS.push(new BuildBlock(487, "...", 373, 2));
    BUILD_BLOCKS.push(new BuildBlock(488, "...", 1108, 2));
    BUILD_BLOCKS.push(new BuildBlock(489, "...", 751, 2));
    BUILD_BLOCKS.push(new BuildBlock(490, "...", 465, 2));
    BUILD_BLOCKS.push(new BuildBlock(491, "...", 241, 2));
    BUILD_BLOCKS.push(new BuildBlock(492, "...", 682, 2));
    BUILD_BLOCKS.push(new BuildBlock(493, "...", 685, 2));
    BUILD_BLOCKS.push(new BuildBlock(494, "...", 450, 2));
    BUILD_BLOCKS.push(new BuildBlock(495, "...", 240, 2));
    BUILD_BLOCKS.push(new BuildBlock(496, "...", 1022, 2));
    BUILD_BLOCKS.push(new BuildBlock(497, "...", 854, 2));
    BUILD_BLOCKS.push(new BuildBlock(498, "...", 1224, 2));
    BUILD_BLOCKS.push(new BuildBlock(499, "...", 413, 2));
    BUILD_BLOCKS.push(new BuildBlock(500, "...", 1093, 2));
    BUILD_BLOCKS.push(new BuildBlock(501, "...", 1471, 2));
    BUILD_BLOCKS.push(new BuildBlock(502, "...", 1233, 2));
    BUILD_BLOCKS.push(new BuildBlock(503, "...", 90, 2));
    BUILD_BLOCKS.push(new BuildBlock(504, "...", 1324, 2));
    BUILD_BLOCKS.push(new BuildBlock(505, "...", 175, 2));
    BUILD_BLOCKS.push(new BuildBlock(506, "...", 1106, 2));
    BUILD_BLOCKS.push(new BuildBlock(507, "...", 413, 2));
    BUILD_BLOCKS.push(new BuildBlock(508, "...", 21, 2));
    BUILD_BLOCKS.push(new BuildBlock(248, "...", 191, 3));
    BUILD_BLOCKS.push(new BuildBlock(249, "...", 167, 3));
    BUILD_BLOCKS.push(new BuildBlock(250, "...", 194, 3));
    BUILD_BLOCKS.push(new BuildBlock(251, "...", 160, 3));
    BUILD_BLOCKS.push(new BuildBlock(252, "...", 177, 3));
    BUILD_BLOCKS.push(new BuildBlock(253, "...", 160, 3));
    BUILD_BLOCKS.push(new BuildBlock(254, "...", 132, 3));
    BUILD_BLOCKS.push(new BuildBlock(255, "...", 161, 3));
    BUILD_BLOCKS.push(new BuildBlock(256, "...", 178, 3));
    BUILD_BLOCKS.push(new BuildBlock(257, "...", 196, 3));
    BUILD_BLOCKS.push(new BuildBlock(258, "...", 158, 3));
    BUILD_BLOCKS.push(new BuildBlock(259, "...", 116, 3));
    BUILD_BLOCKS.push(new BuildBlock(260, "...", 156, 3));
    BUILD_BLOCKS.push(new BuildBlock(261, "...", 115, 3));
    BUILD_BLOCKS.push(new BuildBlock(262, "...", 147, 3));
    BUILD_BLOCKS.push(new BuildBlock(263, "...", 153, 3));
    BUILD_BLOCKS.push(new BuildBlock(264, "...", 130, 3));
    BUILD_BLOCKS.push(new BuildBlock(265, "...", 115, 3));
    BUILD_BLOCKS.push(new BuildBlock(266, "...", 113, 3));
    BUILD_BLOCKS.push(new BuildBlock(267, "...", 140, 3));
    BUILD_BLOCKS.push(new BuildBlock(268, "...", 148, 3));
    BUILD_BLOCKS.push(new BuildBlock(269, "...", 125, 3));
    BUILD_BLOCKS.push(new BuildBlock(270, "...", 181, 3));
    BUILD_BLOCKS.push(new BuildBlock(271, "...", 146, 3));
    BUILD_BLOCKS.push(new BuildBlock(272, "...", 184, 3));
    BUILD_BLOCKS.push(new BuildBlock(273, "...", 147, 3));
    BUILD_BLOCKS.push(new BuildBlock(274, "...", 147, 3));
    BUILD_BLOCKS.push(new BuildBlock(275, "...", 100, 3));
    BUILD_BLOCKS.push(new BuildBlock(276, "...", 151, 3));
    BUILD_BLOCKS.push(new BuildBlock(277, "...", 143, 3));
    BUILD_BLOCKS.push(new BuildBlock(278, "...", 157, 3));
    BUILD_BLOCKS.push(new BuildBlock(279, "...", 170, 3));
    BUILD_BLOCKS.push(new BuildBlock(280, "...", 182, 3));
    BUILD_BLOCKS.push(new BuildBlock(281, "...", 176, 3));
    BUILD_BLOCKS.push(new BuildBlock(282, "...", 127, 3));
    BUILD_BLOCKS.push(new BuildBlock(283, "...", 164, 3));
    BUILD_BLOCKS.push(new BuildBlock(284, "...", 116, 3));
    BUILD_BLOCKS.push(new BuildBlock(285, "...", 164, 3));
    BUILD_BLOCKS.push(new BuildBlock(286, "...", 177, 3));
    BUILD_BLOCKS.push(new BuildBlock(287, "...", 144, 3));
    BUILD_BLOCKS.push(new BuildBlock(288, "...", 172, 3));
    BUILD_BLOCKS.push(new BuildBlock(289, "...", 189, 3));
}

function loadBuildBlocks() {
    const matrixSize = 25;
    const table = document.getElementById("buildBlocks");
    for (let currentBlockId = 0; currentBlockId < BUILD_BLOCKS.length; currentBlockId += matrixSize) {
        const row = table.insertRow();
        for (let currentCellId = currentBlockId; currentCellId < currentBlockId + matrixSize; currentCellId++) {
            if (currentCellId >= BUILD_BLOCKS.length) {
                break;
            }
            const block = BUILD_BLOCKS[currentCellId];
            const cell = row.insertCell();
            cell.setAttribute("id", `tdBlock${block.tileId}`);
            cell.setAttribute("class", "block1");
            cell.style.backgroundImage = block.imageUrl;
            cell.style.backgroundSize = `${block.width}px ${block.height}px`;
            const processBuildBlock = function (id) {
                GLOBAL_SETTINGS.currentlySelectedBuildBlock = id;
                updateInfoBoardForBuildBlocks();
            };
            cell.onclick = () => processBuildBlock(currentCellId);
        }
    }
}

function updateInfoBoardForBuildBlocks() {

    const block = BUILD_BLOCKS[GLOBAL_SETTINGS.currentlySelectedBuildBlock];
    {
        const element = document.getElementById("infoBoardBlock");
        element.style.backgroundSize = `${block.width}px ${block.height}px`;
        element.style.backgroundImage = block.imageUrl;
    }
    {
        const element = document.getElementById("infoBoardPrice");
        element.value = block.price + " $";
    }
    {
        const element = document.getElementById("infoBoardMaterial");
        let name = GLOBAL_SETTINGS.supportedMaterials[block.materialId];
        if (name.length > 5) {
            name = name.slice(0, 5);
            name += "...";
            element.setAttribute('title', GLOBAL_SETTINGS.supportedMaterials[block.materialId]);
        }
        element.value = name;
    }
    {
        const element = document.getElementById("infoBoardSquare");
        element.value = block.square;
    }
    {
        const element = document.getElementById("infoBoardAvialeble");
        element.value = block.available;
        if (block.available === 10) {
            log.toWLog("There are only 10 pieces of this block left");
        } else if (block.available === 1) {
            log.toWLog("There is only 1 piece of this block left");
        } else if (block.available === 0) {
            log.toELog("There are no more pieces of this block");
            enableBuildBlock(GLOBAL_SETTINGS.currentlySelectedBuildBlock, false);
        } else {
        }
    }
    {
        const element = document.getElementById("infoBoardName");
        let name = block.name;
        if (name.length > 5) {
            name = name.slice(0, 5);
            name += "...";
            element.setAttribute('title', block.name);
        }
        element.value = name;
    }
}

function loadWorkingArea() {
    const table = document.getElementById("workingArea");
    for (let rowIt = 0; rowIt < 21; ++rowIt) {
        const row = table.insertRow();
        for (let cellIt = 0; cellIt < 25; ++cellIt) {
            const workingAreaBlock = new WorkingAreaBlock(rowIt * 25 + cellIt);
            WORKING_AREA.push(workingAreaBlock);
            const cell = row.insertCell();
            cell.onclick = handleWorkingAreaBlockClick(workingAreaBlock.id);
            cell.onmouseover = handleWorkingAreaBlockMouseOver(workingAreaBlock.id);
            cell.oncontextmenu = handleWorkingAreaBlockContextMenu;
            cell.style.backgroundImage = workingAreaBlock.imageUrl;
            cell.style.backgroundSize = `${workingAreaBlock.width}px ${workingAreaBlock.height}px`;
            cell.setAttribute('id', `tdWorkingAreaBlock${workingAreaBlock.id}`);
            cell.setAttribute('class', 'block1');
        }
    }
}

function updateInfoBoardForWorkingArea() {
    {
        const element = document.getElementById("curWorkPrice");
        element.value = GLOBAL_SETTINGS.workingArea.totalPrice;
    }
    {
        const element = document.getElementById("curWorkBlocks");
        element.value = GLOBAL_SETTINGS.workingArea.totalBlocks;
        enableLimitModule(GLOBAL_SETTINGS.workingArea.totalBlocks === 0);
    }
    {
        const element = document.getElementById("curWorkSquare");
        element.value = GLOBAL_SETTINGS.workingArea.totalArea;
    }
}

function handleWorkingAreaBlockClick(workingAreaBlockId) {
    return function () {
        const buildBlock = BUILD_BLOCKS[GLOBAL_SETTINGS.currentlySelectedBuildBlock];
        if (buildBlock.available > 0 && checkLimits(buildBlock)) {
            buildBlock.available--;
            const workingAreaBlock = WORKING_AREA[workingAreaBlockId];
            workingAreaBlock.pushBlock(GLOBAL_SETTINGS.currentlySelectedBuildBlock);
            const cell = document.getElementById(`tdWorkingAreaBlock${workingAreaBlock.id}`);
            cell.style.backgroundImage = workingAreaBlock.imageUrl;
            cell.style.backgroundSize = `${workingAreaBlock.width}px ${workingAreaBlock.height}px`;
            cell.setAttribute('id', `tdWorkingAreaBlock${workingAreaBlock.id}`);
            cell.setAttribute('class', 'block1');

            GLOBAL_SETTINGS.workingArea.totalArea++;
            GLOBAL_SETTINGS.workingArea.totalBlocks++;
            GLOBAL_SETTINGS.workingArea.totalPrice += buildBlock.price;

            updateInfoBoardForBuildBlocks();
            updateInfoBoardForWorkingArea();

            Snackbar.show({
                width: '80px',
                text: `Spent: $${buildBlock.price}`,
                pos: 'bottom-left',
                showAction: false
            });
        }
    };
}

function handleWorkingAreaBlockMouseOver(workingAreaBlockId) {
    return function () {
        GLOBAL_SETTINGS.currentlySelectedWorkingAreaBlock = workingAreaBlockId;
    };
}

function handleWorkingAreaBlockContextMenu(e) {
    e.preventDefault();
    deleteBuildBlockFromWorkingArea();
}

function deleteBuildBlockFromWorkingArea() {

    const blockId = GLOBAL_SETTINGS.currentlySelectedWorkingAreaBlock;
    const buildBlockId = WORKING_AREA[blockId].popBlock();
    if (buildBlockId !== -1) {

        document.getElementById(`tdWorkingAreaBlock${blockId}`)
            .style.backgroundImage = WORKING_AREA[blockId].imageUrl;

        const buildBlock = BUILD_BLOCKS[buildBlockId];
        buildBlock.available = buildBlock.available + 1;
        enableBuildBlock(buildBlockId, true);

        GLOBAL_SETTINGS.workingArea.totalArea--;
        GLOBAL_SETTINGS.workingArea.totalBlocks--;
        GLOBAL_SETTINGS.workingArea.totalPrice =
            GLOBAL_SETTINGS.workingArea.totalPrice -
            buildBlock.price;

        updateInfoBoardForBuildBlocks();
        updateInfoBoardForWorkingArea();

        Snackbar.show({
            width: '80px',
            text: 'Returned: $' + buildBlock.price,
            pos: 'bottom-left',
            showAction: false
        });
    }
}

function enableBuildBlock(id, enable) {
    const block = BUILD_BLOCKS[id];
    document.getElementById('tdBlock' + block.tileId).disabled = !enable;
    document.getElementById('tdBlock' + block.tileId).style.opacity = enable ? "1" : "0";
}

function checkLimits(currentBuildBlock) {
    if (GLOBAL_SETTINGS.workingArea.maxBlocks < (GLOBAL_SETTINGS.workingArea.totalBlocks + 1)) {
        log.toELog("The maximum number of blocks used has been reached");
        return false;
    }
    if (GLOBAL_SETTINGS.workingArea.maxPrice < (GLOBAL_SETTINGS.workingArea.totalPrice + currentBuildBlock.price)) {
        log.toELog("The maximum project price has been reached");
        return false;
    }
    if (GLOBAL_SETTINGS.workingArea.maxArea < (GLOBAL_SETTINGS.workingArea.totalArea + currentBuildBlock.square)) {
        log.toELog("The maximum area used by the project has been reached");
        return false;
    }
    return true;
}

function checkJsonObject(json) {

    const validJson = {
        name: "",
        email: "",
        author: "",
        created: "",
        modified: "",
        rating: 0,
        totalArea: 0,
        totalPrice: 0,
        totalBlocks: 0,
        maxArea: 0,
        maxPrice: 0,
        maxBlocks: 0,
        blocks: [],
    };

    const validKeys = Object.keys(validJson);
    const jsonKeys = Object.keys(json);
    if (jsonKeys.length !== validKeys.length) {
        log.toELog("Selected JSON file is not valid");
        return false;
    }
    for (let i = 0; i < jsonKeys.length; ++i) {
        let found = false;
        for (let j = 0; j < validKeys.length; ++j) {
            if (validKeys[j] === jsonKeys[i]) {
                found = true;
                break;
            }
        }
        if (!found) {
            log.toELog("In json file: " + validKeys[i] + " key is not exists");
            return false;
        }
    }
    return true;
}

function saveData() {

    const projectName = document.getElementById("projectName").value;
    const author = document.getElementById("author").value;
    const email = document.getElementById("email").value;

    if (email.length === undefined || email.length === 0) {
        log.toELog("The email value is invalid");
        return;
    }
    if (projectName.length === undefined || projectName.length === 0) {
        log.toELog("The project name is invalid");
        return;
    }
    if (author.length === undefined || author.length === 0) {
        log.toELog("The author name value is invalid");
        return;
    }

    let json = {
        name: projectName,
        email: email,
        author: author,
        created: "05.02.2023 12:00:00",
        modified: "",
        rating: 0,
        maxArea: GLOBAL_SETTINGS.workingArea.maxArea,
        maxPrice: GLOBAL_SETTINGS.workingArea.maxPrice,
        maxBlocks: GLOBAL_SETTINGS.workingArea.maxBlocks,
        totalArea: GLOBAL_SETTINGS.workingArea.totalArea,
        totalPrice: GLOBAL_SETTINGS.workingArea.totalPrice,
        totalBlocks: GLOBAL_SETTINGS.workingArea.totalBlocks,
        blocks: [],
    };

    for (let i = 0; i < WORKING_AREA.length; ++i) {
        const block = WORKING_AREA[i];
        if (block.blocksLength > 1) {
            json.blocks.push({
                id: block.id,
                tiles: block.blocks
            });
        }
    }
    if (json.blocks.length > 0) {
        encrypt(json, json.name);
    } else {
        log.toELog("The project is empty");
    }
}

function encrypt(json, fileName) {
    if (checkJsonObject(json)) {
        // download(JSON.stringify(json), fileName, 'application/json');
        download(encryptJsonString(JSON.stringify(json)), fileName, 'text/plain');
    }
}

function download(content, fileName, contentType) {
    let a = document.createElement("a");
    let file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

function validFileContent(fileContent) {
    return fileContent.length !== 0;
}

function parseFileContent(fileContent) {
    try {
        return JSON.parse(fileContent);
    } catch (e) {
        return null;
    }
}

function resetData() {
    removeAllElements();
    document.getElementById('projectName').value = "";
    document.getElementById('email').value = "";
    document.getElementById('author').value = "";
}

function removeAllElements() {
    clearBuildBlocksData();
    clearWorkingAreaData();
}

function clearBuildBlocksData() {
    for (let i = 0; i < BUILD_BLOCKS.length; ++i) {
        const block = BUILD_BLOCKS[i];
        block.available = 500;
    }
    updateInfoBoardForBuildBlocks();
}

function clearWorkingAreaData() {
    for (let i = 0; i < WORKING_AREA.length; ++i) {
        const workBlock = WORKING_AREA[i];
        const cell = document.getElementById('tdWorkingAreaBlock' + workBlock.id);
        workBlock.removeAllBlocks();
        cell.style.backgroundImage = workBlock.imageUrl;
    }
    GLOBAL_SETTINGS.workingArea.totalArea = 0;
    GLOBAL_SETTINGS.workingArea.totalPrice = 0;
    GLOBAL_SETTINGS.workingArea.totalBlocks = 0;
    updateInfoBoardForWorkingArea();
}

function updateWorkBlock(blockId, blockTiles) {
    const currentWorkBlock = WORKING_AREA[blockId];
    for (let i = blockTiles.length - 2; i >= 0; --i) {
        const infoBlock = BUILD_BLOCKS[blockTiles[i]];
        currentWorkBlock.pushBlock(blockTiles[i]);
        infoBlock.available--;
        GLOBAL_SETTINGS.workingArea.totalArea += infoBlock.square;
        GLOBAL_SETTINGS.workingArea.totalPrice += infoBlock.price;
        GLOBAL_SETTINGS.workingArea.totalBlocks++;
    }
    const cell = document.getElementById(`tdWorkingAreaBlock${currentWorkBlock.id}`);
    cell.style.backgroundImage = currentWorkBlock.imageUrl;
    updateInfoBoardForBuildBlocks();
    updateInfoBoardForWorkingArea();
}

function updateProjectInfo(project) {
    document.getElementById("email").value = project.email;
    document.getElementById("author").value = project.author;
    document.getElementById("projectName").value = project.name;
    updateProjectLimits(project);
}

function setFilterBtnHandlers() {

    let btn1 = document.getElementById('btn-check-construction');
    let btn2 = document.getElementById('btn-check-electronics');
    let btn3 = document.getElementById('btn-check-home');
    let btn4 = document.getElementById('btn-check-greens');
    let btn5 = document.getElementById('btn-check-other');

    const showMaterials = function (id, event) {
        console.log(id);
        switch (Number(id)) {
            case 0: {
                GLOBAL_SETTINGS.filteringButtons.btn1IsClicked = event.currentTarget.checked;
                break;
            }
            case 1: {
                GLOBAL_SETTINGS.filteringButtons.btn2IsClicked = event.currentTarget.checked;
                break;
            }
            case 2: {
                GLOBAL_SETTINGS.filteringButtons.btn3IsClicked = event.currentTarget.checked;
                break;
            }
            case 3: {
                GLOBAL_SETTINGS.filteringButtons.btn4IsClicked = event.currentTarget.checked;
                break;
            }
            case 4: {
                GLOBAL_SETTINGS.filteringButtons.btn5IsClicked = event.currentTarget.checked;
                break;
            }
            default: {
                return;
            }
        }

        // Change button color
        if (event.currentTarget.checked) {
            ++GLOBAL_SETTINGS.filteringButtons.numOfClicked;
        } else {
            --GLOBAL_SETTINGS.filteringButtons.numOfClicked;
        }

        if (event.currentTarget.checked) {
            for (let i = 0; i < BUILD_BLOCKS.length; ++i) {
                const block = BUILD_BLOCKS[i];
                if (block.materialId === Number(id)) {
                    document.getElementById('tdBlock' + block.tileId).disabled = false;
                    document.getElementById('tdBlock' + block.tileId).style.opacity = "1";
                } else {

                    let blockIsSorted = false;
                    switch (block.materialId) {
                        case 0:
                            blockIsSorted = GLOBAL_SETTINGS.filteringButtons.btn1IsClicked;
                            break;
                        case 1:
                            blockIsSorted = GLOBAL_SETTINGS.filteringButtons.btn2IsClicked;
                            break;
                        case 2:
                            blockIsSorted = GLOBAL_SETTINGS.filteringButtons.btn3IsClicked;
                            break;
                        case 3:
                            blockIsSorted = GLOBAL_SETTINGS.filteringButtons.btn4IsClicked;
                            break;
                        case 4:
                            blockIsSorted = GLOBAL_SETTINGS.filteringButtons.btn5IsClicked;
                            break;
                        default:
                            break;
                    }

                    if (!blockIsSorted) {
                        document.getElementById('tdBlock' + block.tileId).disabled = true;
                        document.getElementById('tdBlock' + block.tileId).style.opacity = "0.1";
                    }
                }
            }
        } else {

            if (GLOBAL_SETTINGS.filteringButtons.numOfClicked === 0) {
                for (let i = 0; i < BUILD_BLOCKS.length; ++i) {
                    const block = BUILD_BLOCKS[i];
                    document.getElementById('tdBlock' + block.tileId).disabled = false;
                    document.getElementById('tdBlock' + block.tileId).style.opacity = "1";
                }
            } else {
                for (let i = 0; i < BUILD_BLOCKS.length; ++i) {
                    const block = BUILD_BLOCKS[i];
                    if (block.materialId === id) {
                        document.getElementById('tdBlock' + block.tileId).disabled = true;
                        document.getElementById('tdBlock' + block.tileId).style.opacity = "0.1";
                    }
                }
            }
        }
    };

    btn1.addEventListener('change', (event) => {
        showMaterials(0, event);
    });
    btn2.addEventListener('change', (event) => {
        showMaterials(1, event);
    });
    btn3.addEventListener('change', (event) => {
        showMaterials(2, event);
    });
    btn4.addEventListener('change', (event) => {
        showMaterials(3, event);
    });
    btn5.addEventListener('change', (event) => {
        showMaterials(4, event);
    });
}

function encryptJsonString(json) {
    return CryptoJS.AES.encrypt(json, GLOBAL_SETTINGS.secretPassphrase);
}

function decryptJsonString(json) {
    try {
        return CryptoJS.AES.decrypt(json, GLOBAL_SETTINGS.secretPassphrase).toString(CryptoJS.enc.Utf8);
    } catch (e) {
        return "";
    }
}

function loadData() {
    let input = document.createElement('input');
    input.type = 'file';
    input.onchange = _ => {
        let files = Array.from(input.files);

        let file = files[0];
        let reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function () {
            const fileContent = reader.result;
            if (validFileContent(fileContent)) {
                const decryptedContent = decryptJsonString(fileContent);
                const json = parseFileContent(decryptedContent);
                if (json !== null) {
                    if (checkJsonObject(json)) {
                        removeAllElements();
                        for (let i = 0; i < json.blocks.length; ++i) {
                            updateWorkBlock(json.blocks[i].id, json.blocks[i].tiles);
                        }
                        GLOBAL_SETTINGS.workingArea.maxArea = json.maxArea;
                        GLOBAL_SETTINGS.workingArea.maxPrice = json.maxPrice;
                        GLOBAL_SETTINGS.workingArea.maxBlocks = json.maxBlocks;
                        updateProjectInfo(json);
                        updateProjectLimits();
                    }
                    else {
                        log.toELog("The selected file is invalid project file");    
                    }
                } else {
                    log.toELog("The selected file is not the files of this project");
                }
            } else {
                log.toELog("The selected file is empty");
            }
        };
        reader.onerror = function () {
            log.toELog("An error occurred while trying to upload a file");
        };
    };
    input.click();
}

function updateProjectLimits() {
    document.getElementById("maxWorkPrice").value = GLOBAL_SETTINGS.workingArea.maxPrice;
    document.getElementById("maxWorkBlocks").value = GLOBAL_SETTINGS.workingArea.maxBlocks;
    document.getElementById("maxWorkSquare").value = GLOBAL_SETTINGS.workingArea.maxArea;
}

function enableLimitModule(enable) {
    document.getElementById("maxWorkPrice").disabled = !enable;
    document.getElementById("maxWorkBlocks").disabled = !enable;
    document.getElementById("maxWorkSquare").disabled = !enable;
    document.getElementById("setLimits").disabled = !enable;
}

function setLimits() {
    if (GLOBAL_SETTINGS.workingArea.totalBlocks !== 0) {
        log.toELog("Setting project limits is only possible if the project is empty");
        return;
    }
    GLOBAL_SETTINGS.workingArea.maxPrice = document.getElementById("maxWorkPrice").value;
    GLOBAL_SETTINGS.workingArea.maxBlocks = document.getElementById("maxWorkBlocks").value;
    GLOBAL_SETTINGS.workingArea.maxArea = document.getElementById("maxWorkSquare").value;
    log.toILog("The installation of project limits is successful");
}

function showImageModal(id) {
    $(`#modal${id}`).modal('show')
}

function closeImageModal(id) {
    $(`#modal${id}`).modal('hide')
}

function loadProjectByModalIndex(id) {

    if (GLOBAL_SETTINGS.workingArea.totalBlocks !== 0) {
        closeImageModal(id);
        showImageModal(7);
        return;
    }

    if (id > 4) {
        closeImageModal(id);
        showImageModal(8);
        return;
    }

    resetData();
    closeImageModal(id);

    {
        const jsonExample1 = {
            "name": "My house",
            "email": "otojermaks@gmail.com",
            "author": "Oto Jermaks",
            "created": "05.02.2023 12:00:00",
            "modified": "",
            "rating": 5,
            "maxArea": "1000000",
            "maxPrice": "1000000",
            "maxBlocks": "1000000",
            "totalArea": 303,
            "totalPrice": 84992,
            "totalBlocks": 303,
            "blocks": [{"id": 0, "tiles": [363, 483]}, {"id": 1, "tiles": [26, 483]}, {
                "id": 2,
                "tiles": [56, 483]
            }, {"id": 3, "tiles": [379, 483]}, {"id": 8, "tiles": [503, 483]}, {
                "id": 10,
                "tiles": [503, 483]
            }, {"id": 11, "tiles": [514, 483]}, {"id": 12, "tiles": [488, 483]}, {
                "id": 13,
                "tiles": [498, 483]
            }, {"id": 14, "tiles": [498, 483]}, {"id": 15, "tiles": [505, 483]}, {
                "id": 16,
                "tiles": [498, 483]
            }, {"id": 17, "tiles": [498, 483]}, {"id": 18, "tiles": [507, 498, 483]}, {
                "id": 19,
                "tiles": [498, 483]
            }, {"id": 20, "tiles": [498, 483]}, {"id": 21, "tiles": [498, 483]}, {
                "id": 25,
                "tiles": [363, 483]
            }, {"id": 26, "tiles": [26, 483]}, {"id": 27, "tiles": [56, 483]}, {
                "id": 28,
                "tiles": [379, 483]
            }, {"id": 31, "tiles": [503, 483]}, {"id": 33, "tiles": [514, 483]}, {
                "id": 34,
                "tiles": [488, 483]
            }, {"id": 35, "tiles": [505, 483]}, {"id": 36, "tiles": [522, 483]}, {
                "id": 37,
                "tiles": [510, 483]
            }, {"id": 38, "tiles": [498, 505, 483]}, {"id": 39, "tiles": [498, 483]}, {
                "id": 40,
                "tiles": [498, 483]
            }, {"id": 41, "tiles": [498, 483]}, {"id": 42, "tiles": [498, 483]}, {
                "id": 43,
                "tiles": [498, 483]
            }, {"id": 44, "tiles": [498, 483]}, {"id": 45, "tiles": [507, 498, 483]}, {
                "id": 46,
                "tiles": [498, 483]
            }, {"id": 50, "tiles": [363, 483]}, {"id": 51, "tiles": [26, 483]}, {
                "id": 52,
                "tiles": [56, 483]
            }, {"id": 53, "tiles": [379, 483]}, {"id": 57, "tiles": [485, 483]}, {
                "id": 58,
                "tiles": [522, 483]
            }, {"id": 59, "tiles": [510, 483]}, {"id": 72, "tiles": [514, 483]}, {
                "id": 73,
                "tiles": [488, 483]
            }, {"id": 75, "tiles": [363, 483]}, {"id": 76, "tiles": [26, 483]}, {
                "id": 77,
                "tiles": [56, 483]
            }, {"id": 78, "tiles": [379, 483]}, {"id": 81, "tiles": [485, 483]}, {
                "id": 82,
                "tiles": [485, 483]
            }, {"id": 83, "tiles": [485, 483]}, {"id": 84, "tiles": [485, 483]}, {
                "id": 86,
                "tiles": [197, 483]
            }, {"id": 87, "tiles": [227, 483]}, {"id": 88, "tiles": [227, 483]}, {
                "id": 89,
                "tiles": [227, 483]
            }, {"id": 90, "tiles": [227, 483]}, {"id": 91, "tiles": [227, 483]}, {
                "id": 92,
                "tiles": [227, 483]
            }, {"id": 93, "tiles": [227, 483]}, {"id": 94, "tiles": [61, 483]}, {
                "id": 97,
                "tiles": [522, 483]
            }, {"id": 98, "tiles": [510, 483]}, {"id": 100, "tiles": [363, 483]}, {
                "id": 101,
                "tiles": [26, 483]
            }, {"id": 102, "tiles": [56, 483]}, {"id": 103, "tiles": [379, 483]}, {
                "id": 106,
                "tiles": [485, 483]
            }, {"id": 108, "tiles": [503, 483]}, {"id": 111, "tiles": [459, 187, 483]}, {
                "id": 112,
                "tiles": [187, 483]
            }, {"id": 113, "tiles": [462, 187, 483]}, {"id": 114, "tiles": [409, 187, 483]}, {
                "id": 115,
                "tiles": [10, 444, 187, 483]
            }, {"id": 116, "tiles": [187, 483]}, {"id": 117, "tiles": [187, 483]}, {
                "id": 118,
                "tiles": [505, 516, 187, 483]
            }, {"id": 119, "tiles": [231, 483]}, {"id": 125, "tiles": [363, 483]}, {
                "id": 126,
                "tiles": [26, 483]
            }, {"id": 127, "tiles": [56, 483]}, {"id": 128, "tiles": [379, 483]}, {
                "id": 136,
                "tiles": [225, 483]
            }, {"id": 137, "tiles": [187, 483]}, {"id": 138, "tiles": [6, 187, 483]}, {
                "id": 139,
                "tiles": [12, 187, 483]
            }, {"id": 140, "tiles": [187, 483]}, {"id": 141, "tiles": [187, 483]}, {
                "id": 142,
                "tiles": [187, 483]
            }, {"id": 143, "tiles": [187, 483]}, {"id": 144, "tiles": [153, 483]}, {
                "id": 151,
                "tiles": [26, 483]
            }, {"id": 152, "tiles": [56, 483]}, {"id": 153, "tiles": [379, 483]}, {
                "id": 160,
                "tiles": [126, 483]
            }, {"id": 161, "tiles": [231, 483]}, {"id": 162, "tiles": [187, 483]}, {
                "id": 163,
                "tiles": [187, 483]
            }, {"id": 164, "tiles": [187, 483]}, {"id": 165, "tiles": [187, 483]}, {
                "id": 166,
                "tiles": [187, 483]
            }, {"id": 167, "tiles": [187, 483]}, {"id": 168, "tiles": [187, 483]}, {
                "id": 169,
                "tiles": [379, 472, 187, 483]
            }, {"id": 176, "tiles": [26, 483]}, {"id": 177, "tiles": [56, 483]}, {
                "id": 178,
                "tiles": [379, 483]
            }, {"id": 180, "tiles": [267, 483]}, {"id": 181, "tiles": [227, 483]}, {
                "id": 182,
                "tiles": [227, 483]
            }, {"id": 183, "tiles": [227, 483]}, {"id": 184, "tiles": [227, 483]}, {
                "id": 185,
                "tiles": [227, 483]
            }, {"id": 186, "tiles": [81, 483]}, {"id": 187, "tiles": [187, 483]}, {
                "id": 188,
                "tiles": [187, 483]
            }, {"id": 189, "tiles": [187, 483]}, {"id": 190, "tiles": [187, 483]}, {
                "id": 191,
                "tiles": [187, 483]
            }, {"id": 192, "tiles": [187, 483]}, {"id": 193, "tiles": [187, 483]}, {
                "id": 194,
                "tiles": [225, 483]
            }, {"id": 200, "tiles": [39, 483]}, {"id": 201, "tiles": [53, 483]}, {
                "id": 202,
                "tiles": [56, 483]
            }, {"id": 203, "tiles": [379, 483]}, {"id": 205, "tiles": [231, 483]}, {
                "id": 206,
                "tiles": [0, 455, 293, 483]
            }, {"id": 207, "tiles": [1, 455, 293, 483]}, {"id": 208, "tiles": [458, 455, 293, 483]}, {
                "id": 209,
                "tiles": [502, 455, 293, 483]
            }, {"id": 210, "tiles": [3, 455, 293, 483]}, {"id": 211, "tiles": [231, 483]}, {
                "id": 212,
                "tiles": [405, 187, 483]
            }, {"id": 213, "tiles": [384, 187, 483]}, {"id": 214, "tiles": [443, 187, 483]}, {
                "id": 215,
                "tiles": [405, 187, 483]
            }, {"id": 216, "tiles": [187, 483]}, {"id": 217, "tiles": [441, 187, 483]}, {
                "id": 218,
                "tiles": [390, 187, 483]
            }, {"id": 219, "tiles": [231, 483]}, {"id": 225, "tiles": [17, 483]}, {
                "id": 226,
                "tiles": [17, 483]
            }, {"id": 227, "tiles": [19, 483]}, {"id": 228, "tiles": [379, 483]}, {
                "id": 230,
                "tiles": [153, 483]
            }, {"id": 231, "tiles": [293, 483]}, {"id": 232, "tiles": [456, 293, 483]}, {
                "id": 233,
                "tiles": [375, 293, 483]
            }, {"id": 234, "tiles": [329, 293, 483]}, {"id": 235, "tiles": [293, 483]}, {
                "id": 236,
                "tiles": [161, 483]
            }, {"id": 237, "tiles": [227, 483]}, {"id": 238, "tiles": [227, 483]}, {
                "id": 239,
                "tiles": [227, 483]
            }, {"id": 240, "tiles": [134, 483]}, {"id": 241, "tiles": [114, 483]}, {
                "id": 242,
                "tiles": [197, 483]
            }, {"id": 243, "tiles": [227, 483]}, {"id": 244, "tiles": [169, 483]}, {
                "id": 253,
                "tiles": [379, 483]
            }, {"id": 255, "tiles": [459, 114, 483]}, {"id": 256, "tiles": [293, 483]}, {
                "id": 257,
                "tiles": [461, 480, 479, 293, 483]
            }, {"id": 258, "tiles": [507, 327, 415, 293, 483]}, {
                "id": 259,
                "tiles": [401, 382, 386, 293, 483]
            }, {"id": 260, "tiles": [293, 483]}, {"id": 261, "tiles": [309, 480, 293, 483]}, {
                "id": 262,
                "tiles": [414, 293, 483]
            }, {"id": 263, "tiles": [505, 293, 483]}, {"id": 264, "tiles": [293, 483]}, {
                "id": 265,
                "tiles": [293, 483]
            }, {"id": 266, "tiles": [293, 483]}, {"id": 267, "tiles": [293, 483]}, {
                "id": 268,
                "tiles": [293, 483]
            }, {"id": 269, "tiles": [402, 114, 483]}, {"id": 275, "tiles": [457, 483]}, {
                "id": 276,
                "tiles": [457, 483]
            }, {"id": 277, "tiles": [457, 483]}, {"id": 278, "tiles": [457, 483]}, {
                "id": 280,
                "tiles": [459, 114, 483]
            }, {"id": 281, "tiles": [293, 483]}, {"id": 282, "tiles": [397, 293, 483]}, {
                "id": 283,
                "tiles": [411, 293, 483]
            }, {"id": 284, "tiles": [437, 114, 483]}, {"id": 285, "tiles": [293, 483]}, {
                "id": 286,
                "tiles": [293, 483]
            }, {"id": 287, "tiles": [293, 483]}, {"id": 288, "tiles": [293, 483]}, {
                "id": 289,
                "tiles": [293, 483]
            }, {"id": 290, "tiles": [104, 293, 483]}, {"id": 291, "tiles": [293, 483]}, {
                "id": 292,
                "tiles": [293, 483]
            }, {"id": 293, "tiles": [293, 483]}, {"id": 294, "tiles": [243, 114, 483]}, {
                "id": 305,
                "tiles": [225, 483]
            }, {"id": 306, "tiles": [13, 293, 483]}, {"id": 307, "tiles": [436, 293, 483]}, {
                "id": 308,
                "tiles": [436, 293, 483]
            }, {"id": 309, "tiles": [436, 293, 483]}, {"id": 310, "tiles": [293, 483]}, {
                "id": 311,
                "tiles": [293, 483]
            }, {"id": 312, "tiles": [293, 483]}, {"id": 313, "tiles": [293, 483]}, {
                "id": 314,
                "tiles": [293, 483]
            }, {"id": 315, "tiles": [293, 483]}, {"id": 316, "tiles": [293, 483]}, {
                "id": 317,
                "tiles": [293, 483]
            }, {"id": 318, "tiles": [293, 483]}, {"id": 319, "tiles": [402, 293, 483]}, {
                "id": 330,
                "tiles": [161, 483]
            }, {"id": 331, "tiles": [227, 483]}, {"id": 332, "tiles": [227, 483]}, {
                "id": 333,
                "tiles": [227, 483]
            }, {"id": 334, "tiles": [227, 483]}, {"id": 335, "tiles": [227, 483]}, {
                "id": 336,
                "tiles": [227, 483]
            }, {"id": 337, "tiles": [227, 483]}, {"id": 338, "tiles": [227, 483]}, {
                "id": 339,
                "tiles": [227, 483]
            }, {"id": 340, "tiles": [227, 483]}, {"id": 341, "tiles": [227, 483]}, {
                "id": 342,
                "tiles": [227, 483]
            }, {"id": 343, "tiles": [227, 483]}, {"id": 344, "tiles": [134, 483]}, {
                "id": 369,
                "tiles": [428, 483]
            }, {"id": 390, "tiles": [514, 483]}, {"id": 391, "tiles": [488, 483]}, {
                "id": 392,
                "tiles": [503, 483]
            }, {"id": 415, "tiles": [522, 483]}, {"id": 416, "tiles": [510, 483]}, {
                "id": 425,
                "tiles": [513, 483]
            }, {"id": 451, "tiles": [509, 483]}, {"id": 452, "tiles": [495, 483]}, {
                "id": 454,
                "tiles": [504, 483]
            }, {"id": 476, "tiles": [511, 483]}, {"id": 477, "tiles": [515, 483]}, {
                "id": 478,
                "tiles": [498, 483]
            }, {"id": 480, "tiles": [506, 483]}, {"id": 500, "tiles": [513, 483]}, {
                "id": 503,
                "tiles": [509, 483]
            }, {"id": 504, "tiles": [495, 483]}, {"id": 506, "tiles": [513, 483]}]
        };
        const jsonExample2 = {
            "name": "Villa",
            "email": "otojermaks@gmail.com",
            "author": "Oto Jermaks",
            "created": "06.03.2023 01:15:00",
            "modified": "",
            "rating": 0,
            "maxArea": "1000000",
            "maxPrice": "1000000",
            "maxBlocks": "1000000",
            "totalArea": 550,
            "totalPrice": 154354,
            "totalBlocks": 550,
            "blocks": [{"id": 5, "tiles": [125, 483]}, {"id": 6, "tiles": [101, 483]}, {
                "id": 8,
                "tiles": [267, 227, 483]
            }, {"id": 9, "tiles": [227, 483]}, {"id": 10, "tiles": [227, 483]}, {
                "id": 11,
                "tiles": [227, 483]
            }, {"id": 12, "tiles": [61, 483]}, {"id": 23, "tiles": [10, 483]}, {
                "id": 24,
                "tiles": [56, 483]
            }, {"id": 33, "tiles": [231, 483]}, {"id": 34, "tiles": [441, 187, 483]}, {
                "id": 35,
                "tiles": [390, 187, 483]
            }, {"id": 36, "tiles": [8, 187, 483]}, {"id": 37, "tiles": [231, 483]}, {
                "id": 38,
                "tiles": [505, 483]
            }, {"id": 39, "tiles": [503, 483]}, {"id": 49, "tiles": [56, 483]}, {
                "id": 58,
                "tiles": [231, 483]
            }, {"id": 59, "tiles": [187, 483]}, {"id": 60, "tiles": [187, 483]}, {
                "id": 61,
                "tiles": [187, 483]
            }, {"id": 62, "tiles": [231, 483]}, {"id": 63, "tiles": [485, 483]}, {
                "id": 64,
                "tiles": [498, 483]
            }, {"id": 65, "tiles": [485, 483]}, {"id": 66, "tiles": [503, 483]}, {
                "id": 74,
                "tiles": [56, 483]
            }, {"id": 76, "tiles": [267, 231, 483]}, {"id": 77, "tiles": [227, 483]}, {
                "id": 78,
                "tiles": [227, 483]
            }, {"id": 79, "tiles": [227, 483]}, {"id": 80, "tiles": [227, 483]}, {
                "id": 81,
                "tiles": [227, 483]
            }, {"id": 82, "tiles": [227, 483]}, {"id": 83, "tiles": [256, 483]}, {
                "id": 84,
                "tiles": [258, 310, 187, 483]
            }, {"id": 85, "tiles": [310, 187, 483]}, {"id": 86, "tiles": [404, 310, 187, 483]}, {
                "id": 87,
                "tiles": [81, 483]
            }, {"id": 89, "tiles": [503, 483]}, {"id": 90, "tiles": [485, 483]}, {
                "id": 91,
                "tiles": [505, 483]
            }, {"id": 92, "tiles": [497, 483]}, {"id": 93, "tiles": [498, 483]}, {
                "id": 99,
                "tiles": [56, 483]
            }, {"id": 101, "tiles": [153, 483]}, {"id": 102, "tiles": [451, 226, 483]}, {
                "id": 103,
                "tiles": [6, 226, 483]
            }, {"id": 104, "tiles": [12, 226, 483]}, {"id": 105, "tiles": [226, 483]}, {
                "id": 106,
                "tiles": [226, 483]
            }, {"id": 107, "tiles": [226, 483]}, {"id": 108, "tiles": [226, 483]}, {
                "id": 109,
                "tiles": [226, 483]
            }, {"id": 110, "tiles": [226, 483]}, {"id": 111, "tiles": [226, 483]}, {
                "id": 112,
                "tiles": [231, 483]
            }, {"id": 114, "tiles": [498, 483]}, {"id": 116, "tiles": [505, 483]}, {
                "id": 117,
                "tiles": [514, 483]
            }, {"id": 118, "tiles": [488, 483]}, {"id": 119, "tiles": [485, 483]}, {
                "id": 120,
                "tiles": [505, 483]
            }, {"id": 123, "tiles": [10, 483]}, {"id": 124, "tiles": [51, 483]}, {
                "id": 125,
                "tiles": [506, 483]
            }, {"id": 126, "tiles": [459, 226, 483]}, {"id": 127, "tiles": [226, 483]}, {
                "id": 128,
                "tiles": [226, 483]
            }, {"id": 129, "tiles": [226, 483]}, {"id": 130, "tiles": [226, 483]}, {
                "id": 131,
                "tiles": [226, 483]
            }, {"id": 132, "tiles": [226, 483]}, {"id": 133, "tiles": [226, 483]}, {
                "id": 134,
                "tiles": [206, 226, 483]
            }, {"id": 135, "tiles": [226, 483]}, {"id": 136, "tiles": [226, 483]}, {
                "id": 137,
                "tiles": [153, 483]
            }, {"id": 141, "tiles": [485, 483]}, {"id": 142, "tiles": [522, 483]}, {
                "id": 143,
                "tiles": [510, 483]
            }, {"id": 144, "tiles": [485, 483]}, {"id": 145, "tiles": [498, 483]}, {
                "id": 151,
                "tiles": [459, 226, 483]
            }, {"id": 152, "tiles": [226, 483]}, {"id": 153, "tiles": [361, 226, 483]}, {
                "id": 154,
                "tiles": [377, 226, 483]
            }, {"id": 155, "tiles": [226, 483]}, {"id": 156, "tiles": [226, 483]}, {
                "id": 157,
                "tiles": [226, 483]
            }, {"id": 158, "tiles": [226, 483]}, {"id": 159, "tiles": [272, 226, 483]}, {
                "id": 160,
                "tiles": [226, 483]
            }, {"id": 161, "tiles": [226, 483]}, {"id": 162, "tiles": [469, 226, 483]}, {
                "id": 167,
                "tiles": [498, 483]
            }, {"id": 168, "tiles": [503, 483]}, {"id": 169, "tiles": [498, 483]}, {
                "id": 170,
                "tiles": [498, 483]
            }, {"id": 176, "tiles": [225, 483]}, {"id": 177, "tiles": [8, 226, 483]}, {
                "id": 178,
                "tiles": [462, 226, 483]
            }, {"id": 179, "tiles": [409, 226, 483]}, {"id": 180, "tiles": [8, 226, 483]}, {
                "id": 181,
                "tiles": [226, 483]
            }, {"id": 182, "tiles": [226, 483]}, {"id": 183, "tiles": [516, 226, 483]}, {
                "id": 184,
                "tiles": [226, 483]
            }, {"id": 185, "tiles": [226, 483]}, {"id": 186, "tiles": [226, 483]}, {
                "id": 187,
                "tiles": [225, 483]
            }, {"id": 194, "tiles": [424, 483]}, {"id": 198, "tiles": [514, 483]}, {
                "id": 199,
                "tiles": [488, 483]
            }, {"id": 201, "tiles": [90, 483]}, {"id": 202, "tiles": [227, 483]}, {
                "id": 203,
                "tiles": [227, 483]
            }, {"id": 204, "tiles": [227, 483]}, {"id": 205, "tiles": [227, 483]}, {
                "id": 206,
                "tiles": [227, 483]
            }, {"id": 207, "tiles": [227, 483]}, {"id": 208, "tiles": [227, 483]}, {
                "id": 209,
                "tiles": [258, 471, 293, 226, 258, 483]
            }, {"id": 210, "tiles": [352, 471, 293, 226, 483]}, {
                "id": 211,
                "tiles": [404, 471, 293, 226, 404, 483]
            }, {"id": 212, "tiles": [117, 256, 483]}, {"id": 213, "tiles": [227, 483]}, {
                "id": 214,
                "tiles": [227, 483]
            }, {"id": 215, "tiles": [227, 483]}, {"id": 216, "tiles": [228, 227, 483]}, {
                "id": 217,
                "tiles": [227, 483]
            }, {"id": 218, "tiles": [258, 352, 294, 483]}, {"id": 219, "tiles": [352, 294, 483]}, {
                "id": 220,
                "tiles": [404, 352, 294, 483]
            }, {"id": 221, "tiles": [227, 483]}, {"id": 222, "tiles": [61, 483]}, {
                "id": 223,
                "tiles": [522, 483]
            }, {"id": 224, "tiles": [510, 363, 457, 483]}, {"id": 226, "tiles": [153, 483]}, {
                "id": 227,
                "tiles": [505, 114, 483]
            }, {"id": 228, "tiles": [114, 483]}, {"id": 229, "tiles": [6, 114, 483]}, {
                "id": 230,
                "tiles": [12, 114, 483]
            }, {"id": 231, "tiles": [114, 483]}, {"id": 232, "tiles": [114, 483]}, {
                "id": 233,
                "tiles": [114, 483]
            }, {"id": 234, "tiles": [114, 483]}, {"id": 235, "tiles": [114, 483]}, {
                "id": 236,
                "tiles": [505, 114, 483]
            }, {"id": 237, "tiles": [231, 483]}, {"id": 238, "tiles": [10, 294, 483]}, {
                "id": 239,
                "tiles": [14, 294, 483]
            }, {"id": 240, "tiles": [10, 294, 483]}, {"id": 241, "tiles": [272, 294, 272, 483]}, {
                "id": 242,
                "tiles": [294, 483]
            }, {"id": 243, "tiles": [294, 483]}, {"id": 244, "tiles": [294, 483]}, {
                "id": 245,
                "tiles": [294, 483]
            }, {"id": 246, "tiles": [294, 483]}, {"id": 247, "tiles": [153, 483]}, {
                "id": 249,
                "tiles": [363, 483]
            }, {"id": 251, "tiles": [459, 114, 483]}, {"id": 252, "tiles": [114, 483]}, {
                "id": 253,
                "tiles": [114, 483]
            }, {"id": 254, "tiles": [114, 483]}, {"id": 255, "tiles": [114, 483]}, {
                "id": 256,
                "tiles": [114, 483]
            }, {"id": 257, "tiles": [114, 483]}, {"id": 258, "tiles": [456, 114, 483]}, {
                "id": 259,
                "tiles": [329, 114, 483]
            }, {"id": 260, "tiles": [293, 483]}, {"id": 261, "tiles": [114, 483]}, {
                "id": 262,
                "tiles": [231, 483]
            }, {"id": 263, "tiles": [384, 294, 483]}, {"id": 264, "tiles": [337, 294, 483]}, {
                "id": 265,
                "tiles": [443, 294, 483]
            }, {"id": 266, "tiles": [294, 483]}, {"id": 267, "tiles": [294, 483]}, {
                "id": 268,
                "tiles": [314, 294, 483]
            }, {"id": 269, "tiles": [357, 294, 483]}, {"id": 270, "tiles": [367, 294, 483]}, {
                "id": 271,
                "tiles": [294, 483]
            }, {"id": 272, "tiles": [379, 294, 483]}, {"id": 274, "tiles": [363, 483]}, {
                "id": 276,
                "tiles": [459, 114, 483]
            }, {"id": 277, "tiles": [114, 483]}, {"id": 278, "tiles": [480, 114, 483]}, {
                "id": 279,
                "tiles": [401, 327, 114, 483]
            }, {"id": 280, "tiles": [327, 114, 483]}, {"id": 281, "tiles": [413, 382, 114, 483]}, {
                "id": 282,
                "tiles": [114, 483]
            }, {"id": 283, "tiles": [479, 114, 483]}, {"id": 284, "tiles": [386, 114, 483]}, {
                "id": 285,
                "tiles": [114, 483]
            }, {"id": 286, "tiles": [114, 483]}, {"id": 287, "tiles": [90, 483]}, {
                "id": 288,
                "tiles": [227, 483]
            }, {"id": 289, "tiles": [227, 483]}, {"id": 290, "tiles": [227, 483]}, {
                "id": 291,
                "tiles": [258, 294, 483]
            }, {"id": 292, "tiles": [294, 483]}, {"id": 293, "tiles": [438, 294, 483]}, {
                "id": 294,
                "tiles": [369, 294, 483]
            }, {"id": 295, "tiles": [322, 294, 483]}, {"id": 296, "tiles": [294, 483]}, {
                "id": 297,
                "tiles": [206, 379, 294, 483]
            }, {"id": 299, "tiles": [363, 483]}, {"id": 301, "tiles": [459, 114, 483]}, {
                "id": 302,
                "tiles": [114, 483]
            }, {"id": 303, "tiles": [436, 114, 483]}, {"id": 304, "tiles": [436, 114, 483]}, {
                "id": 305,
                "tiles": [436, 114, 483]
            }, {"id": 306, "tiles": [436, 114, 483]}, {"id": 307, "tiles": [114, 483]}, {
                "id": 308,
                "tiles": [397, 114, 483]
            }, {"id": 309, "tiles": [437, 114, 483]}, {"id": 310, "tiles": [114, 483]}, {
                "id": 311,
                "tiles": [114, 483]
            }, {"id": 312, "tiles": [272, 379, 114, 483]}, {"id": 313, "tiles": [294, 483]}, {
                "id": 314,
                "tiles": [294, 483]
            }, {"id": 315, "tiles": [294, 483]}, {"id": 316, "tiles": [294, 483]}, {
                "id": 317,
                "tiles": [294, 483]
            }, {"id": 318, "tiles": [294, 483]}, {"id": 319, "tiles": [294, 483]}, {
                "id": 320,
                "tiles": [294, 483]
            }, {"id": 321, "tiles": [294, 483]}, {"id": 322, "tiles": [272, 379, 294, 483]}, {
                "id": 324,
                "tiles": [363, 483]
            }, {"id": 326, "tiles": [459, 114, 483]}, {"id": 327, "tiles": [114, 483]}, {
                "id": 328,
                "tiles": [114, 483]
            }, {"id": 329, "tiles": [114, 483]}, {"id": 330, "tiles": [114, 483]}, {
                "id": 331,
                "tiles": [114, 483]
            }, {"id": 332, "tiles": [114, 483]}, {"id": 333, "tiles": [114, 483]}, {
                "id": 334,
                "tiles": [114, 483]
            }, {"id": 335, "tiles": [114, 483]}, {"id": 336, "tiles": [114, 483]}, {
                "id": 337,
                "tiles": [379, 114, 483]
            }, {"id": 338, "tiles": [294, 483]}, {"id": 339, "tiles": [294, 483]}, {
                "id": 340,
                "tiles": [294, 483]
            }, {"id": 341, "tiles": [294, 483]}, {"id": 342, "tiles": [294, 483]}, {
                "id": 343,
                "tiles": [294, 483]
            }, {"id": 344, "tiles": [294, 483]}, {"id": 345, "tiles": [294, 483]}, {
                "id": 346,
                "tiles": [294, 483]
            }, {"id": 347, "tiles": [379, 294, 483]}, {"id": 349, "tiles": [363, 483]}, {
                "id": 351,
                "tiles": [225, 483]
            }, {"id": 352, "tiles": [114, 483]}, {"id": 353, "tiles": [114, 483]}, {
                "id": 354,
                "tiles": [114, 483]
            }, {"id": 355, "tiles": [114, 483]}, {"id": 356, "tiles": [114, 483]}, {
                "id": 357,
                "tiles": [114, 483]
            }, {"id": 358, "tiles": [13, 114, 483]}, {"id": 359, "tiles": [114, 483]}, {
                "id": 360,
                "tiles": [114, 483]
            }, {"id": 361, "tiles": [114, 483]}, {"id": 362, "tiles": [206, 379, 114, 483]}, {
                "id": 363,
                "tiles": [447, 294, 483]
            }, {"id": 364, "tiles": [294, 483]}, {"id": 365, "tiles": [294, 483]}, {
                "id": 366,
                "tiles": [294, 483]
            }, {"id": 367, "tiles": [294, 483]}, {"id": 368, "tiles": [294, 351, 483]}, {
                "id": 369,
                "tiles": [294, 483]
            }, {"id": 370, "tiles": [331, 294, 483]}, {"id": 371, "tiles": [517, 294, 483]}, {
                "id": 372,
                "tiles": [225, 483]
            }, {"id": 374, "tiles": [363, 483]}, {"id": 376, "tiles": [231, 483]}, {
                "id": 377,
                "tiles": [114, 483]
            }, {"id": 378, "tiles": [114, 483]}, {"id": 379, "tiles": [114, 483]}, {
                "id": 380,
                "tiles": [114, 483]
            }, {"id": 381, "tiles": [114, 483]}, {"id": 382, "tiles": [114, 483]}, {
                "id": 383,
                "tiles": [225, 483]
            }, {"id": 384, "tiles": [433, 293, 483]}, {"id": 385, "tiles": [433, 293, 483]}, {
                "id": 386,
                "tiles": [404, 433, 293, 483]
            }, {"id": 387, "tiles": [256, 483]}, {"id": 388, "tiles": [227, 483]}, {
                "id": 389,
                "tiles": [227, 483]
            }, {"id": 390, "tiles": [227, 483]}, {"id": 391, "tiles": [227, 483]}, {
                "id": 392,
                "tiles": [227, 483]
            }, {"id": 393, "tiles": [227, 483]}, {"id": 394, "tiles": [228, 483]}, {
                "id": 395,
                "tiles": [227, 483]
            }, {"id": 396, "tiles": [227, 483]}, {"id": 397, "tiles": [81, 483]}, {
                "id": 399,
                "tiles": [363, 483]
            }, {"id": 401, "tiles": [231, 483]}, {"id": 402, "tiles": [8, 114, 351, 483]}, {
                "id": 403,
                "tiles": [114, 351, 483]
            }, {"id": 404, "tiles": [114, 351, 483]}, {"id": 405, "tiles": [114, 351, 351, 483]}, {
                "id": 406,
                "tiles": [114, 351, 483]
            }, {"id": 407, "tiles": [8, 114, 351, 483]}, {"id": 408, "tiles": [231, 351, 483]}, {
                "id": 409,
                "tiles": [398, 351, 483]
            }, {"id": 410, "tiles": [398, 351, 483]}, {"id": 411, "tiles": [398, 351, 483]}, {
                "id": 412,
                "tiles": [398, 351, 483]
            }, {"id": 413, "tiles": [398, 351, 483]}, {"id": 414, "tiles": [398, 351, 483]}, {
                "id": 415,
                "tiles": [398, 351, 483]
            }, {"id": 416, "tiles": [398, 351, 483]}, {"id": 417, "tiles": [398, 351, 483]}, {
                "id": 418,
                "tiles": [398, 351, 483]
            }, {"id": 419, "tiles": [272, 319, 398, 351, 483]}, {"id": 420, "tiles": [309, 46, 351, 483]}, {
                "id": 421,
                "tiles": [309, 46, 351, 483]
            }, {
                "id": 422, "tiles": [231,
                    483]
            }, {"id": 424, "tiles": [363, 483]}, {"id": 426, "tiles": [231, 483]}, {
                "id": 427,
                "tiles": [455, 114, 351, 483]
            }, {"id": 428, "tiles": [1, 455, 114, 351, 483]}, {"id": 429, "tiles": [0, 455, 114, 351, 483]}, {
                "id": 430,
                "tiles": [4, 455, 114, 351, 483]
            }, {"id": 431, "tiles": [455, 114, 351, 351, 483]}, {
                "id": 432,
                "tiles": [7, 455, 114, 351, 483]
            }, {"id": 433, "tiles": [231, 351, 483]}, {"id": 434, "tiles": [11, 398, 351, 483]}, {
                "id": 435,
                "tiles": [398, 351, 351, 483]
            }, {"id": 436, "tiles": [398, 351, 483]}, {"id": 437, "tiles": [398, 351, 483]}, {
                "id": 438,
                "tiles": [398, 351, 483]
            }, {"id": 439, "tiles": [398, 351, 483]}, {"id": 440, "tiles": [398, 351, 483]}, {
                "id": 441,
                "tiles": [398, 351, 483]
            }, {"id": 442, "tiles": [398, 351, 483]}, {"id": 443, "tiles": [398, 351, 483]}, {
                "id": 444,
                "tiles": [206, 319, 398, 351, 483]
            }, {"id": 445, "tiles": [309, 46, 351, 483]}, {"id": 446, "tiles": [309, 46, 351, 483]}, {
                "id": 447,
                "tiles": [231, 483]
            }, {"id": 449, "tiles": [363, 483]}, {"id": 451, "tiles": [161, 483]}, {
                "id": 452,
                "tiles": [227, 483]
            }, {"id": 453, "tiles": [227, 483]}, {"id": 454, "tiles": [227, 483]}, {
                "id": 455,
                "tiles": [227, 483]
            }, {"id": 456, "tiles": [227, 483]}, {"id": 457, "tiles": [227, 483]}, {
                "id": 458,
                "tiles": [256, 483]
            }, {"id": 459, "tiles": [227, 483]}, {"id": 460, "tiles": [227, 483]}, {
                "id": 461,
                "tiles": [227, 483]
            }, {"id": 462, "tiles": [227, 483]}, {"id": 463, "tiles": [227, 483]}, {
                "id": 464,
                "tiles": [227, 483]
            }, {"id": 465, "tiles": [227, 483]}, {"id": 466, "tiles": [227, 483]}, {
                "id": 467,
                "tiles": [227, 483]
            }, {"id": 468, "tiles": [227, 483]}, {"id": 469, "tiles": [256, 483]}, {
                "id": 470,
                "tiles": [227, 483]
            }, {"id": 471, "tiles": [227, 483]}, {"id": 472, "tiles": [169, 227, 483]}, {
                "id": 473,
                "tiles": [514, 483]
            }, {"id": 474, "tiles": [488, 363, 483]}, {"id": 475, "tiles": [498, 483]}, {
                "id": 476,
                "tiles": [498, 483]
            }, {"id": 497, "tiles": [449, 483]}, {"id": 498, "tiles": [522, 483]}, {
                "id": 499,
                "tiles": [510, 363, 483]
            }, {"id": 500, "tiles": [503, 483]}, {"id": 501, "tiles": [498, 483]}, {
                "id": 502,
                "tiles": [504, 483]
            }, {"id": 524, "tiles": [485, 363, 483]}]
        };
        const jsonExample3 = {
            "name": "Villa 2",
            "email": "otojermaks@gmail.com",
            "author": "Oto Jermaks",
            "created": "05.02.2023 12:00:00",
            "modified": "",
            "rating": 0,
            "maxArea": "1000000",
            "maxPrice": "1000000",
            "maxBlocks": "1000000",
            "totalArea": 563,
            "totalPrice": 155755,
            "totalBlocks": 563,
            "blocks": [{"id": 1, "tiles": [26, 483]}, {"id": 2, "tiles": [33, 483]}, {
                "id": 3,
                "tiles": [56, 483]
            }, {"id": 26, "tiles": [26, 483]}, {"id": 27, "tiles": [33, 483]}, {
                "id": 28,
                "tiles": [56, 483]
            }, {"id": 50, "tiles": [39, 483]}, {"id": 51, "tiles": [53, 483]}, {
                "id": 52,
                "tiles": [33, 42, 483]
            }, {"id": 53, "tiles": [51, 483]}, {"id": 54, "tiles": [39, 483]}, {
                "id": 55,
                "tiles": [39, 483]
            }, {"id": 56, "tiles": [39, 483]}, {"id": 57, "tiles": [39, 483]}, {
                "id": 58,
                "tiles": [39, 483]
            }, {"id": 59, "tiles": [39, 483]}, {"id": 60, "tiles": [39, 483]}, {
                "id": 61,
                "tiles": [39, 483]
            }, {"id": 62, "tiles": [39, 483]}, {"id": 63, "tiles": [39, 483]}, {
                "id": 64,
                "tiles": [39, 483]
            }, {"id": 65, "tiles": [39, 483]}, {"id": 66, "tiles": [39, 483]}, {
                "id": 67,
                "tiles": [39, 483]
            }, {"id": 68, "tiles": [39, 483]}, {"id": 69, "tiles": [39, 483]}, {
                "id": 70,
                "tiles": [39, 483]
            }, {"id": 71, "tiles": [39, 483]}, {"id": 72, "tiles": [39, 483]}, {
                "id": 73,
                "tiles": [39, 483]
            }, {"id": 74, "tiles": [39, 483]}, {"id": 75, "tiles": [54, 42, 483]}, {
                "id": 76,
                "tiles": [54, 42, 483]
            }, {"id": 77, "tiles": [32, 42, 483]}, {"id": 78, "tiles": [42, 483]}, {
                "id": 79,
                "tiles": [54, 42, 483]
            }, {"id": 80, "tiles": [54, 42, 483]}, {"id": 81, "tiles": [54, 42, 483]}, {
                "id": 82,
                "tiles": [54, 42, 483]
            }, {"id": 83, "tiles": [54, 42, 483]}, {"id": 84, "tiles": [54, 42, 483]}, {
                "id": 85,
                "tiles": [54, 42, 483]
            }, {"id": 86, "tiles": [54, 42, 483]}, {"id": 87, "tiles": [54, 42, 483]}, {
                "id": 88,
                "tiles": [54, 42, 483]
            }, {"id": 89, "tiles": [54, 42, 483]}, {"id": 90, "tiles": [54, 42, 483]}, {
                "id": 91,
                "tiles": [54, 42, 483]
            }, {"id": 92, "tiles": [54, 42, 483]}, {"id": 93, "tiles": [54, 42, 483]}, {
                "id": 94,
                "tiles": [54, 42, 483]
            }, {"id": 95, "tiles": [54, 42, 483]}, {"id": 96, "tiles": [54, 42, 483]}, {
                "id": 97,
                "tiles": [54, 42, 483]
            }, {"id": 98, "tiles": [54, 42, 483]}, {"id": 99, "tiles": [54, 42, 483]}, {
                "id": 100,
                "tiles": [17, 483]
            }, {"id": 101, "tiles": [17, 483]}, {"id": 102, "tiles": [17, 483]}, {
                "id": 103,
                "tiles": [17, 483]
            }, {"id": 104, "tiles": [17, 483]}, {"id": 105, "tiles": [17, 483]}, {
                "id": 106,
                "tiles": [17, 483]
            }, {"id": 107, "tiles": [17, 483]}, {"id": 108, "tiles": [17, 483]}, {
                "id": 109,
                "tiles": [17, 483]
            }, {"id": 110, "tiles": [17, 483]}, {"id": 111, "tiles": [17, 483]}, {
                "id": 112,
                "tiles": [17, 483]
            }, {"id": 113, "tiles": [17, 483]}, {"id": 114, "tiles": [17, 483]}, {
                "id": 115,
                "tiles": [17, 483]
            }, {"id": 116, "tiles": [17, 483]}, {"id": 117, "tiles": [17, 483]}, {
                "id": 118,
                "tiles": [17, 483]
            }, {"id": 119, "tiles": [17, 483]}, {"id": 120, "tiles": [17, 483]}, {
                "id": 121,
                "tiles": [17, 483]
            }, {"id": 122, "tiles": [17, 483]}, {"id": 123, "tiles": [17, 483]}, {
                "id": 124,
                "tiles": [17, 483]
            }, {"id": 173, "tiles": [514, 483]}, {"id": 174, "tiles": [488, 483]}, {
                "id": 175,
                "tiles": [457, 483]
            }, {"id": 176, "tiles": [457, 483]}, {"id": 177, "tiles": [457, 483]}, {
                "id": 178,
                "tiles": [457, 483]
            }, {"id": 179, "tiles": [457, 483]}, {"id": 180, "tiles": [457, 483]}, {
                "id": 181,
                "tiles": [457, 483]
            }, {"id": 182, "tiles": [457, 483]}, {"id": 183, "tiles": [457, 483]}, {
                "id": 184,
                "tiles": [457, 483]
            }, {"id": 185, "tiles": [457, 483]}, {"id": 186, "tiles": [457, 483]}, {
                "id": 187,
                "tiles": [457, 483]
            }, {"id": 188, "tiles": [457, 483]}, {"id": 189, "tiles": [457, 483]}, {
                "id": 190,
                "tiles": [457, 483]
            }, {"id": 191, "tiles": [457, 483]}, {"id": 192, "tiles": [457, 483]}, {
                "id": 193,
                "tiles": [505, 483]
            }, {"id": 194, "tiles": [424, 483]}, {"id": 195, "tiles": [505, 483]}, {
                "id": 196,
                "tiles": [457, 483]
            }, {"id": 197, "tiles": [457, 483]}, {"id": 198, "tiles": [522, 457, 379, 483]}, {
                "id": 199,
                "tiles": [510, 483]
            }, {"id": 201, "tiles": [267, 483]}, {"id": 202, "tiles": [227, 483]}, {
                "id": 203,
                "tiles": [227, 483]
            }, {"id": 204, "tiles": [227, 483]}, {"id": 205, "tiles": [227, 483]}, {
                "id": 206,
                "tiles": [227, 483]
            }, {"id": 207, "tiles": [227, 483]}, {"id": 208, "tiles": [227, 483]}, {
                "id": 209,
                "tiles": [258, 471, 293, 226, 258, 483]
            }, {"id": 210, "tiles": [352, 471, 293, 226, 483]}, {
                "id": 211,
                "tiles": [404, 471, 293, 226, 404, 483]
            }, {"id": 212, "tiles": [228, 483]}, {"id": 213, "tiles": [227, 483]}, {
                "id": 214,
                "tiles": [227, 483]
            }, {"id": 215, "tiles": [227, 483]}, {"id": 216, "tiles": [228, 227, 483]}, {
                "id": 217,
                "tiles": [227, 483]
            }, {"id": 218, "tiles": [258, 352, 294, 483]}, {"id": 219, "tiles": [352, 294, 483]}, {
                "id": 220,
                "tiles": [404, 352, 294, 483]
            }, {"id": 221, "tiles": [227, 483]}, {"id": 222, "tiles": [61, 483]}, {
                "id": 223,
                "tiles": [379, 483]
            }, {"id": 226, "tiles": [153, 483]}, {"id": 227, "tiles": [505, 114, 483]}, {
                "id": 228,
                "tiles": [114, 483]
            }, {"id": 229, "tiles": [6, 114, 483]}, {"id": 230, "tiles": [12, 114, 483]}, {
                "id": 231,
                "tiles": [114, 483]
            }, {"id": 232, "tiles": [114, 483]}, {"id": 233, "tiles": [114, 483]}, {
                "id": 234,
                "tiles": [114, 483]
            }, {"id": 235, "tiles": [114, 483]}, {"id": 236, "tiles": [505, 114, 483]}, {
                "id": 237,
                "tiles": [231, 483]
            }, {"id": 238, "tiles": [10, 294, 483]}, {"id": 239, "tiles": [14, 294, 483]}, {
                "id": 240,
                "tiles": [10, 294, 483]
            }, {"id": 241, "tiles": [272, 294, 272, 483]}, {"id": 242, "tiles": [294, 483]}, {
                "id": 243,
                "tiles": [294, 483]
            }, {"id": 244, "tiles": [294, 483]}, {"id": 245, "tiles": [294, 483]}, {
                "id": 246,
                "tiles": [294, 483]
            }, {"id": 247, "tiles": [153, 483]}, {"id": 248, "tiles": [379, 483]}, {
                "id": 251,
                "tiles": [459, 114, 483]
            }, {"id": 252, "tiles": [114, 483]}, {"id": 253, "tiles": [114, 483]}, {
                "id": 254,
                "tiles": [114, 483]
            }, {"id": 255, "tiles": [114, 483]}, {"id": 256, "tiles": [114, 483]}, {
                "id": 257,
                "tiles": [114, 483]
            }, {"id": 258, "tiles": [456, 114, 483]}, {"id": 259, "tiles": [329, 114, 483]}, {
                "id": 260,
                "tiles": [293, 483]
            }, {"id": 261, "tiles": [114, 483]}, {"id": 262, "tiles": [231, 483]}, {
                "id": 263,
                "tiles": [384, 294, 483]
            }, {"id": 264, "tiles": [337, 294, 483]}, {"id": 265, "tiles": [443, 294, 483]}, {
                "id": 266,
                "tiles": [294, 483]
            }, {"id": 267, "tiles": [294, 483]}, {"id": 268, "tiles": [314, 294, 483]}, {
                "id": 269,
                "tiles": [357, 294, 483]
            }, {"id": 270, "tiles": [367, 294, 483]}, {"id": 271, "tiles": [294, 483]}, {
                "id": 272,
                "tiles": [379, 294, 483]
            }, {"id": 273, "tiles": [379, 483]}, {"id": 276, "tiles": [459, 114, 483]}, {
                "id": 277,
                "tiles": [114, 483]
            }, {"id": 278, "tiles": [480, 114, 483]}, {"id": 279, "tiles": [401, 327, 114, 483]}, {
                "id": 280,
                "tiles": [327, 114, 483]
            }, {"id": 281, "tiles": [413, 382, 114, 483]}, {"id": 282, "tiles": [114, 483]}, {
                "id": 283,
                "tiles": [479, 114, 483]
            }, {"id": 284, "tiles": [386, 114, 483]}, {"id": 285, "tiles": [114, 483]}, {
                "id": 286,
                "tiles": [114, 483]
            }, {"id": 287, "tiles": [90, 483]}, {"id": 288, "tiles": [227, 483]}, {
                "id": 289,
                "tiles": [227, 483]
            }, {"id": 290, "tiles": [227, 483]}, {"id": 291, "tiles": [258, 294, 483]}, {
                "id": 292,
                "tiles": [294, 483]
            }, {"id": 293, "tiles": [438, 294, 483]}, {"id": 294, "tiles": [369, 294, 483]}, {
                "id": 295,
                "tiles": [322, 294, 483]
            }, {"id": 296, "tiles": [294, 483]}, {"id": 297, "tiles": [206, 379, 294, 483]}, {
                "id": 298,
                "tiles": [379, 483]
            }, {"id": 301, "tiles": [459, 114, 483]}, {"id": 302, "tiles": [114, 483]}, {
                "id": 303,
                "tiles": [436, 114, 483]
            }, {"id": 304, "tiles": [436, 114, 483]}, {"id": 305, "tiles": [436, 114, 483]}, {
                "id": 306,
                "tiles": [436, 114, 483]
            }, {"id": 307, "tiles": [114, 483]}, {"id": 308, "tiles": [397, 114, 483]}, {
                "id": 309,
                "tiles": [437, 114, 483]
            }, {"id": 310, "tiles": [114, 483]}, {"id": 311, "tiles": [114, 483]}, {
                "id": 312,
                "tiles": [272, 379, 114, 483]
            }, {"id": 313, "tiles": [294, 483]}, {"id": 314, "tiles": [294, 483]}, {
                "id": 315,
                "tiles": [294, 483]
            }, {"id": 316, "tiles": [294, 483]}, {"id": 317, "tiles": [294, 483]}, {
                "id": 318,
                "tiles": [294, 483]
            }, {"id": 319, "tiles": [294, 483]}, {"id": 320, "tiles": [294, 483]}, {
                "id": 321,
                "tiles": [294, 483]
            }, {"id": 322, "tiles": [272, 379, 294, 483]}, {"id": 323, "tiles": [379, 483]}, {
                "id": 326,
                "tiles": [459, 114, 483]
            }, {"id": 327, "tiles": [114, 483]}, {"id": 328, "tiles": [114, 483]}, {
                "id": 329,
                "tiles": [114, 483]
            }, {"id": 330, "tiles": [114, 483]}, {"id": 331, "tiles": [114, 483]}, {
                "id": 332,
                "tiles": [114, 483]
            }, {"id": 333, "tiles": [114, 483]}, {"id": 334, "tiles": [114, 483]}, {
                "id": 335,
                "tiles": [114, 483]
            }, {"id": 336, "tiles": [114, 483]}, {"id": 337, "tiles": [379, 114, 483]}, {
                "id": 338,
                "tiles": [294, 483]
            }, {"id": 339, "tiles": [294, 483]}, {"id": 340, "tiles": [294, 483]}, {
                "id": 341,
                "tiles": [294, 483]
            }, {"id": 342, "tiles": [294, 483]}, {"id": 343, "tiles": [294, 483]}, {
                "id": 344,
                "tiles": [294, 483]
            }, {"id": 345, "tiles": [294, 483]}, {"id": 346, "tiles": [294, 483]}, {
                "id": 347,
                "tiles": [379, 294, 483]
            }, {"id": 348, "tiles": [379, 483]}, {"id": 351, "tiles": [225, 483]}, {
                "id": 352,
                "tiles": [114, 483]
            }, {"id": 353, "tiles": [114, 483]}, {"id": 354, "tiles": [114, 483]}, {
                "id": 355,
                "tiles": [114, 483]
            }, {"id": 356, "tiles": [114, 483]}, {"id": 357, "tiles": [114, 483]}, {
                "id": 358,
                "tiles": [13, 114, 483]
            }, {"id": 359, "tiles": [114, 483]}, {"id": 360, "tiles": [114, 483]}, {
                "id": 361,
                "tiles": [114, 483]
            }, {"id": 362, "tiles": [206, 379, 114, 483]}, {"id": 363, "tiles": [447, 294, 483]}, {
                "id": 364,
                "tiles": [294, 483]
            }, {"id": 365, "tiles": [294, 483]}, {"id": 366, "tiles": [294, 483]}, {
                "id": 367,
                "tiles": [294, 483]
            }, {"id": 368, "tiles": [294, 351, 483]}, {"id": 369, "tiles": [294, 483]}, {
                "id": 370,
                "tiles": [331, 294, 483]
            }, {"id": 371, "tiles": [517, 294, 483]}, {"id": 372, "tiles": [225, 483]}, {
                "id": 373,
                "tiles": [379, 483]
            }, {"id": 376, "tiles": [231, 483]}, {"id": 377, "tiles": [114, 483]}, {
                "id": 378,
                "tiles": [114, 483]
            }, {"id": 379, "tiles": [114, 483]}, {"id": 380, "tiles": [114, 483]}, {
                "id": 381,
                "tiles": [114, 483]
            }, {"id": 382, "tiles": [114, 483]}, {"id": 383, "tiles": [225, 483]}, {
                "id": 384,
                "tiles": [433, 293, 483]
            }, {"id": 385, "tiles": [433, 293, 483]}, {"id": 386, "tiles": [404, 433, 293, 483]}, {
                "id": 387,
                "tiles": [256, 483]
            }, {"id": 388, "tiles": [227, 483]}, {"id": 389, "tiles": [227, 483]}, {
                "id": 390,
                "tiles": [227, 483]
            }, {"id": 391, "tiles": [227, 483]}, {"id": 392, "tiles": [227, 483]}, {
                "id": 393,
                "tiles": [227, 483]
            }, {"id": 394, "tiles": [228, 483]}, {"id": 395, "tiles": [227, 483]}, {
                "id": 396,
                "tiles": [227, 483]
            }, {"id": 397, "tiles": [81, 483]}, {"id": 398, "tiles": [379, 483]}, {
                "id": 401,
                "tiles": [231, 483]
            }, {"id": 402, "tiles": [8, 114, 351, 483]}, {"id": 403, "tiles": [114, 351, 483]}, {
                "id": 404,
                "tiles": [114, 351, 483]
            }, {"id": 405, "tiles": [114, 351, 351, 483]}, {"id": 406, "tiles": [114, 351, 483]}, {
                "id": 407,
                "tiles": [8, 114, 351, 483]
            }, {"id": 408, "tiles": [231, 351, 483]}, {"id": 409, "tiles": [456, 398, 351, 483]}, {
                "id": 410,
                "tiles": [375, 398, 351, 483]
            }, {"id": 411, "tiles": [375, 398, 351, 483]}, {"id": 412, "tiles": [516, 375, 398, 351, 483]}, {
                "id": 413,
                "tiles": [489, 375, 398, 351, 483]
            }, {"id": 414, "tiles": [489, 517, 375, 398, 351, 483]}, {
                "id": 415,
                "tiles": [512, 375, 398, 351, 483]
            }, {"id": 416, "tiles": [375, 398, 351, 483]}, {"id": 417, "tiles": [375, 398, 351, 483]}, {
                "id": 418,
                "tiles": [9, 329, 398, 351, 483]
            }, {"id": 419, "tiles": [272, 319, 398, 351, 483]}, {"id": 420, "tiles": [309, 46, 351, 483]}, {
                "id": 421,
                "tiles": [309, 46, 351, 483]
            }, {"id": 422, "tiles": [231, 483]}, {"id": 423, "tiles": [379, 483]}, {
                "id": 426,
                "tiles": [231, 483]
            }, {"id": 427, "tiles": [455, 114, 351, 483]}, {"id": 428, "tiles": [1, 455, 114, 351, 483]}, {
                "id": 429,
                "tiles": [0, 455, 114, 351, 483]
            }, {"id": 430, "tiles": [4, 455, 114, 351, 483]}, {
                "id": 431, "tiles": [455,
                    114, 351, 351, 483]
            }, {"id": 432, "tiles": [7, 455, 114, 351, 483]}, {"id": 433, "tiles": [231, 351, 483]}, {
                "id": 434,
                "tiles": [397, 398, 351, 483]
            }, {"id": 435, "tiles": [411, 398, 351, 351, 483]}, {"id": 436, "tiles": [411, 398, 351, 483]}, {
                "id": 437,
                "tiles": [411, 398, 351, 483]
            }, {"id": 438, "tiles": [411, 398, 351, 483]}, {"id": 439, "tiles": [411, 398, 351, 483]}, {
                "id": 440,
                "tiles": [411, 398, 351, 483]
            }, {"id": 441, "tiles": [411, 398, 351, 483]}, {"id": 442, "tiles": [411, 398, 351, 483]}, {
                "id": 443,
                "tiles": [331, 437, 398, 351, 483]
            }, {"id": 444, "tiles": [206, 319, 398, 351, 483]}, {"id": 445, "tiles": [309, 46, 351, 483]}, {
                "id": 446,
                "tiles": [309, 46, 351, 483]
            }, {"id": 447, "tiles": [231, 483]}, {"id": 448, "tiles": [379, 483]}, {
                "id": 451,
                "tiles": [161, 483]
            }, {"id": 452, "tiles": [227, 483]}, {"id": 453, "tiles": [227, 483]}, {
                "id": 454,
                "tiles": [227, 483]
            }, {"id": 455, "tiles": [227, 483]}, {"id": 456, "tiles": [227, 483]}, {
                "id": 457,
                "tiles": [227, 483]
            }, {"id": 458, "tiles": [256, 483]}, {"id": 459, "tiles": [227, 483]}, {
                "id": 460,
                "tiles": [227, 483]
            }, {"id": 461, "tiles": [227, 483]}, {"id": 462, "tiles": [227, 483]}, {
                "id": 463,
                "tiles": [227, 483]
            }, {"id": 464, "tiles": [227, 483]}, {"id": 465, "tiles": [227, 483]}, {
                "id": 466,
                "tiles": [227, 483]
            }, {"id": 467, "tiles": [227, 483]}, {"id": 468, "tiles": [227, 483]}, {
                "id": 469,
                "tiles": [256, 483]
            }, {"id": 470, "tiles": [227, 483]}, {"id": 471, "tiles": [227, 483]}, {
                "id": 472,
                "tiles": [169, 227, 483]
            }, {"id": 473, "tiles": [379, 483]}, {"id": 475, "tiles": [498, 483]}, {
                "id": 476,
                "tiles": [498, 483]
            }, {"id": 497, "tiles": [449, 483]}, {"id": 498, "tiles": [379, 483]}, {
                "id": 500,
                "tiles": [503, 483]
            }, {"id": 501, "tiles": [498, 483]}, {"id": 502, "tiles": [504, 483]}, {"id": 523, "tiles": [379, 483]}]
        };

        const jsonExample4 = {
            "name": "Unfinished object",
            "email": "otojermaks@gmail.com",
            "author": "Oto Jermaks",
            "created": "05.02.2023 12:00:00",
            "modified": "",
            "rating": 0,
            "maxArea": "1000000",
            "maxPrice": "1000000",
            "maxBlocks": "1000000",
            "totalArea": 439,
            "totalPrice": 112328,
            "totalBlocks": 439,
            "blocks": [{"id": 1, "tiles": [26, 483]}, {"id": 2, "tiles": [33, 483]}, {
                "id": 3,
                "tiles": [56, 483]
            }, {"id": 26, "tiles": [26, 483]}, {"id": 27, "tiles": [33, 483]}, {
                "id": 28,
                "tiles": [56, 483]
            }, {"id": 50, "tiles": [39, 483]}, {"id": 51, "tiles": [53, 483]}, {
                "id": 52,
                "tiles": [33, 42, 483]
            }, {"id": 53, "tiles": [51, 483]}, {"id": 54, "tiles": [39, 483]}, {
                "id": 55,
                "tiles": [39, 483]
            }, {"id": 56, "tiles": [39, 483]}, {"id": 57, "tiles": [39, 483]}, {
                "id": 58,
                "tiles": [39, 483]
            }, {"id": 59, "tiles": [39, 483]}, {"id": 60, "tiles": [39, 483]}, {
                "id": 61,
                "tiles": [39, 483]
            }, {"id": 62, "tiles": [39, 483]}, {"id": 63, "tiles": [39, 483]}, {
                "id": 64,
                "tiles": [39, 483]
            }, {"id": 65, "tiles": [39, 483]}, {"id": 66, "tiles": [39, 483]}, {
                "id": 67,
                "tiles": [39, 483]
            }, {"id": 68, "tiles": [39, 483]}, {"id": 69, "tiles": [39, 483]}, {
                "id": 70,
                "tiles": [39, 483]
            }, {"id": 71, "tiles": [39, 483]}, {"id": 72, "tiles": [39, 483]}, {
                "id": 73,
                "tiles": [39, 483]
            }, {"id": 74, "tiles": [39, 483]}, {"id": 75, "tiles": [54, 42, 483]}, {
                "id": 76,
                "tiles": [54, 42, 483]
            }, {"id": 77, "tiles": [32, 42, 483]}, {"id": 78, "tiles": [42, 483]}, {
                "id": 79,
                "tiles": [54, 42, 483]
            }, {"id": 80, "tiles": [54, 42, 483]}, {"id": 81, "tiles": [54, 42, 483]}, {
                "id": 82,
                "tiles": [54, 42, 483]
            }, {"id": 83, "tiles": [54, 42, 483]}, {"id": 84, "tiles": [54, 42, 483]}, {
                "id": 85,
                "tiles": [54, 42, 483]
            }, {"id": 86, "tiles": [54, 42, 483]}, {"id": 87, "tiles": [54, 42, 483]}, {
                "id": 88,
                "tiles": [54, 42, 483]
            }, {"id": 89, "tiles": [54, 42, 483]}, {"id": 90, "tiles": [54, 42, 483]}, {
                "id": 91,
                "tiles": [54, 42, 483]
            }, {"id": 92, "tiles": [54, 42, 483]}, {"id": 93, "tiles": [54, 42, 483]}, {
                "id": 94,
                "tiles": [54, 42, 483]
            }, {"id": 95, "tiles": [54, 42, 483]}, {"id": 96, "tiles": [54, 42, 483]}, {
                "id": 97,
                "tiles": [54, 42, 483]
            }, {"id": 98, "tiles": [54, 42, 483]}, {"id": 99, "tiles": [54, 42, 483]}, {
                "id": 100,
                "tiles": [17, 483]
            }, {"id": 101, "tiles": [17, 483]}, {"id": 102, "tiles": [17, 483]}, {
                "id": 103,
                "tiles": [17, 483]
            }, {"id": 104, "tiles": [17, 483]}, {"id": 105, "tiles": [17, 483]}, {
                "id": 106,
                "tiles": [17, 483]
            }, {"id": 107, "tiles": [17, 483]}, {"id": 108, "tiles": [17, 483]}, {
                "id": 109,
                "tiles": [17, 483]
            }, {"id": 110, "tiles": [17, 483]}, {"id": 111, "tiles": [17, 483]}, {
                "id": 112,
                "tiles": [17, 483]
            }, {"id": 113, "tiles": [17, 483]}, {"id": 114, "tiles": [17, 483]}, {
                "id": 115,
                "tiles": [17, 483]
            }, {"id": 116, "tiles": [17, 483]}, {"id": 117, "tiles": [17, 483]}, {
                "id": 118,
                "tiles": [17, 483]
            }, {"id": 119, "tiles": [17, 483]}, {"id": 120, "tiles": [17, 483]}, {
                "id": 121,
                "tiles": [17, 483]
            }, {"id": 122, "tiles": [17, 483]}, {"id": 123, "tiles": [17, 483]}, {
                "id": 124,
                "tiles": [17, 483]
            }, {"id": 201, "tiles": [267, 483]}, {"id": 202, "tiles": [227, 483]}, {
                "id": 203,
                "tiles": [227, 483]
            }, {"id": 204, "tiles": [227, 483]}, {"id": 205, "tiles": [227, 483]}, {
                "id": 206,
                "tiles": [227, 483]
            }, {"id": 207, "tiles": [227, 483]}, {"id": 208, "tiles": [227, 483]}, {
                "id": 209,
                "tiles": [258, 471, 293, 226, 258, 483]
            }, {"id": 210, "tiles": [352, 471, 293, 226, 483]}, {
                "id": 211,
                "tiles": [404, 471, 293, 226, 404, 483]
            }, {"id": 212, "tiles": [61, 483]}, {"id": 217, "tiles": [498, 242, 483]}, {
                "id": 218,
                "tiles": [498, 132, 483]
            }, {"id": 226, "tiles": [153, 483]}, {"id": 227, "tiles": [505, 114, 483]}, {
                "id": 228,
                "tiles": [114, 483]
            }, {"id": 229, "tiles": [6, 114, 483]}, {"id": 230, "tiles": [12, 114, 483]}, {
                "id": 231,
                "tiles": [114, 483]
            }, {"id": 232, "tiles": [114, 483]}, {"id": 233, "tiles": [114, 483]}, {
                "id": 234,
                "tiles": [114, 483]
            }, {"id": 235, "tiles": [114, 483]}, {"id": 236, "tiles": [505, 114, 483]}, {
                "id": 237,
                "tiles": [153, 483]
            }, {"id": 242, "tiles": [498, 188, 483]}, {"id": 243, "tiles": [498, 80, 483]}, {
                "id": 251,
                "tiles": [459, 114, 483]
            }, {"id": 252, "tiles": [114, 483]}, {"id": 253, "tiles": [114, 483]}, {
                "id": 254,
                "tiles": [114, 483]
            }, {"id": 255, "tiles": [114, 483]}, {"id": 256, "tiles": [114, 483]}, {
                "id": 257,
                "tiles": [114, 483]
            }, {"id": 258, "tiles": [456, 114, 483]}, {"id": 259, "tiles": [329, 114, 483]}, {
                "id": 260,
                "tiles": [293, 483]
            }, {"id": 261, "tiles": [114, 483]}, {"id": 262, "tiles": [353, 154, 483]}, {
                "id": 267,
                "tiles": [498, 188, 483]
            }, {"id": 268, "tiles": [498, 80, 483]}, {"id": 276, "tiles": [459, 114, 483]}, {
                "id": 277,
                "tiles": [114, 483]
            }, {"id": 278, "tiles": [480, 114, 483]}, {"id": 279, "tiles": [401, 327, 114, 483]}, {
                "id": 280,
                "tiles": [327, 114, 483]
            }, {"id": 281, "tiles": [413, 382, 114, 483]}, {"id": 282, "tiles": [114, 483]}, {
                "id": 283,
                "tiles": [479, 114, 483]
            }, {"id": 284, "tiles": [386, 114, 483]}, {"id": 285, "tiles": [114, 483]}, {
                "id": 286,
                "tiles": [114, 483]
            }, {"id": 287, "tiles": [353, 154, 483]}, {"id": 292, "tiles": [498, 188, 483]}, {
                "id": 293,
                "tiles": [498, 80, 483]
            }, {"id": 301, "tiles": [459, 114, 483]}, {"id": 302, "tiles": [114, 483]}, {
                "id": 303,
                "tiles": [436, 114, 483]
            }, {"id": 304, "tiles": [436, 114, 483]}, {"id": 305, "tiles": [436, 114, 483]}, {
                "id": 306,
                "tiles": [436, 114, 483]
            }, {"id": 307, "tiles": [114, 483]}, {"id": 308, "tiles": [397, 114, 483]}, {
                "id": 309,
                "tiles": [437, 114, 483]
            }, {"id": 310, "tiles": [114, 483]}, {"id": 311, "tiles": [114, 483]}, {
                "id": 312,
                "tiles": [353, 154, 483]
            }, {"id": 317, "tiles": [498, 125, 483]}, {"id": 318, "tiles": [498, 218, 483]}, {
                "id": 326,
                "tiles": [459, 114, 483]
            }, {"id": 327, "tiles": [114, 483]}, {"id": 328, "tiles": [114, 483]}, {
                "id": 329,
                "tiles": [114, 483]
            }, {"id": 330, "tiles": [114, 483]}, {"id": 331, "tiles": [114, 483]}, {
                "id": 332,
                "tiles": [114, 483]
            }, {"id": 333, "tiles": [114, 483]}, {"id": 334, "tiles": [114, 483]}, {
                "id": 335,
                "tiles": [114, 483]
            }, {"id": 336, "tiles": [114, 483]}, {"id": 337, "tiles": [353, 154, 483]}, {
                "id": 351,
                "tiles": [225, 483]
            }, {"id": 352, "tiles": [114, 483]}, {"id": 353, "tiles": [114, 483]}, {
                "id": 354,
                "tiles": [114, 483]
            }, {"id": 355, "tiles": [114, 483]}, {"id": 356, "tiles": [114, 483]}, {
                "id": 357,
                "tiles": [114, 483]
            }, {"id": 358, "tiles": [13, 114, 483]}, {"id": 359, "tiles": [114, 483]}, {
                "id": 360,
                "tiles": [114, 483]
            }, {"id": 361, "tiles": [114, 483]}, {"id": 362, "tiles": [225, 483]}, {
                "id": 368,
                "tiles": [351, 483]
            }, {"id": 376, "tiles": [231, 483]}, {"id": 377, "tiles": [114, 483]}, {
                "id": 378,
                "tiles": [114, 483]
            }, {"id": 379, "tiles": [114, 483]}, {"id": 380, "tiles": [114, 483]}, {
                "id": 381,
                "tiles": [114, 483]
            }, {"id": 382, "tiles": [114, 483]}, {"id": 383, "tiles": [225, 483]}, {
                "id": 384,
                "tiles": [433, 293, 483]
            }, {"id": 385, "tiles": [433, 293, 483]}, {"id": 386, "tiles": [433, 293, 483]}, {
                "id": 387,
                "tiles": [161, 483]
            }, {"id": 388, "tiles": [227, 483]}, {"id": 389, "tiles": [227, 483]}, {
                "id": 390,
                "tiles": [227, 483]
            }, {"id": 391, "tiles": [227, 483]}, {"id": 392, "tiles": [227, 483]}, {
                "id": 393,
                "tiles": [227, 483]
            }, {"id": 394, "tiles": [228, 483]}, {"id": 395, "tiles": [227, 483]}, {
                "id": 396,
                "tiles": [227, 483]
            }, {"id": 397, "tiles": [61, 483]}, {"id": 401, "tiles": [231, 483]}, {
                "id": 402,
                "tiles": [8, 114, 351, 483]
            }, {"id": 403, "tiles": [114, 351, 483]}, {"id": 404, "tiles": [114, 351, 483]}, {
                "id": 405,
                "tiles": [114, 351, 351, 483]
            }, {"id": 406, "tiles": [114, 351, 483]}, {"id": 407, "tiles": [8, 114, 351, 483]}, {
                "id": 408,
                "tiles": [231, 351, 483]
            }, {"id": 409, "tiles": [456, 398, 351, 483]}, {"id": 410, "tiles": [375, 398, 351, 483]}, {
                "id": 411,
                "tiles": [375, 398, 351, 483]
            }, {"id": 412, "tiles": [516, 375, 398, 351, 483]}, {
                "id": 413,
                "tiles": [489, 375, 398, 351, 483]
            }, {"id": 414, "tiles": [489, 517, 375, 398, 351, 483]}, {
                "id": 415,
                "tiles": [512, 375, 398, 351, 483]
            }, {"id": 416, "tiles": [375, 398, 351, 483]}, {"id": 417, "tiles": [375, 398, 351, 483]}, {
                "id": 418,
                "tiles": [9, 329, 398, 351, 483]
            }, {"id": 419, "tiles": [272, 319, 398, 351, 483]}, {"id": 420, "tiles": [309, 46, 351, 483]}, {
                "id": 421,
                "tiles": [309, 46, 351, 483]
            }, {"id": 422, "tiles": [231, 483]}, {"id": 426, "tiles": [231, 483]}, {
                "id": 427,
                "tiles": [455, 114, 351, 483]
            }, {"id": 428, "tiles": [1, 455, 114, 351, 483]}, {"id": 429, "tiles": [0, 455, 114, 351, 483]}, {
                "id": 430,
                "tiles": [4, 455, 114, 351, 483]
            }, {"id": 431, "tiles": [455, 114, 351, 351, 483]}, {
                "id": 432,
                "tiles": [7, 455, 114, 351, 483]
            }, {"id": 433, "tiles": [231, 351, 483]}, {"id": 434, "tiles": [397, 398, 351, 483]}, {
                "id": 435,
                "tiles": [411, 398, 351, 351, 483]
            }, {"id": 436, "tiles": [411, 398, 351, 483]}, {"id": 437, "tiles": [411, 398, 351, 483]}, {
                "id": 438,
                "tiles": [411, 398, 351, 483]
            }, {"id": 439, "tiles": [411, 398, 351, 483]}, {"id": 440, "tiles": [411, 398, 351, 483]}, {
                "id": 441,
                "tiles": [411, 398, 351, 483]
            }, {"id": 442, "tiles": [411, 398, 351, 483]}, {"id": 443, "tiles": [331, 437, 398, 351, 483]}, {
                "id": 444,
                "tiles": [206, 319, 398, 351, 483]
            }, {"id": 445, "tiles": [309, 46, 351, 483]}, {"id": 446, "tiles": [309, 46, 351, 483]}, {
                "id": 447,
                "tiles": [231, 483]
            }, {"id": 451, "tiles": [161, 483]}, {"id": 452, "tiles": [227, 483]}, {
                "id": 453,
                "tiles": [227, 483]
            }, {"id": 454, "tiles": [227, 483]}, {"id": 455, "tiles": [227, 483]}, {
                "id": 456,
                "tiles": [227, 483]
            }, {"id": 457, "tiles": [227, 483]}, {"id": 458, "tiles": [256, 483]}, {
                "id": 459,
                "tiles": [227, 483]
            }, {"id": 460, "tiles": [227, 483]}, {"id": 461, "tiles": [227, 483]}, {
                "id": 462,
                "tiles": [227, 483]
            }, {"id": 463, "tiles": [227, 483]}, {"id": 464, "tiles": [227, 483]}, {
                "id": 465,
                "tiles": [227, 483]
            }, {"id": 466, "tiles": [227, 483]}, {"id": 467, "tiles": [227, 483]}, {
                "id": 468,
                "tiles": [227, 483]
            }, {"id": 469, "tiles": [256, 483]}, {"id": 470, "tiles": [227, 483]}, {
                "id": 471,
                "tiles": [227, 483]
            }, {"id": 472, "tiles": [169, 227, 483]}, {"id": 475, "tiles": [498, 483]}, {
                "id": 476,
                "tiles": [498, 483]
            }, {"id": 497, "tiles": [449, 483]}, {"id": 500, "tiles": [503, 483]}, {
                "id": 501,
                "tiles": [498, 483]
            }, {"id": 502, "tiles": [504, 483]}]
        };

        let json = jsonExample4;
        switch (id) {
            case 1: {
                json = jsonExample1
            }
                ;
                break;
            case 2: {
                json = jsonExample2
            }
                ;
                break;
            case 3: {
                json = jsonExample3
            }
                ;
                break;
            default:
                break;
        }

        if (checkJsonObject(json)) {
            for (let i = 0; i < json.blocks.length; ++i) {
                updateWorkBlock(json.blocks[i].id, json.blocks[i].tiles);
            }
            GLOBAL_SETTINGS.workingArea.maxArea = json.maxArea;
            GLOBAL_SETTINGS.workingArea.maxPrice = json.maxPrice;
            GLOBAL_SETTINGS.workingArea.maxBlocks = json.maxBlocks;
            updateProjectInfo(json);
            updateProjectLimits();
        }
    }
}

window.addEventListener('load', () => {
    fillBuildBlocks();
    loadBuildBlocks();
    loadWorkingArea();
    setFilterBtnHandlers();
    removeAllElements();
    updateProjectLimits();
});
