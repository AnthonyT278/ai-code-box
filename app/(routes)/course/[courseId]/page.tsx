"use client"

import React, { useEffect, useState } from 'react'
import CourseInfoCard from './_components/CourseInfoCard'
import { useParams } from 'next/dist/client/components/navigation';
import axios from 'axios';
import { course } from '@/type/CourseType';
import CourseChapers from './_components/CourseChapers';

function CoursePreview() {

const { courseId } = useParams();
const [courseDetail, setCourseDetail] = useState<course>();

useEffect(()=> {
    courseId&&GetCourseDetail();
},[courseId]);

const GetCourseDetail = async ()=> {
    const result = await axios.get('/api/course?courseId=' + courseId)
    console.log(result.data);
    setCourseDetail(result.data);
}

  return (
    <div className='flex flex-col items-center'>
        <CourseInfoCard course={courseDetail} />
        <CourseChapers course={courseDetail} />
    </div>
  )
}

export default CoursePreview