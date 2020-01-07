//see https://docs.mongodb.com/manual/reference/operator/query/not/#not-and-regular-expressions

const selector = {
  item: { $not: /^p.*/ }
};

const resolvesTo = {
  item: {
    $not: { $regex: /^p.*/ }
  }
};