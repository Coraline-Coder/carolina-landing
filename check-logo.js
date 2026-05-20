const fs=require('child_process').execSync;
// Verificar si el archivo fisico existe
if(require('fs').existsSync('public/logo-cb.jpeg')){
  console.log('logo-cb.jpeg existe en disco, solo falta re-agregarlo a Git');
}else{
  console.log('logo-cb.jpeg NO existe en disco!');
}
