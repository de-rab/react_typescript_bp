import { useMemo } from 'react';
import { useAppSelector } from '../../../hooks/store';
import { selectCurrentUser } from '../stores/authSlice';
import { useLazyGetUserByIdQuery } from '../api/userApi';

export const useAuth = () => {
  const user = useAppSelector(selectCurrentUser);

  const [getUserById, refetchUserResult] = useLazyGetUserByIdQuery();
  const refetchUser = () =>
    user
      ? getUserById({ userId: user.id })
      : { isUninitialized: false, isLoading: false, isFetching: false, isSuccess: false, isError: false };

  return useMemo(() => ({ user, refetchUser, refetchUserResult }), [user, refetchUser, refetchUserResult]);
};
