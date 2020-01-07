
/**
 Operator 	  Argument 	Purpose
 $and 	      Array 	  Matches if all the selectors in the array match.
 $or 	        Array 	  Matches if any of the selectors in the array match. All selectors must use the same index.
 $not 	      Selector 	Matches if the given selector does not match.
 $nor 	      Array 	  Matches if none of the selectors in the array match.
 $all 	      Array 	  Matches an array value if it contains all the elements of the argument array.
 $elemMatch 	Selector 	Matches and returns all documents that contain an array field with at least one element that matches all the specified query criteria.
 $allMatch   	Selector 	Matches and returns all documents that contain an array field with all its elements matching all the specified query criteria.
 * */



/*
Operator type 	Operator 	Argument 	Purpose
(In)equality 	$lt 	Any JSON 	The field is less than the argument
  	$lte 	Any JSON 	The field is less than or equal to the argument.
  	$eq 	Any JSON 	The field is equal to the argument
  	$ne 	Any JSON 	The field is not equal to the argument.
  	$gte 	Any JSON 	The field is greater than or equal to the argument.
  	$gt 	Any JSON 	The field is greater than the to the argument.
Object 	$exists 	Boolean 	Check whether the field exists or not, regardless of its value.
  	$type 	String 	Check the document field’s type. Valid values are "null", "boolean", "number", "string", "array", and "object".
Array 	$in 	Array of JSON values 	The document field must exist in the list provided.
  	$nin 	Array of JSON values 	The document field not must exist in the list provided.
  	$size 	Integer 	Special condition to match the length of an array field in a document. Non-array fields cannot match this condition.
Miscellaneous 	$mod 	[Divisor, Remainder] 	Divisor and Remainder are both positive or negative integers. Non-integer values result in a 404. Matches documents where field % Divisor == Remainder is true, and only when the document field is an integer.
  	$regex 	String 	A regular expression pattern to match against the document field. Only matches when the field is a string value and matches the supplied regular expression. The matching algorithms are based on the Perl Compatible Regular Expression (PCRE) library. For more information about what is implemented, see the see the Erlang Regular Expression
 */





#proposals

%param% and $field

semantic meaning of reg exp in $eq

$expr
db.monthlyBudget.find( { $expr: { $gt: [ "$spent" , "$budget" ] } } )
{ "_id" : 1, "category" : "food", "budget": 400, "spent": 450 }

$where

https://docs.mongodb.com/manual/reference/operator/query/where/
db.players.find( { $where: function() {
   return (hex_md5(this.name) == "9b53e667f30cd329dca1ec9e6a83e994")
} } );