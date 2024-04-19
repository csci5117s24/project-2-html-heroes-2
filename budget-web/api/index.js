const { app } = require("@azure/functions");
const { ObjectId } = require("mongodb");
const mongoClient = require("mongodb").MongoClient;

/*
Users collection:
{
  _id: ...
  budget: ...
  categories: [
    ...
  ]
}

Transactions collection:
{
  _id: ...
  userId: ...
  value: ...
  category: ...
  date: ...
}
*/

// User collection functions

app.http("getUser", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "user",
  handler: async (request, context) => {
    const xmsHeader = JSON.parse(
      atob(request.headers.get("x-ms-client-principal"))
    );
    const userId = xmsHeader.userId;
    if (!userId) {
      return {
        status: 500,
      };
    }

    const client = await mongoClient.connect(process.env.AZURE_MONGO_DB);
    const user = await client
      .db("budgetapp")
      .collection("users")
      .findOne({ _id: userId });
    return {
      jsonBody: { user: user },
    };
  },
});

app.http("addUser", {
  methods: ["PUT"],
  authLevel: "anonymous",
  route: "user",
  handler: async (request, context) => {
    const xmsHeader = JSON.parse(
      atob(request.headers.get("x-ms-client-principal"))
    );
    const userId = xmsHeader.userId;
    if (!userId) {
      return {
        status: 500,
      };
    }

    const newUser = {
      _id: userId,
      budget: 0,
      categories: [],
    };
    const client = await mongoClient.connect(process.env.AZURE_MONGO_DB);
    const res = await client
      .db("budgetapp")
      .collection("users")
      .insertOne(newUser);
    client.close();
    return {
      status: 201,
      jsonBody: { newUser: newUser },
    };
  },
});

app.http("getBudget", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "budget",
  handler: async (request, context) => {
    const xmsHeader = JSON.parse(
      atob(request.headers.get("x-ms-client-principal"))
    );
    const userId = xmsHeader.userId;
    if (!userId) {
      return {
        status: 500,
      };
    }

    const client = await mongoClient.connect(process.env.AZURE_MONGO_DB);
    const user = await client
      .db("budgetapp")
      .collection("users")
      .findOne({ _id: userId });
    client.close();
    return {
      jsonBody: { budget: user.budget },
    };
  },
});

app.http("setBudget", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "budget/{value}",
  handler: async (request, context) => {
    const xmsHeader = JSON.parse(
      atob(request.headers.get("x-ms-client-principal"))
    );
    const userId = xmsHeader.userId;
    if (!userId) {
      return {
        status: 500,
      };
    }

    const newBudget = request.params.value;
    const client = await mongoClient.connect(process.env.AZURE_MONGO_DB);
    const result = await client
      .db("budgetapp")
      .collection("users")
      .updateOne({ _id: userId }, { $set: { budget: newBudget } });
    client.close();

    if (result.matchedCount > 0) {
      return {
        status: 201,
      };
    }
    return {
      status: 500,
    };
  },
});

app.http("getCategories", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "categories",
  handler: async (request, context) => {
    const xmsHeader = JSON.parse(
      atob(request.headers.get("x-ms-client-principal"))
    );
    const userId = xmsHeader.userId;
    if (!userId) {
      return {
        status: 500,
      };
    }

    const client = await mongoClient.connect(process.env.AZURE_MONGO_DB);
    const user = await client
      .db("budgetapp")
      .collection("users")
      .findOne({ _id: userId });
    client.close();
    return {
      jsonBody: { categories: user.categories },
    };
  },
});

app.http("addCategory", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "category/{name}",
  handler: async (request, context) => {
    const xmsHeader = JSON.parse(
      atob(request.headers.get("x-ms-client-principal"))
    );
    const userId = xmsHeader.userId;
    if (!userId) {
      return {
        status: 500,
      };
    }

    const name = request.params.name;
    const client = await mongoClient.connect(process.env.AZURE_MONGO_DB);
    const result = await client
      .db("budgetapp")
      .collection("users")
      .updateOne({ _id: userId }, { $push: { categories: name } });
    client.close();
    if (result.matchedCount > 0) {
      return {
        status: 201,
      };
    }
    return {
      status: 500,
    };
  },
});

app.http("deleteCategory", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "categorydelete/{name}",
  handler: async (request, context) => {
    const xmsHeader = JSON.parse(
      atob(request.headers.get("x-ms-client-principal"))
    );
    const userId = xmsHeader.userId;
    if (!userId) {
      return {
        status: 500,
      };
    }

    const name = request.params.name;
    const client = await mongoClient.connect(process.env.AZURE_MONGO_DB);
    const result = await client
      .db("budgetapp")
      .collection("users")
      .updateOne({ _id: userId }, { $pull: { categories: name } });
    client.close();
    if (result.matchedCount > 0) {
      return {
        status: 200,
      };
    }
    return {
      status: 500,
    };
  },
});

// Transactions collection functions

app.http("getTransaction", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "transaction/{id}",
  handler: async (request, context) => {
    const xmsHeader = JSON.parse(
      atob(request.headers.get("x-ms-client-principal"))
    );
    const userId = xmsHeader.userId;
    if (!userId) {
      return {
        status: 500,
      };
    }

    const id = request.params.id;
    const objectId = new ObjectId(id);
    const client = await mongoClient.connect(process.env.AZURE_MONGO_DB);
    const transaction = await client
      .db("budgetapp")
      .collection("transactions")
      .findOne({ _id: objectId, userId: userId });
    client.close();
    return {
      jsonBody: { transaction: transaction },
    };
  },
});

app.http("addTransaction", {
  methods: ["PUT"],
  authLevel: "anonymous",
  route: "transaction",
  handler: async (request, context) => {
    const xmsHeader = JSON.parse(
      atob(request.headers.get("x-ms-client-principal"))
    );
    const userId = xmsHeader.userId;
    if (!userId) {
      return {
        status: 500,
      };
    }

    const body = await request.json();
    const newTransaction = {
      userid: userId,
      description: body.description,
      value: body.value,
      category: body.category,
      date: body.date,
    };
    const client = await mongoClient.connect(process.env.AZURE_MONGO_DB);
    const result = await client
      .db("budgetapp")
      .collection("transactions")
      .insertOne(newTransaction);
    client.close();
    return {
      status: 201,
      jsonBody: { id: result.insertedId, newTransaction: newTransaction },
    };
  },
});

// Update transaction

// Delete transaction

app.http("getAllTransactions", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "transactions",
  handler: async (request, context) => {
    const xmsHeader = JSON.parse(
      atob(request.headers.get("x-ms-client-principal"))
    );
    const userId = xmsHeader.userId;
    if (!userId) {
      return {
        status: 500,
      };
    }

    const client = await mongoClient.connect(process.env.AZURE_MONGO_DB);
    const transactions = await client
      .db("budgetapp")
      .collection("transactions")
      .find({ userid: userId })
      .toArray();
    client.close();
    return {
      jsonBody: { transactions: transactions },
    };
  },
});

app.http("getAllCategoryTransactions", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "transactions/{category}",
  handler: async (request, context) => {
    const xmsHeader = JSON.parse(
      atob(request.headers.get("x-ms-client-principal"))
    );
    const userId = xmsHeader.userId;
    if (!userId) {
      return {
        status: 500,
      };
    }

    const category = request.params.category;
    const client = await mongoClient.connect(process.env.AZURE_MONGO_DB);
    const transactions = await client
      .db("budgetapp")
      .collection("transactions")
      .find({ userid: userId, category: category })
      .toArray();
    client.close();
    return {
      jsonBody: { transactions: transactions },
    };
  },
});
