
"use client";

// hooks/useProject.ts
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
 // update path accordingly
import { fetchProjectById } from '@/store/slices/Project/projectSlice';
import { AppDispatch, RootState } from '@/store';


export const useProject = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    projects,
    currentProject,
    loading,
    error,
  } = useSelector((state: RootState) => state.project);

  const getProjectById = useCallback(
    (projectId: string) => {
      dispatch(fetchProjectById(projectId));
    },
    [dispatch]
  );

  return {
    projects,
    currentProject,
    loading,
    error,
    getProjectById,
  };
};
