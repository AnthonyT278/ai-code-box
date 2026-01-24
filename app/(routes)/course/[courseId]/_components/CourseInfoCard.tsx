import { course } from '@/type/CourseType'
import { BookOpen, ChartNoAxesColumn, ChartNoAxesColumnIncreasing, Sparkles } from 'lucide-react'
import { Player } from '@remotion/player'
import ChapterVideo from './ChapterVideo'


type Props = {
  course: course | undefined
}

function CourseInfoCard({course}:Props) {
  return (
    // <div className='bg-gradient-to-br from-slate-950 via-slate-800 to-emerald-950'>
    //     <div className='p-8 grid grid-cols-1 md:grid-cols-2 gap-5 max-w-7xl mx-auto'>
    //         <div>
    //             <h2 className='flex gap-2 p-1 px-2 border rounded-2xl inline-flex text-white border-gray-200'><Sparkles/> Course Preview</h2>
    //             <h2 className='text-5xl font-bold mt-4'>{course?.courseName}</h2>
    //             <p className='text-lg text-muted-foreground mt-3'>{course?.courseLayout?.courseDescription}</p>
    //             <div className='mt-5 flex gap-5'>
    //                 <h2 className='px-3 p-2 border rounded-full flex gap-2 items-center inline-flex'><ChartNoAxesColumnIncreasing className='text-sky-400'/> {course?.courseLayout?.level}</h2>
    //                 <h2 className='px-3 p-2 border rounded-full flex gap-2 items-center inline-flex'><BookOpen className='text-green-400'/> {course?.courseLayout?.totalChapters}</h2>
    //                 {/* <h2 className='px-3 p-2 border rounded-full flex gap-2 items-center inline-flex'></> {course?.courseLayout?.}</h2> */}

    //             </div>
    //         </div>

    //         <div className='border-2 rounded-2xl'>
                //  <Player
                //     component={ChapterVideo}
                //     durationInFrames={30}
                //     compositionWidth={1280}
                //     compositionHeight={720}
                //     fps={30}
                //     controls
                //     style={{
                //       width: '100%',
                //       aspectRatio: '16/9',

                //     }}
                //  />
    //         </div>
    //     </div>
    // </div>

    <div className='bg-gradient-to-br from-slate-950 via-slate-800 to-emerald-950'>
    <div className='p-8 grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto'>
        {/* content */}
        <div>
            <h2 className='flex gap-2 p-1 px-2 border rounded-2xl inline-flex text-white border-gray-200'><Sparkles/> Course Preview</h2>
            <h2 className='text-5xl font-bold mt-4'>{course?.courseName}</h2>
            <p className='text-lg text-muted-foreground mt-3'>{course?.courseLayout?.courseDescrption}</p>
            <div className='mt-5 flex gap-5'>
                <h2 className='px-3 p-2 border rounded-full flex gap-2 items-center inline-flex'><ChartNoAxesColumnIncreasing className='text-sky-400'/> {course?.courseLayout?.level}</h2>
                <h2 className='px-3 p-2 border rounded-full flex gap-2 items-center inline-flex'><BookOpen className='text-green-400'/> {course?.courseLayout?.totalChapters}</h2>
            </div>
        </div>

        <div className='border-2 border-white/10 rounded-2xl'>
               <Player
                    component={ChapterVideo}
                    durationInFrames={30}
                    compositionWidth={1280}
                    compositionHeight={720}
                    fps={30}
                    controls
                    style={{
                      width: '100%',
                      aspectRatio: '16/9',

                    }}
                 />
        </div>

    </div>
</div>
  )
}

export default CourseInfoCard