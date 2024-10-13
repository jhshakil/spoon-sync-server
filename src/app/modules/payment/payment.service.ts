import { v4 } from 'uuid';
import { initiatePayment, verifyPayment } from '../../utils/payment.utils';
import { TPayment } from './payment.interface';
import { join } from 'path';
import { readFileSync } from 'fs';
import { User } from '../user/user.model';

export const makePayment = async (payload: TPayment) => {
  const transactionId = `TXN-${v4()}`;
  await User.findOneAndUpdate(
    { email: payload.email },
    { transactionId: transactionId, proValidity: payload.duration },
  );
  const paymentData = {
    transactionId,
    totalPrice: Number(payload.payment),
    customerEmail: payload.email,
  };

  //payment
  const paymentSession = await initiatePayment(paymentData);

  return paymentSession;
};

const confirmPayment = async (transactionId: string) => {
  const verifyResponse = await verifyPayment(transactionId);

  let message = '';

  if (verifyResponse && verifyResponse.pay_status === 'Successful') {
    await User.findOneAndUpdate(
      { transactionId },
      {
        transactionId,
        isPro: true,
      },
    );

    message = 'Successfully Paid!';
  } else {
    message = 'Payment Failed!';
  }

  const filePath = join(__dirname, '../../../../public/view/confirmation.html');
  let template = readFileSync(filePath, 'utf-8');

  template = template.replace('{{message}}', message);

  return template;
};

export const PaymentServices = {
  makePayment,
  confirmPayment,
};
