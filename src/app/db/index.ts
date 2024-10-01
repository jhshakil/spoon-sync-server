import config from '../config';
import { USER_ROLE } from '../modules/user/user.constant';
import { User } from '../modules/user/user.model';

const superUser = {
  id: '0001',
  name: 'Super Admin',
  email: config.super_admin_email,
  password: config.super_admin_password,
  phone: '01624566988',
  role: USER_ROLE.superAdmin,
  address: 'dhaka',
};

const seedSuperAdmin = async () => {
  const isSuperAdminExits = await User.findOne({ role: USER_ROLE.superAdmin });

  if (!isSuperAdminExits) {
    await User.create(superUser);
  }
};

export default seedSuperAdmin;
