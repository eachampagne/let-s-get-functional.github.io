// #!/usr/bin/env node

'use strict';


/**
 * 1. Import your lodown module using the require() method,
 *    using the string 'lodown-<my-username>', or whatever
 *    name with which you published your npm lodown project.
 *
 * 2. Solve all problems as outlined in the README.
 *
 * 3. We started the first one for you as an example! Make the rest in that style.
 *
 * 4. To test your work, run the following command in your terminal:
 *
 *    npm start --prefix ./let-s-get-functional.github.io/projects/let-s-get-functional
 *
 *    IMPORTANT: Make sure you replace <YOUR_GITHUB_FOLDER with your actual github folder name that is in your workspace.
 */

var maleCount = function(array) {
	//use filter to get an array of just males
	const males = _.filter(array, elem => elem.gender === "male");
	//the number of males is equal to the length of the males array
	return males.length;

	/* loop solution
	let malesCount = 0;
	for (let i = 0; i < array.length; i++) {
		if (array[i].gender === "male") {
			malesCount++;
		}
	}
	return malesCount;
	*/
};

var femaleCount = function(array) {
	//use reduce to count the number of females
	//starting with a count of zero, reduce iterates over the array and increments the count only for female customers 
	return _.reduce(array, (count, elem) => elem.gender === "female" ? count + 1 : count, 0);
};

var oldestCustomer = function(array) {
	//use reduce to find the oldest customer
	//reduce carries the oldest customer found so far in the memo, starting with the first element of the array
	//as it iterates over the array, it compares the age of the current customer to the oldest so far and keeps the older of the two
	//once reduce has found the oldest customer, that customer's name is returned
	return _.reduce(array, (currentOldest, customer) => customer.age > currentOldest.age ? customer : currentOldest).name;
};

var youngestCustomer = function(array) {
	//similar to oldestCustomer()
	//use reduce to find the youngest customer
	//reduce carries the youngest customer found so far in the memo, starting with the first element of the array
	//as it iterates over the array, it compares the age of the current customer to the youngest so far and keeps the younger of the two
	//once reduce has found the youngest customer, that customer's name is returned
	return _.reduce(array, (currentYoungest, customer) => customer.age < currentYoungest.age ? customer : currentYoungest).name;
};

var averageBalance = function(array) {
	//I'm having problems summing the balances because the balances are stored as strings of form "$#,###.##"
	//So I need to convert the string to a number, but first I have to get rid of the dollar sign and comma
	//There must be a better way than my "rebuild the string without the bad characters" solution but this should at least work
	const getNumericBalance = function(stringBalance) {
		const numericChars = "0123456789."; //can validly be part of a number
		let convertibleString = "";

		for (let i = 0; i < stringBalance.length; i++) {
			if (numericChars.includes(stringBalance[i])) {
				convertibleString += stringBalance[i];
			}
		}

		return Number(convertibleString);
	}

	//uses reduce to sum the balances of each customer by adding each balance to the running total
	//the balance has to be converted from a string to a number using getNumericBalance (which also handles the punctuation)
	//once the sum is computed, it is divided by the total number of customers to get the average balance
	return _.reduce(array, (runningTotal, elem) => runningTotal + getNumericBalance(elem.balance), 0) / array.length;
};

var firstLetterCount = function(array, letter) {
	//uses reduce to count the numbers of names that start with the input letter
	//reduce keeps a count, starting with 0. For each customer, it checks whether the customer's first name starts with the target letter (using toLowerCase to eliminate case dependency) and increments the count if so
	//this only checks the first letter of the first name, not the last name
	return _.reduce(array, (count, elem) => elem.name[0].toLowerCase() === letter.toLowerCase() ? count + 1 : count, 0);

};

var friendFirstLetterCount = function(array, customer, letter) {
	//use find to get the correct customer object, then bind the customer's friends array to the friendList variable
	//I keep forgetting that find works with a condition/test function, not a specific value
	const friendList = array.find(elem => elem.name === customer).friends;
	//this reduce call is the same as in firstLetterCount except that it operates on the friendList array instead of the array of all customers
	return _.reduce(friendList, (count, elem) => elem.name[0].toLowerCase() === letter.toLowerCase() ? count + 1 : count, 0)
};

var friendsCount;

var topThreeTags;

var genderCount;

//////////////////////////////////////////////////////////////////////
// DON'T REMOVE THIS CODE ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

// here, export any references you need for tests //
// module.exports.maleCount = maleCount;
// module.exports.femaleCount = femaleCount;
// module.exports.oldestCustomer = oldestCustomer;
// module.exports.youngestCustomer = youngestCustomer;
// module.exports.averageBalance = averageBalance;
// module.exports.firstLetterCount = firstLetterCount;
// module.exports.friendFirstLetterCount = friendFirstLetterCount;
// module.exports.friendsCount = friendsCount;
// module.exports.topThreeTags = topThreeTags;
// module.exports.genderCount = genderCount;
