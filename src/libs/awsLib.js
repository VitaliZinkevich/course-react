import { Storage } from "aws-amplify";

export async function s3Upload(file) {
  const filename = `${Date.now()}-${file.name}`;
  const stored = await Storage.put(filename, file, {
    /*level: 'protected',*/
    contentType: file.type,
    progressCallback(progress) {
      console.log(`Uploaded: ${progress.loaded}/${progress.total}`)
  }
  });

      
  Storage.list('')
  .then(result => console.log(result))
  .catch(err => console.log(err));
  
  return stored.key;
}