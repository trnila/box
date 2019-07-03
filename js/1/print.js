function print(str1) {
  return function(str2) {
    console.log(`${str1} ${str2}`);
  }
}


print('Hello')('World')
print('Good')('Luck')
