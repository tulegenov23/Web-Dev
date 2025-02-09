let str = "Hello";

str.test = 5; // (*)

alert(str.test);

//Depending on whether you have use strict or not, the result may be: 1)undefined (no strict mode); 2)An error (strict mode)
