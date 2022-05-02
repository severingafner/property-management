const httpStatus = require('http-status');
const Bill = require('../models/bill.model');
const ApiError = require('../utils/ApiError');

const createBill = async (billBody) => {
  const bill = await Bill.create(billBody);
  return bill;
};

const getBillById = async (id) => {
  return Bill.findById(id);
};

const queryBills = async (filter, options) => {
  const bill = await Bill.paginate(filter, options);
  return bill;
};

const updateBill = async (bill, updateBody) => {
  Object.assign(bill, updateBody);
  await bill.save();
  return bill;
};

const updateBillById = async (id, updateBody) => {
  let bill = await getBillById(id);
  if (!bill) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Bill not found');
  }
  bill = await updateBill(bill, updateBody);
  return bill;
};

const deleteBillById = async (id) => {
  const bill = await getBillById(id);
  if (!bill) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Bill not found');
  }
  await bill.remove();
  return bill;
};

module.exports = {
  queryBills,
  getBillById,
  createBill,
  updateBillById,
  deleteBillById,
};
