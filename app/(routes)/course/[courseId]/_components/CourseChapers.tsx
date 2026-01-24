import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { course } from '@/type/CourseType'
import { index } from 'drizzle-orm/gel-core'
import { Dot } from 'recharts'
import { Player } from '@remotion/player'
import ChapterVideo from './ChapterVideo'

type Props = {
    course: course | undefined
}

function CourseChapers({ course }:Props) {
  return (
    <div className='max-w-6xl -mt-5 p-10 border rounded-3xl shadow w-full 
      bg-background/80 backdrop-blur
    '>
        <div className='flex justify-between items-center'>
            <h2 className='font-bold text-2xl'>Course Preview </h2>
            <h2 className='text-sm mr-3 text-muted-foreground'>Chapters and Short Preview</h2>
        </div>

         <div className='mt-5'>
            {course?.courseLayout?.chapters.map((chapter, index) => (
                 <Card className='mb-5' key={index}>
                    <CardHeader>
                        <div className='flex gap-3 items-center'>
                         <h2 className='p-2 bg--primmary/40 inline-flex h-10 w-10 text-center rounded-2xl justfify-center'>{index + 1}</h2>
                        <CardTitle className='md:text-xl text-base' >
                            {chapter.chapterTitle}
                        </CardTitle>
                        </div>    
                    </CardHeader>

                     <CardContent>
                        <div className='grid grid--cols gap-5'>
                            <div>
                                {chapter?.subContent.map((content, index) => (
                                <div className='flex gap-2 items-center mt-2' key={index}>
                                    <Dot className='h-5 w-5 text-primary' />
                                    <h2>{content}</h2>
                                </div>
                          ))}
                               </div>
                            <div>
                                 <Player
                                    component={ChapterVideo}
                                    durationInFrames={30}
                                    compositionWidth={1280}
                                    compositionHeight={720}
                                    fps={30}
                                    controls
                                    style={{
                                    width: '100%',
                                    height: '80%',
                                    aspectRatio: '16/9',
                                 
                                    }}
                                />
                            </div>
                        </div>
                     </CardContent>
                   
                 </Card>
            ))}

         </div>
    </div>
  )
}

export default CourseChapers