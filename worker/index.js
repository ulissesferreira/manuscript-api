const bullmq = require('bullmq')

const tesseract = require('tesseract.js')
const worker = tesseract.createWorker();

// Start the worker
const start = async () => {
  try {

    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');

    const myWorker = new bullmq.Worker('OCR', async (job)=>{
      // console.log(job)
      const { data: { text } } = await worker.recognize('https://tesseract.projectnaptha.com/img/eng_bw.png');
      console.log(text)
    }, { connection: {
      host: process.env.REDIS_URL,
      port: process.env.REDIS_PORT
    }});

  } catch (err) {
    process.exit(1)
  }
}

start()