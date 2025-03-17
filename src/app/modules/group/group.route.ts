import { Router } from 'express';
import auth from '../../middlewares/auth';
import { AUTH_ROLE } from '../auth/auth.constant';
import validateRequest from '../../middlewares/validateRequest';
import { GroupValidations } from './group.validation';
import { GroupControllers } from './group.controller';

const router = Router();

// Create a group (Only authenticated users)
router.post(
  '/',
  auth(AUTH_ROLE.user),
  validateRequest(GroupValidations.createGroupSchema),
  GroupControllers.createGroup,
);

// Get all groups
router.get('/', GroupControllers.getAllGroups);

// Get all groups
router.get('/joined/:userEmail', GroupControllers.getJoinedGroups);

// Get all groups
router.get('/dis-joined/:userEmail', GroupControllers.getDisjoinedGroups);

// Get a single group by ID
router.get('/:groupId', GroupControllers.getGroupById);

// Get post by groupId (Only admins)
router.get(
  '/group-post/:groupId',
  auth(AUTH_ROLE.admin),
  GroupControllers.getPostsByGroupId,
);

// Update group details (Only admins)
router.patch(
  '/:groupId',
  validateRequest(GroupValidations.updateGroupSchema),
  GroupControllers.updateGroup,
);

// Add an admin to a group (Only existing admins)
router.post(
  '/:groupId/add-admin',
  validateRequest(GroupValidations.addAdminSchema),
  GroupControllers.addAdmin,
);

// Add a member to a group (Authenticated users)
router.post(
  '/:groupId/add-member',
  auth(AUTH_ROLE.user),
  validateRequest(GroupValidations.addMemberSchema),
  GroupControllers.addMember,
);

// Soft delete a group (Only admins)
router.delete('/:groupId', auth(AUTH_ROLE.admin), GroupControllers.deleteGroup);

// Change group status (Only admins)
router.patch(
  '/:groupId/status',
  auth(AUTH_ROLE.admin),
  validateRequest(GroupValidations.changeStatusSchema),
  GroupControllers.changeGroupStatus,
);

export const GroupRoutes = router;
