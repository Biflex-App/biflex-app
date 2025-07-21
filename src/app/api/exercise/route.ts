import { getExercises } from '@/services/exerciseService';
import { responseHandler } from '../response';

const listUsersHandler = async () => {
  return await getExercises();
};

export const GET = responseHandler(listUsersHandler);
