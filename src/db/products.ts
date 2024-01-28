import db from '$db/mongo'

export const products = db.collection('products');
