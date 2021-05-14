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

### FromLeftBracketsInserter
#### fromLeftBracketsInserter.js
Lets take simple expression as an example: 1/2*3 convers to prefix expression /1 * 2  3, and now if recursive algoritm is taken into account, we got 1/(2*3), and this is wrong, as expected result is (1/2)*3. That is why additional algorithm adding additional brackets is needed. Ofcourse it can be used to diaplay calculated expressoin in a way google calculator whould do. This script adds brackets in a slightly different way than google one, but it is tested and correct.
#### tests_formLeftBracketsInserter.js
This file holds test cases for left brackets adder
#### tests_formLeftBracketsInserter.html
This is to display test results

### validator
#### validateStringExpression.js
Validates if expression passed to calculator is valid. 
#### validateExpression_regEx.js
This is cleaner way to implement validation. Based on regular expression. Only a few lines explain valid and not valid rules.
<b>Note</b> Multiple operators like + or - are allowed, and it is not a bug. +2 always equals to 2. -2 is always -2. --2 is 2, ++2 is 2, +-+-+-2 is -2 etc. However //2 or xxx2 is not allowed, as this makes no sence.
#### tests_stringValidator_regExp.js, test_stringValidator.js
Files holding test cases for validator
#### tests_stringValidator.html and tests_stringValidator_regExp.html
For presentation of test results

### infixToPrefix
Here is a component for converting infix expression order (like a + b + c) to prefix notation like + a + b + c. This is the simple way to perform calculations by calculator component.
This folder containes set of tests for this component and a page to present test results

### calculatorCuatomComponent
This is a cusotom web component that allows adding calculator to html only with custom html tag. Contines shadow DOM, so calculators css will not affect any other css.
This widget is a bit responsive, as it changes orientation when screen is resized

### claculator.js
This is a file containing class that is used to calculate expressions into values. It depends on validator, infix2prefix, stringToExpression, stack.js

### displayHandler.js
For adding, removing and reading from calculator widgets display

### stack.js
This is a classical implementation of stack. Does not use arrays, but objects, and nextElement properties in objects

### test.js
This is a class for running all tests of all components in this project

### widgetController.js
This is a simple file for running calcualtor with old css styling and in old html file (from before code cleaning). It is better however to use calculatorCustomWebComponent
