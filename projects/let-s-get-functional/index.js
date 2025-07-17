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

var friendsCount = function(array, name) {
	//illegible one-line solution
	//return _.map(_.filter(array, (customer) => _.some(customer.friends, (friend) => friend.name === name)), (elem) => elem.name);
	
	//Step-by-step breakdown
	
	//the checkForFriend function uses _.some() to check if any of a given customer's friends are the target, and returns true if so, false if not
	const checkForFriend = (customer) => _.some(customer.friends, (friend) => friend.name === name);
	//pass checkForFriend as the callback to _.filter to filter the full array to just an array of customer objects who are friends with the target
	const friendsOfTarget = _.filter(array, checkForFriend);
	//use _.map to transform the friendsOfTarget array of customer objects to an array of customer names, and return
	return _.map(friendsOfTarget, (elem) => elem.name);
};

var topThreeTags = function(array) {
	//use _.reduce to count each tag
	//reduce's memo is an object of form {tag: count}. The callback increments the count when it finds a repeated tag, and adds a tag with count one when it finds a new tag
	//the initial value for the tagTracker object is an empty object because no tags have been seen yet
	//the tagTracker must be returned by the callback function to be used on the next element
	const tagCounts = _.reduce(array, (tagTracker, elem) => {
		for (let tag of elem.tags) {
			if (tagTracker.hasOwnProperty(tag)) { //increment previously seen tags
				tagTracker[tag] += 1;
			} else { //add new tags with count of one
				tagTracker[tag] = 1;
			}
		}
		return tagTracker;
	}, {});

	//initialize array to store top three current tags, along with their counts
	let orderedTags = []; //nested array of form [ [tag, count], ... ]

	//loop over every tag in the tagCount object
	for (let tag in tagCounts) {
		let count = tagCounts[tag]; //for convenience, bind the count to a variable

		//loop over the array of leading tags/counts
		for (let i = 0; i < orderedTags.length; i++) {
			//if the current tag is more common than one of the leading tags, insert it ahead of that tag and end the loop
			if (count >= orderedTags[i][1]) {
				orderedTags.splice(i, 0, [tag, count]);
				break;
			}	
		}

		//special treatment for the first couple tags before orderedTags is built up
		if (orderedTags.length === 0) {
			//if orderedTags is empty, there's nothing to compare count to, so just stick it at the end
			orderedTags.push([tag, count]);
		} else if (orderedTags.length < 3 && count < orderedTags[orderedTags.length - 1][1]) {
			//if orderedTags has less than three elements, then the current tag is one of the three leading tags by default, even it's tacked on in last place
			orderedTags.push([tag, count]);
		}
		
		//trim the array of leading tags to three
		//we only need find the top three tags, not to sort them all, so this saves iterations over the orderedTags array
		if (orderedTags.length > 3) {
			orderedTags = orderedTags.slice(0, 3);
		}
	}

	//use _.map to change the array of form [ [tag, count] ] to just an array of tags
	return _.map(orderedTags, (elem) => elem[0]);
};

var genderCount = function(array) {
	//this is pretty much the same as the tagTracker part of topThreeTags
	//uses reduce to count the occurances of each gender
	//if the memo object already has the customer's gender, the callback increments its count by one, otherwise it adds a new key with count one for the new gender
	//the memo starts as an empty object
	return _.reduce(array, (memo, elem) => {
		if (memo.hasOwnProperty(elem.gender)) {
			memo[elem.gender] += 1;
		} else {
			memo[elem.gender] = 1;
		}
		return memo;
	}, {});	
};

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
