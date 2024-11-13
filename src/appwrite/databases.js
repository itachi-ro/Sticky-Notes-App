import { databases, collections } from "./config";
import { ID } from "appwrite";
 
const db = {};

/*
use forEach() when you need to iterate over an array and perform side effects
but don't need to return a new array.
*/

collections.forEach((collection) => {
    db[collection.name] = {
        create: async (payload, id = ID.unique()) => {
            return await databases.createDocument(
                collection.dbId,
                collection.id,
                id,
                payload
            );
        },
        update: async (id, payload) => {
            return await databases.updateDocument(
                collection.dbId,
                collection.id,
                id,
                payload
            );
        },
        delete: async (id) => {
            return await databases.deleteDocument(
                collection.dbId,
                collection.id,
                id
            );
        },
        get: async (id) => {
            return await databases.getDocument(
                collection.dbId,
                collection.id,
                id
            );
        },
        list: async (queries) => {
            return await databases.listDocuments(
                collection.dbId,
                collection.id,
                queries
            );
        },
    };
});
 
export { db };


/*

db = {
    users: {
        create: async (payload, id = ID.unique()) => {  },
        update: async (id, payload) => {  },
        delete: async (id) => {  },
        get: async (id) => {  },
        list: async (queries) => {  }
    }
};

*/