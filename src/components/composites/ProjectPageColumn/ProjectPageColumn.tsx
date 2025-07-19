"use client";
import { useProject } from '@/hooks/useProject';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';

const ProjectPageColumn = () => {

    const params = useParams();
    const id = params?.id as string;

    console.log("ProjectPageColumn ID:", id);

    const { getProjectById, currentProject, loading, error } = useProject();

    useEffect(() => {
        const projectId = id;
        const project = getProjectById(projectId);
        console.log("Project ID:", projectId);
        console.log("Fetched Project:", project);
    }, [getProjectById, id]);


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!currentProject) {
        return <div>No project found</div>;
    }

    console.log("Current Project", currentProject);


    

    return (
        <div className='flex flex-col items-center gap-4 justify-center h-screen bg-gray-100 w-full'>
            {
                
            }
        </div>
    );
};

export default ProjectPageColumn;