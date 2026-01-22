"use client"
import { UserDetailContext } from "@/context/UserDetailContext";
import axios from "axios";
import { useEffect, useState, useRef } from "react";

function Provider({ children }: { children: React.ReactNode }) {

    const [userDetail, setUserDetail] = useState<any>(null);
    const hasInitialized = useRef(false);

    useEffect(() => {
        const CreateNewUser = async () => {
            try {
                // Only call API once on mount
                if (hasInitialized.current) {
                    return;
                }
                hasInitialized.current = true;

                const result = await axios.post('/api/user', {});
                
                // Only set userDetail if result.data exists
                if (result?.data) {
                    setUserDetail(result.data);
                }
            } catch (error) {
                console.error("Error creating user:", error);
                setUserDetail(null);
            }
        };

        CreateNewUser();
    }, []);
    
  return (
    <div>
        <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
          <div className="max-w-7xl mx-auto">
             {children}
          </div>
        </UserDetailContext.Provider>
    </div>
  )
}

export default Provider