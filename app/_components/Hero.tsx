"use client"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { Loader2, Send } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { QUICK_VIDEO_SUGGESTIONS } from "@/data/constant"
import { use, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { SignInButton, useUser } from "@clerk/nextjs"



function Hero() {
 
  const [userInput, setUserInput] = useState('');
  const [type, setType] = useState('full-courses');
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const GenerateCourseLayout = async () => {
    const toastId =toast.loading("Generating course layout...");
    const courseId = await crypto.randomUUID();
       try{
       setLoading(true);
       const result = await axios.post('/api/generate-course-layout', {
        userInput,
        type,
        courseId: courseId
       });
       console.log("Course Layout Result:", result.data);
       setLoading(false);
       toast.success("Course layout generated successfully!", { id: toastId });

        // navigate to course editor page 

       }catch(error){
        setLoading(false);
        toast.error("Failed to generate course layout. Please try again.", { id: toastId });
       }
  }


  return (
    <div  className='flex items-center flex-col '>
        <div>
            <h2 className='text-4xl font-bold'>Learn Smarter with <span className='text-yellow-500'> AI Code Box </span> Courses </h2>
            <p className='text-center text-gray-500 mt-3 text-xl'>Turn Any Topic into a Complete Course</p>
        </div>

       <div className="grid w-full max-w-xl mt-5 gap-6 bg-white z-10">
      <InputGroup>
        <InputGroupTextarea
          data-slot="input-group-control"
          className="flex field-sizing-content min-h-22 w-full resize-none rounded-xl bg-white px-3 py-2.5 text-base transition-[color,box-shadow] outline-none md:text-sm"
          placeholder="Autoresize textarea..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <InputGroupAddon align="block-end">
        <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="full-courses" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="full-courses">Full Courses</SelectItem>
                    <SelectItem value="quick-explain-video">Quick Explain Video</SelectItem>
                </SelectContent>
        </Select>
          {user? <InputGroupButton className="ml-auto" size="icon-sm" variant="default"
          onClick={GenerateCourseLayout}
          disabled={loading}
          >
            {loading?<Loader2 className="animate-spin"/>: <Send/>}
            
          </InputGroupButton>

          : <SignInButton mode="modal">
          <InputGroupButton className="ml-auto" size="icon-sm" variant="default"
          onClick={() => toast.error("Please sign in to generate course layout")}
          >
            <Send/>
          </InputGroupButton>
          </SignInButton>}

        </InputGroupAddon>
      </InputGroup>
    </div>
        <div className="flex gap-2 mt-5 max-w-3xl flex-wrap justify-center z-10">
            {QUICK_VIDEO_SUGGESTIONS.map((suggestion, index) => {
              return <h2 key={index} onClick={() => setUserInput(suggestion?.prompt)} className="border rounded-2xl cursor-pointer px-2 p-1 text-sm bg-white"> {suggestion.title}</h2>;
            })}
        </div>
    </div>
  )
}

export default Hero