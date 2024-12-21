const yup = require('yup');

const productSchema = yup.object().shape({
  name: yup.string().required(),
  price: yup.number().required(),
  description: yup.string(),
});

module.exports = { productSchema };
