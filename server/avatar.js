function trueFunc() {return true;}
function falseFunc() {return false;}

Images.allow({
  insert: trueFunc,
  update: trueFunc,
  remove: trueFunc,
  download: trueFunc
});