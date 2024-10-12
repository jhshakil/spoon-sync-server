import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ContactService } from './contact.service';

const contactUs = catchAsync(async (req, res) => {
  await ContactService.contactUs(req.body);

  sendResponse(res, {
    message: 'Email Send',
    data: '',
  });
});

export const ContactController = {
  contactUs,
};
