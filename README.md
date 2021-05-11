# calculator_cleaningLegacyCode

This task is to provide a class that can be used as a calculator. It takes a string expression in standard notation, parses it and returns a result. It does not use eval or any other build in function. Just pure parsing.

Original calculator was my first JS script ever written. I knew nothing about clean code. I just thought a while and wrote this code. Later, after getting familiar with some codding good practicies, design patterns, TDD, clean code principies I decided to clean this code a little bit.

#### Licence for font
Original calculator, created years ago, used a font, that was created by Rob Meek, who has a copy right for this. According licence (attached in repo) there is a permissoin for not commertial usage.

### OriginalNotCleanedVersoin 
This folder contains all files with original calculator I wrote years ago.

### WorkingDir
Here I am working to have job done. 

### Cleaned Version
Here I wil place final calculator class with tests when job is done. 

### Future work
As next exercise I am going to write a calculator as my first React exercise

### Progres
Work started with only 60% tests pass. Not the best result. Original calculator does not support correctly many boundry cases

## Description of cleaned version content
### converter
Folder containing <b>StringToExpression</b> class, that changes a string to an array, convering set of digits to numbers. For expample:
<code>let converter = new StringToExpression();</code>
<code>converter.convert('(123-34)+(-43.33)/3')</code> gives <code>['(', '123', '-', '34', ')', '+', '(', '-', '-43.33', ')', '/', '3' ]</code>
<code>converter.convert('+-3')</code> gives <code>['-3']</code>
So it if a '+' is between numbers it is converted into operator, and if it is a unipolar operator it is ommited. The same with '-'. If it is a unipolar operator, it is added to next converted numner. If it is a bipolar operator between numbers it becomes and operator. 
This class extende StrigExpressionValidator that gives a <code>validate</code> method returnign true if given expression is valid, and false if not.
Please <b>refer to tests_stringToExpression.js file containing testcases that document usecases</b>
#### stringToExpression.js
A file containig a class described above
#### tests_stringToExpression.js
A file with tests, that can be used ad usecases
#### tests_stringToExpression.html
A file for test execution visualisation
