import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PaymentServices } from './payment.service';

export const makePayment = catchAsync(async (req, res) => {
  const result = await PaymentServices.makePayment(req.body);

  sendResponse(res, {
    message: 'payment proceed',
    data: result,
  });
});

const confirmPayment = catchAsync(async (req, res) => {
  const { transactionId } = req.query;
  const result = await PaymentServices.confirmPayment(transactionId as string);

  res.send(result);
});

export const PaymentControllers = {
  makePayment,
  confirmPayment,
};
