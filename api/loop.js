var {parentPort} = require('worker_threads')
let i = 0
while(i<10000000000){
   i++
}
parentPort.postMessage(i)