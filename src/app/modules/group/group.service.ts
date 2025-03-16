import AppError from '../../errors/AppError';
import { TAuth } from '../auth/auth.interface';
import { User } from '../user/user.model';
import { TGroup, TGroupStatus } from './group.interface';
import httpStatus from 'http-status';
import { Group } from './group.modal';
import { ObjectId } from 'mongodb';
import QueryBuilder from '../../builder/QueryBuilder';
import { GROUP_STATUS } from './group.constant';
import { AUTH_ROLE } from '../auth/auth.constant';
import { Post } from '../post/post.modal';

/**
 * Create a new group
 */
const createGroup = async (payload: TGroup, user: TAuth) => {
  const existingUser = await User.findOne({ email: user.email });

  if (!existingUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  payload.admins = [existingUser._id];
  const result = await Group.create(payload);
  return result;
};

/**
 * Get all groups
 */
const getAllGroups = async (
  query: Record<string, unknown>,
  userRole: 'user',
) => {
  const filter: Record<string, unknown> = { isDeleted: false };

  // If user is NOT admin or super admin, only show active groups
  if (userRole === AUTH_ROLE.user) {
    filter.status = GROUP_STATUS.active;
  }

  const groupQuery = new QueryBuilder(
    Group.find(filter)
      .populate('admins', 'name email')
      .populate('members', 'name email'),
    query,
  )
    .search(['name', 'description'])
    .filter()
    .paginate()
    .sort();

  return await groupQuery.modelQuery;
};

/**
 * Get a single group by ID
 */
const getGroupById = async (groupId: string) => {
  const group = await Group.findById(groupId);
  if (!group) throw new AppError(httpStatus.NOT_FOUND, 'Group not found');
  return group;
};

/**
 * Update group details (Only Group Admins)
 */
const updateGroup = async (
  groupId: string,
  payload: Partial<TGroup>,
  user: TAuth,
) => {
  const group = await Group.findById(groupId);
  if (!group) throw new AppError(httpStatus.NOT_FOUND, 'Group not found');

  // Check if the user is a group admin
  if (!group.admins.includes(user._id as ObjectId)) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Only group admins can update this group',
    );
  }

  Object.assign(group, payload);
  await group.save();
  return group;
};

/**
 * Add an admin to the group (Only existing admins can add)
 */
const addAdmin = async (groupId: string, email: string, user: TAuth) => {
  const group = await Group.findById(groupId);
  if (!group) throw new AppError(httpStatus.NOT_FOUND, 'Group not found');

  if (!group.admins.includes(user._id as ObjectId)) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Only group admins can add another admin',
    );
  }

  const newAdmin = await User.findOne({ email });
  if (!newAdmin) throw new AppError(httpStatus.NOT_FOUND, 'User not found');

  if (!group.admins.includes(newAdmin._id)) {
    group.admins.push(newAdmin._id);
    await group.save();
  }

  return group;
};

/**
 * Add a member to the group
 */
const addMember = async (groupId: string, email: string) => {
  const group = await Group.findById(groupId);
  if (!group) throw new AppError(httpStatus.NOT_FOUND, 'Group not found');

  const newMember = await User.findOne({ email });
  if (!newMember) throw new AppError(httpStatus.NOT_FOUND, 'User not found');

  if (!group.members.includes(newMember._id)) {
    group.members.push(newMember._id);
    await group.save();
  }

  return group;
};

/**
 * Soft delete a group (Only Group Admins)
 */
const deleteGroup = async (groupId: string, user: TAuth) => {
  const group = await Group.findById(groupId);
  if (!group) throw new AppError(httpStatus.NOT_FOUND, 'Group not found');

  if (!group.admins.includes(user._id as ObjectId)) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Only group admins can delete this group',
    );
  }

  group.isDeleted = true;
  await group.save();
  return group;
};

/**
 * Change group status (Only Group Admins, Admin, or Super Admin)
 */
const changeGroupStatus = async (groupId: string, status: TGroupStatus) => {
  const group = await Group.findById(groupId);
  if (!group) throw new AppError(httpStatus.NOT_FOUND, 'Group not found');

  group.status = status;
  await group.save();
  return group;
};

/**
 * Get posts by group ID
 */
const getPostsByGroupId = async (groupId: string) => {
  const group = await Group.findById(groupId);

  if (!group) {
    throw new AppError(httpStatus.NOT_FOUND, 'Group not found');
  }

  return await Post.find({ groupId: group._id }).populate(
    'author',
    'name email',
  );
};

export const GroupServices = {
  createGroup,
  getAllGroups,
  getGroupById,
  updateGroup,
  addAdmin,
  addMember,
  deleteGroup,
  changeGroupStatus,
  getPostsByGroupId,
};
