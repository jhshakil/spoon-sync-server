import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TAuth } from '../auth/auth.interface';
import { GroupServices } from './group.service';

/**
 * Create a new group
 */
const createGroup = catchAsync(async (req, res) => {
  const result = await GroupServices.createGroup(req.body, req.user as TAuth);

  sendResponse(res, {
    message: 'Group created successfully',
    data: result,
  });
});

/**
 * Get all groups
 */
const getAllGroups = catchAsync(async (req, res) => {
  const userRole = req.user?.role;

  const result = await GroupServices.getAllGroups(req.query, userRole);

  sendResponse(res, {
    message: 'Groups retrieved successfully',
    data: result,
  });
});

/**
 * Get all join groups
 */

const getJoinedGroups = catchAsync(async (req, res) => {
  const result = await GroupServices.getJoinedGroups(
    req.query,
    req.params.userEmail,
  );

  sendResponse(res, {
    message: 'Joined groups retrieved successfully',
    data: result,
  });
});

/**
 * Get all dis join groups
 */

const getDisjoinedGroups = catchAsync(async (req, res) => {
  const result = await GroupServices.getDisjoinedGroups(
    req.query,
    req.params.userEmail,
  );

  sendResponse(res, {
    message: 'Unjoined groups retrieved successfully',
    data: result,
  });
});

/**
 * Get single group by ID
 */
const getGroupById = catchAsync(async (req, res) => {
  const result = await GroupServices.getGroupById(req.params.groupId);
  sendResponse(res, {
    message: 'Group retrieved successfully',
    data: result,
  });
});

/**
 * Update group details (Only group admins)
 */
const updateGroup = catchAsync(async (req, res) => {
  const result = await GroupServices.updateGroup(
    req.params.groupId,
    req.body,
    req.user as TAuth,
  );

  sendResponse(res, {
    message: 'Group updated successfully',
    data: result,
  });
});

/**
 * Add an admin to the group (Only existing admins can add)
 */
const addAdmin = catchAsync(async (req, res) => {
  const result = await GroupServices.addAdmin(
    req.params.id,
    req.body.email,
    req.user as TAuth,
  );

  sendResponse(res, {
    message: 'Admin added successfully',
    data: result,
  });
});

/**
 * Add a member to the group
 */
const addMember = catchAsync(async (req, res) => {
  const result = await GroupServices.addMember(
    req.params.groupId,
    req.body.email,
  );

  sendResponse(res, {
    message: 'Member added successfully',
    data: result,
  });
});

/**
 * Soft delete a group (Only group admins)
 */
const deleteGroup = catchAsync(async (req, res) => {
  const result = await GroupServices.deleteGroup(
    req.params.id,
    req.user as TAuth,
  );

  sendResponse(res, {
    message: 'Group deleted successfully',
    data: result,
  });
});

/**
 * Change group status (Only Group Admins, Admin, or Super Admin)
 */
const changeGroupStatus = catchAsync(async (req, res) => {
  const result = await GroupServices.changeGroupStatus(
    req.params.id,
    req.body.status,
  );

  sendResponse(res, {
    message: 'Group status updated successfully',
    data: result,
  });
});

/**
 * Get posts by group ID
 */
const getPostsByGroupId = catchAsync(async (req, res) => {
  const { groupId } = req.params; // Extract group ID from request parameters

  const result = await GroupServices.getPostsByGroupId(groupId);

  sendResponse(res, {
    message: 'Posts retrieved successfully',
    data: result,
  });
});

export const GroupControllers = {
  createGroup,
  getAllGroups,
  getJoinedGroups,
  getDisjoinedGroups,
  getGroupById,
  updateGroup,
  addAdmin,
  addMember,
  deleteGroup,
  changeGroupStatus,
  getPostsByGroupId,
};
