import { sendEmail } from '../../utils/emailSender';
import { TContact } from './contact.interface';

const contactUs = async (payload: TContact) => {
  await sendEmail(
    'info.jhshakil@gmail.com',
    `<div>
    <h2>name: ${payload?.name}</h2>
    <h3>phone number: ${payload?.phoneNumber}</h3>
    <p>comment: ${payload?.comment}</p>
    </div>
    `,
    `Spoon Sync Contact`,
    payload.email,
  );

  return '';
};

export const ContactService = {
  contactUs,
};
